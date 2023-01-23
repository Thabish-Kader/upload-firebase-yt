import { timeLog } from "console";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { ChangeEvent, useRef, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { db, storage } from "../firebase";

export const UploadImage = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState("");
	const [preview, setPreview] = useState<
		string | ArrayBuffer | null | undefined
	>("");

	const showImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		const file = e?.target?.files?.[0];
		if (file) {
			reader.readAsDataURL(file);
		}
		reader.onload = (e) => {
			setPreview(e.target?.result);
		};
	};

	const submitToFirebase = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const imageRef = ref(storage, `thumbnails/${title}`);
		uploadString(imageRef, preview as string, "data_url").then(
			(snapshot) => {
				getDownloadURL(imageRef).then(async (url) => {
					await addDoc(collection(db, "images"), {
						title: title,
						imageUrl: url,
						serverTime: serverTimestamp(),
					});
				});
			}
		);
		console.log(`${imageRef} --> added`);
		setPreview(null);
		setTitle("");
	};

	return (
		<div className="mt-5 border-2 max-w-sm mx-auto p-2">
			<form
				onSubmit={submitToFirebase}
				className="flex flex-col space-y-3"
			>
				<h1 className="text-center font-bold">Upload thumbnail</h1>
				{preview && <img src={preview as string} alt="" />}

				<div className=" flex mx-auto items-center">
					<input
						type="text"
						placeholder="Thumbnail title"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>

					<input
						type="file"
						hidden
						ref={inputRef}
						onChange={showImagePreview}
					/>
					<AiFillYoutube
						onClick={() => inputRef.current?.click()}
						size={50}
						className="text-red-500 cursor-pointer"
					/>
				</div>
				<button type="submit" className="p-2 bg-red-500 rounded-lg">
					Upload
				</button>
			</form>
		</div>
	);
};
