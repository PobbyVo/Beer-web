import { useEffect, Suspense, useState } from "react";
// import BeerDetail from "../BeerDetail/BeerDetail";
import VideoTwo from "../VideoTwo/VideoTwo";
import Experience from "../Experience/Experience";
// import BeerSlide from "../BeerSlide/BeerSlide";
import { Canvas } from "@react-three/fiber";
import { useGLB } from "../GLBContext/GLBContext";
import Image from "next/image";
import { beers } from "../data";
import VideoOne from "../VideoOne/VideoOne";
import ModelTwo from "../BeerModel/ModelTwo";
import "../BeerDetail/BeerDetail.scss";
import "../BeerSlide/BeerSlide.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Model from "../BeerModel/Model";
import { useCurrentIndex } from "@/context/CurrentIndexContext";
// import { log } from "console";
gsap.registerPlugin(ScrollTrigger);

const BeerWrap = () => {
	const [active, setActive] = useState(false);
	const { currentIndex, setCurrentIndex } = useCurrentIndex();

	// detail
	const { currentGLB, currentSlideIndex, setCurrentGLB, setCurrentSlideIndex } =
		useGLB();
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".beerdetail",
				start: "0% 50%",
				end: "bottom bottom",
				// markers: true,
			},
			ease: "none",
		});

		return () => {
			if (tl) tl.kill();
		};
	}, []);

	// useEffect(() => {
	// 	const body = document.body;
	// 	body.style.setProperty("--updateColor", "#fec417");
	// 	return () => {
	// 		document.body.classList.remove(
	// 			"active-glb-pale-ale",
	// 			"active-glb-ale-stout",
	// 			"active-glb-belgian-white",
	// 			"active-glb-ipa"
	// 		);
	// 	};
	// }, []);

	// slide
	const handleIndexChange = (delta: number) => {
		setActive(true);
		const paths = [
			"/images/paleAle.glb",
			"/images/AleStout.glb",
			"/images/BelgianWhite.glb",
			"/images/IPA.glb",
		];
		const colors = ["#fec417", "#20be00", "#ff2b00", "#2785ff"];

		// Kích hoạt hiệu ứng khi bắt đầu thay đổi index
		document.body.classList.add("active");

		// Thời gian tắt hiệu ứng
		setTimeout(() => {
			setActive(false);
			document.body.classList.remove("active");
		}, 1000);

		// Cập nhật currentIndex
		setCurrentIndex((prevIndex) => {
			// Tính chỉ số mới (newIndex) sau khi thay đổi
			const newIndex = (prevIndex + delta + paths.length) % paths.length;

			// Cập nhật GLB và slide hiện tại
			updateGLB(newIndex);
			setCurrentSlideIndex(newIndex);

			// Cập nhật màu sắc của body dựa vào chỉ số mới
			const valueColor = colors[newIndex];
			document.body.style.setProperty("--updateColor", valueColor);

			return newIndex;
		});
	};

	const updateGLB = (index: number) => {
		const { imagePath, className } = beers[index];
		setCurrentGLB(imagePath);
		document.body.classList.remove(...beers.map((beer) => beer.className));
		document.body.classList.add(className);
	};

	useEffect(() => {
		setCurrentGLB(beers[currentIndex].imagePath);
	}, [currentIndex, setCurrentGLB]);

	useEffect(() => {
		const sliders = [
			".beerslider-content .slide",
			".beerslider-navigator .item",
		];

		sliders.forEach((selector) => {
			const elements = document.querySelectorAll(selector);
			elements.forEach((element, index) => {
				element.classList.toggle("active", index === currentSlideIndex);
			});
		});
	}, [currentSlideIndex]);

	return (
		<div className={`beerWrap ${active ? "active" : ""}`}>
			{/* <BeerDetail /> */}
			<div className="beerdetail-wrap">
				<div className="beer__model-two">
					<Canvas
						camera={{ position: [2, -10, 20], fov: 65 }}
						shadows
						className="beer__model-ani"
						style={{ pointerEvents: "none" }}
					>
						<ambientLight intensity={3} />
						<Suspense fallback={null}>
							<ModelTwo glbPath={currentGLB} currentIndex={currentIndex} />
						</Suspense>
					</Canvas>
				</div>
				<div className="beerdetail third-section">
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua.
										</p>
									</div>
								</div>
								<div className="beerdetail-right">
									<div className="beerdetail-txt-mask">
										<div className="content-detail">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Ut enim ad minim veniam, quis nostrud exercitation
											ullamco laboris nisi ut aliquip ex ea commodo consequat.
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum dolore eu fugiat nulla pariatur. Excepteur
											sint occaecat cupidatat non proident, sunt in culpa qui
											officia deserunt mollit anim id est laborum
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<VideoOne />
			</div>
			<div className="VideoTwo-Experience">
				<VideoTwo />
				<Experience />
			</div>
			{/* <BeerSlide /> */}
			<div className="beerslide section-six beerslide-trigger">
				<div className="beerslide-wrap">
					<div className="container">
						<div className="beerslide-wrap-inner">
							<div className="beerslider-content">
								{beers.map((beer, index) => (
									<div
										key={index}
										className={`slide ${
											currentSlideIndex === index ? "active" : ""
										}`}
									>
										<div className="beerslider-tt txt-main">{beer.name}</div>
										<div className="beerslider-desc">{beer.info}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="beerslide-dotfly">
					<Image
						src="/images/beerslide-dotfly.png"
						width={1721.52}
						height={1129.44}
						alt=""
					/>
				</div>
				<div className="beerslide-mountain">
					<Image
						src="/images/beerslide-mountain.png"
						width={1797.11}
						height={1218}
						alt=""
					/>
				</div>
				<div className="beerslide-blur">
					<Image
						src="/images/beerslide-blur-yellow.png"
						width={481.57}
						height={598.87}
						alt=""
						className="yellow"
					/>
					<Image
						src="/images/beerslide-blur-green.png"
						width={481.57}
						height={598.87}
						alt=""
						className="green"
					/>
					<Image
						src="/images/beerslide-blur-blue.png"
						width={481.57}
						height={598.87}
						alt=""
						className="blue"
					/>
					<Image
						src="/images/beerslide-blur-red.png"
						width={481.57}
						height={598.87}
						alt=""
						className="red"
					/>
				</div>
			</div>
			<div className="beerslider-navigator">
				<div className="navigatorWrapper">
					<button
						className="sliderButton hide-cursor"
						onClick={() => handleIndexChange(-1)}
					>
						<div className="sliderButton-inner left">
							<div className="sliderButton-inner-border">
								<div className="inner"></div>
							</div>
							<div className="sliderButton-inner-arrow up">
								<div className="inner"></div>
							</div>
							<div className="sliderButton-inner-arrow down">
								<div className="inner"></div>
							</div>
						</div>
					</button>
					<div className="slideItems">
						{beers.map((beer, index) => (
							<div
								key={index}
								className={`item slide ${
									currentSlideIndex === index ? "active" : ""
								}`}
							>
								<div className="slideItems-text">{beer.name}</div>
							</div>
						))}
					</div>
					<button
						className="sliderButton hide-cursor"
						onClick={() => handleIndexChange(1)}
					>
						<div className="sliderButton-inner right">
							<div className="sliderButton-inner-border">
								<div className="inner"></div>
							</div>
							<div className="sliderButton-inner-arrow up">
								<div className="inner"></div>
							</div>
							<div className="sliderButton-inner-arrow down">
								<div className="inner"></div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BeerWrap;
