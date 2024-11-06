import React, { useEffect } from "react";
import "./Experience.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Experience = () => {
	useEffect(() => {
		if (window.innerWidth > 1200) {
			const tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".experience",
					start: "20% 20%",
					end: "bottom bottom",
					scrub: true,
					// markers: true,
				},
				ease: "none",
			});
			tl1.to(".experience .video", {
				clipPath: "ellipse(120vh 120vh at 50% 50%)",
			});
			//
			const tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".experience",
					start: "0% 60%",
					// markers: true,
				},
				ease: "none",
			});

			tl2.to(
				".experience-header-mask",
				{
					x: "0%",
					y: "0%",
					rotate: 0,
					visibility: "inherit",
				},
				0
			);
			return () => {
				if (tl1) tl1.kill();
				if (tl2) tl2.kill();
			};
		}
	}, []);
	return (
		<section className="experience">
			<div className="container">
				<div className="experience-header">
					<div className="experience-header-mask">
						<h2 className="experience-title">Create a stunning expierence</h2>
						<p className="experience-desc">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
					</div>
				</div>
			</div>
			<div className="clip">
				<div className="video">
					<div className="video__player">
						<video preload="metadata" loop playsInline muted autoPlay>
							<source src="/videos/videothree.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
