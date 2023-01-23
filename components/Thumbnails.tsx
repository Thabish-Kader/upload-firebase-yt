import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
type Thumbnail = {
	id: string;
	imageUrl: string;
	serverTime: string;
	title: string;
};

export const Thumbnails = () => {
	const [thumbnails, setThumbnails] = useState<Thumbnail[]>();

	useEffect(() => {
		const q = query(
			collection(db, "images"),
			orderBy("serverTime", "desc")
		);
		const unsub = onSnapshot(q, (snapshot) => {
			setThumbnails(
				snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as Thumbnail[]
			);
		});
		return () => unsub();
	}, [db]);
	console.log(thumbnails);

	return (
		<div>
			<div className="grid gap-2">
				{thumbnails?.map((thumbnail) => (
					<div key={thumbnail.id}>
						<img
							src={thumbnail.imageUrl}
							alt=""
							className="w-full"
						/>
						<h1 className="text-xl font-bold capitalize">
							Title : {thumbnail.title}
						</h1>
					</div>
				))}
			</div>
		</div>
	);
};
