import React, { useEffect } from "react";
import "./BeerDetail.scss";
import Image from "next/image";
import VideoOne from "../VideoOne/VideoOne";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useGLB } from "../GLBContext/GLBContext";
gsap.registerPlugin(ScrollTrigger);

const BeerDetail = () => {
	// const { currentGLB, setCurrentGLB, setCurrentSlideIndex } = useGLB();
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".beerdetail",
				start: "0% 50%",
				end: "bottom bottom",
			},
			ease: "none",
		});

		return () => {
			if (tl) tl.kill();
		};
	}, []);
	return (
		<div className="beerdetail-wrap">
			<section className="beerdetail third-section">
				<div className="beerdetail-particle">
					<Image
						src="/images/beerdetail-particle.png"
						width={1721.52}
						height={1112.81}
						alt=""
					/>
				</div>

				<div className="beerdetail-moutain">
					<Image
						src="/images/beerdetail-moutain.png"
						width={1786.32}
						height={1149.53}
						alt=""
					/>
				</div>

				<div className="container">
					<div className="beerdetail-content">
						<div className="beerdetail-dlex">
							<div className="beerdetail-left">
								<div className="beerdetail-txt-mask">
									<h2 className="beerdetail-tt">
										Blending of a perfect ingredients
									</h2>
									<p className="beerdetail-desc">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</p>
								</div>
							</div>
							<div className="beerdetail-right">
								<div className="beerdetail-txt-mask">
									<div className="content-detail">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<VideoOne />
		</div>
	);
};

export default BeerDetail;
