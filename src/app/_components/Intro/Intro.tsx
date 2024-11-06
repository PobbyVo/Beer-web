"use client";

import { useEffect } from "react";
// import { useGLB } from "../GLBContext/GLBContext";
import SplitType from "split-type";
import "./Intro.scss";
// import Model from "@/components/BeerModel/Model";
// import { Canvas } from "@react-three/fiber";
// import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import SwitchCan from "@/components/SwitchCan/SwitchCan";

gsap.registerPlugin(ScrollTrigger);

const Intro: React.FC = () => {
	// const { currentGLB, setCurrentGLB, setCurrentSlideIndex } = useGLB();

	useEffect(() => {
		// Split the text into words and characters
		const splitText1 = new SplitType(".txt-split-1", { types: "words,chars" });
		const splitText2 = new SplitType(".txt-split-2", { types: "words,chars" });

		const setAnimationDelays = (chars: NodeListOf<Element>) => {
			chars.forEach((char, index) => {
				(char as HTMLElement).style.animationDelay = `${index * 0.05}s`;
			});
		};

		// Set animation delays
		setAnimationDelays(document.querySelectorAll(".txt-split-1 div.char"));
		setAnimationDelays(document.querySelectorAll(".txt-split-2 div.char"));

		const introWrap = document.querySelector(".intro") as HTMLElement;
		introWrap.classList.add("active");
		document.body.classList.add("active-glb-pale-ale");

		// Create GSAP timeline for scrolling animations
		const tlIntro = gsap.timeline({
			scrollTrigger: {
				trigger: ".intro",
				start: "0% 0%",
				scrub: true,
			},
			ease: "power2.out",
		});

		tlIntro
			.fromTo(
				".hugeTitle .txt",
				{
					yPercent: 0,
				},
				{
					yPercent: -120,
				}
			)
			.fromTo(
				".title-desc",
				{
					yPercent: 0,
				},
				{
					yPercent: 80,
				}
			);

		return () => {
			// Clean up on component unmount
			splitText1.revert();
			splitText2.revert();
			// document.body.classList.remove(
			//     "active-glb-pale-ale",
			//     "active-glb-ale-stout",
			//     "active-glb-belgian-white",
			//     "active-glb-ipa"
			// );
			if (tlIntro) tlIntro.kill();
		};
	}, []);

	return (
		<section className="intro">
			<div className="container">
				<div className="intro-titleWrapper">
					<div className="titleWrapper">
						<h2 className="hugeTitle">
							<span className="txt txt-split-1">Unleash</span>
							<span className="txt txt-split-2">the FLavor</span>
						</h2>
					</div>
					<div className="titleWrapper-bt">
						<div className="title-desc">
							Craft Beer, Reimagined.
							<br />
							Experience the Future of Flavor
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Intro;
