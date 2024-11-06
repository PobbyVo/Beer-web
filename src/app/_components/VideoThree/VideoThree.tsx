"use client";
import React, { useEffect } from "react";
import "./VideoThree.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const VideoThree = () => {
	useEffect(() => {
		const videoElem =
			document.querySelector<HTMLVideoElement>(".videothree video");

		if (videoElem) {
			ScrollTrigger.create({
				trigger: videoElem,
				start: "top 80%",
				end: "bottom top",
				// markers: true,
				onEnter: () => videoElem.play(),
				onEnterBack: () => videoElem.play(),
				onLeave: () => videoElem.pause(),
				onLeaveBack: () => videoElem.pause(),
			});
		}

		// const tl = gsap.timeline({
		//   scrollTrigger: {
		//     trigger: ".videothree",
		//     scrub: true,
		//     pin: false,
		//     start: "-20% 90%",
		//     end: "bottom top",
		//     // markers: true,
		//   },
		// });

		// tl.fromTo(
		//   ".videothree .video__player",
		//   {
		//     yPercent: -50,
		//     ease: "none",
		//   },
		//   {
		//     yPercent: 50,
		//     ease: "none",
		//   }
		// );

		// return () => {
		//   if (tl) tl.kill();
		// };
	}, []);

	return (
		<section className="videothree">
			<div className="video --cover">
				<div className="video__player">
					<video
						preload="metadata"
						playsInline
						data-desktop
						muted
						loop
						className="--playing"
					>
						<source src="/videos/videothree-02.mp4" type="video/mp4" />
					</video>
				</div>
			</div>
		</section>
	);
};

export default VideoThree;
