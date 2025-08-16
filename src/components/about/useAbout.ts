"use client";

import { useEffect, useState } from "react";
import type AboutData from "@/components/about/AboutData";

const blankAbout = {
	url: "",
	name: "",
	email: "",
	phone: {
		display: "",
		link: "",
	},
	location: "",
	booking: "",
};

const useAbout = (): AboutData => {
	const [about, setAbout] = useState<AboutData>(blankAbout);

	useEffect(() => {
		const fetchAbout = async () => {
			const response = await fetch("/api/about");
			const about = await response.json();
			setAbout(about);
		};
		fetchAbout();
	}, []);

	return about;
};

export default useAbout;
