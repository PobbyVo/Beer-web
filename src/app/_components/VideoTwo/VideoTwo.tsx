import React, { useEffect } from "react";
import "./VideoTwo.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const VideoTwo = () => {
	useEffect(() => {
		const videoElem =
			document.querySelector<HTMLVideoElement>(".videotwo video");

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

		const mm = gsap.matchMedia();

		mm.add("(min-width: 1200px)", () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".videotwo",
					scrub: true,
					pin: false,
					start: "-20% 90%",
					end: "bottom top",
					// markers: true,
				},
			});

			tl.fromTo(
				".videotwo .video__player",
				{ yPercent: -50, ease: "none" },
				{ yPercent: 50, ease: "none" }
			);
		});

		return () => {
			mm.revert();
		};
	}, []);

	return (
		<section className="videotwo">
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
						<source src="/videos/videotwo.mp4" type="video/mp4" />
					</video>
				</div>
			</div>
		</section>
	);
};

export default VideoTwo;
