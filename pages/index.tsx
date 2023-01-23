import type { NextPage } from "next";
import Head from "next/head";
import { Thumbnails } from "../components/Thumbnails";

import { UploadImage } from "../components/UploadImage";

const Home: NextPage = () => {
	return (
		<div className="">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Upload Popup */}
			<UploadImage />
			{/* Thumbnails */}
			<div className="max-w-xl mx-auto">
				<Thumbnails />
			</div>
		</div>
	);
};

export default Home;
