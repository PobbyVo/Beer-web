"use client";
import { CurrentIndexProvider } from "@/context/CurrentIndexContext";
import Home from "./_components/Home";

export default function Page() {
	return (
		<CurrentIndexProvider>
			<Home />
		</CurrentIndexProvider>
	);
}
