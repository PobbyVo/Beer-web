import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Intro from "@/app/_components/Intro/Intro";
import "./BeerContainer.scss";
import "../BeerInfo/BeerInfo.scss";
import Model from "@/app/_components/BeerModel/Model";
import SwitchCan from "@/app/_components/SwitchCan/SwitchCan";
import { useGLB } from "@/app/_components/GLBContext/GLBContext";
import { Canvas } from "@react-three/fiber";
import { beers } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useCurrentIndex } from "@/context/CurrentIndexContext";
gsap.registerPlugin(ScrollTrigger);

const BeerContainer = () => {
	const { currentIndex, setCurrentIndex } = useCurrentIndex();
	const [active, setActive] = useState(false);
	const { currentGLB, currentSlideIndex, setCurrentGLB, setCurrentSlideIndex } =
		useGLB();

	useEffect(() => {
		const body = document.body;
		body.style.setProperty("--updateColor", "#fec417");

		return () => {
			document.body.classList.remove(
				"active-glb-pale-ale",
				"active-glb-ale-stout",
				"active-glb-belgian-white",
				"active-glb-ipa"
			);
		};
	}, []);

	const handleSwitch = () => {
		setActive(true);
		document.body.classList.add("active");

		setTimeout(() => {
			setActive(false);
			document.body.classList.remove("active");
		}, 1000);

		const paths = [
			"/images/paleAle.glb",
			"/images/AleStout.glb",
			"/images/BelgianWhite.glb",
			"/images/IPA.glb",
		];
		const classes = [
			"active-glb-pale-ale",
			"active-glb-ale-stout",
			"active-glb-belgian-white",
			"active-glb-ipa",
		];
		setCurrentGLB((prevPath) => {
			// Get the current index and calculate the next index
			const currentIndex = paths.indexOf(prevPath);
			const nextIndex = (currentIndex + 1) % paths.length;

			// Remove all classes and add the new one
			classes.forEach((className, index) => {
				body.classList.toggle(className, index === nextIndex);
			});

			// Update the current index and GLB path
			setCurrentIndex(nextIndex); // Update the current index
			setCurrentSlideIndex(nextIndex);
			return paths[nextIndex];
		});

		const body = document.body;
		const nextIndex = (currentIndex + 1) % paths.length;
		const classesColor = ["#fec417", "#20be00", "#ff2b00", "#2785ff"];
		const valueColor = classesColor[nextIndex];
		body.style.setProperty("--updateColor", valueColor);
	};

	const handleIndexChange = (delta: number) => {
		const paths = [
			"/images/paleAle.glb",
			"/images/AleStout.glb",
			"/images/BelgianWhite.glb",
			"/images/IPA.glb",
		];
		const colors = ["#fec417", "#20be00", "#ff2b00", "#2785ff"];

		// Kích hoạt hiệu ứng khi bắt đầu thay đổi index
		document.body.classList.add("active");
		setActive(true);

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

	useEffect(() => {
		document.body.classList.remove(...beers.map((beer) => beer.className));
		document.body.classList.add(beers[currentIndex].className);
		setCurrentGLB(beers[currentIndex].imagePath);
	}, [currentIndex, setCurrentGLB]);

	const updateGLB = (index: number) => {
		const { imagePath, className } = beers[index];
		setCurrentGLB(imagePath);
		document.body.classList.add(className);
	};

	useEffect(() => {
		const sliders = [
			".beerIntroSlider .slide",
			".beerIngredientsSlider .slide",
			".beerInfoSlider .slide",
			".beerDetailsSlider .slide",
			".beerinfo-navigator .item",
		];

		sliders.forEach((selector) => {
			const elements = document.querySelectorAll(selector);
			elements.forEach((element, index) => {
				element.classList.toggle("active", index === currentSlideIndex);
			});
		});
	}, [currentSlideIndex]);

	useEffect(() => {
		if (window.innerWidth > 1200) {
			const tlInfo = gsap.timeline();
			tlInfo
				.to(".beerIntroSlider", {
					y: 0,
					// opacity: 1,
					scrollTrigger: {
						trigger: ".beerIntroSlider",
						start: "top 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerIngredientsSlider", {
					y: 0,
					// opacity: 1,
					scrollTrigger: {
						trigger: ".beerIngredientsSlider",
						start: "top 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerInfoSlider", {
					y: 0,
					// opacity: 1,
					scrollTrigger: {
						trigger: ".beerInfoSlider",
						start: "-10% 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerDetailsSlider", {
					y: 0,
					// opacity: 1,
					scrollTrigger: {
						trigger: ".beerDetailsSlider",
						start: "-24% 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				});

			return () => {
				if (tlInfo) tlInfo.kill();
			};
		}
	}, []);

	return (
		<div className="beercontainer-wrap">
			<div className="background"></div>
			<div className="beercontainer">
				<div className="particle">
					<Image
						src="/images/intro-particle.png"
						width={1721.52}
						height={1112.81}
						alt=""
					/>
				</div>
				<div className="blur">
					{["", "green", "red", "blue"].map((color, index) => (
						<Image
							key={index}
							src={`/images/blur${color ? `-${color}` : ""}.png`}
							width={1201.5}
							height={942.96}
							alt=""
							className={color || "black"}
						/>
					))}
				</div>
				<div className="beercontainer-inner">
					<div className="innerWrapper">
						<div className="innerContainer innerContainer-trigger">
							<SwitchCan handleSwitch={handleSwitch} />
							<Intro />
							<div className="beerinfo second-section">
								<div className="beer-hiden"></div>
								<div className="beerinfo-dotfly">
									<Image
										src="/images/dotfly.png"
										width={1721.52}
										height={1112.81}
										alt=""
									/>
								</div>
								<div className="container">
									<div className="beerInfoWrapper d-flex f-ctn beerInfoWrapper-trigger">
										<div className="col col-4 content-left-col">
											<div className="beerInfoWrapper-item">
												<div className="beerIntroSlider">
													{beers.map((beer, index) => (
														<div
															key={index}
															className={`slide ${
																currentSlideIndex === index ? "active" : ""
															}`}
														>
															<div className="smallTitle txtse-main">
																Discover our beers
															</div>
															<div className="mediumTitle txt-main">
																{beer.name}
															</div>
															<div className="normalTitle txtse-main">
																{beer.alc}
															</div>
														</div>
													))}
												</div>
												<div className="beerIngredientsSlider">
													{beers.map((beer, index) => (
														<div
															key={index}
															className={`slide ${
																currentSlideIndex === index ? "active" : ""
															}`}
														>
															<div className="tinyTitle txtse-main">
																Ingredients
															</div>
															<div className="normalTitle txt-main">
																{beer.ingredients}
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="col col-4 canWrapper-col">
											<div className="canWrapper">
												<div className="animWrapper">
													<div className="innerCanWrapper">
														<div className="canInAnimation"></div>
													</div>
												</div>
												<div className="beerinfo-blur">
													<Image
														src="/images/beerinfo-blur.png"
														width={290.07}
														height={479.97}
														alt=""
														className="black"
													/>
													<Image
														src="/images/beerinfo-blur-green.png"
														width={290.07}
														height={479.97}
														alt="beerinfo-blur"
														className="green"
													/>
													<Image
														src="/images/beerinfo-blur-red.png"
														width={290.07}
														height={479.97}
														alt="beerinfo-blur"
														className="red"
													/>
													<Image
														src="/images/beerinfo-blur-blue.png"
														width={290.07}
														height={479.97}
														alt="beerinfo-blur"
														className="blue"
													/>
												</div>
											</div>
										</div>
										<div className="col col-4 content-right-col">
											<div className="beerInfoWrapper-item">
												<div className="beerInfoSlider">
													{beers.map((beer, index) => (
														<div
															key={index}
															className={`slide ${
																currentSlideIndex === index ? "active" : ""
															}`}
														>
															<div className="smallTitle txtse-main">
																{beer.info}
															</div>
															<div className="text txt-main">
																<p>{beer.description}</p>
															</div>
														</div>
													))}
												</div>
												<div className="beerDetailsSlider">
													{beers.map((beer, index) => (
														<div
															key={index}
															className={`slide ${
																currentSlideIndex === index ? "active" : ""
															}`}
														>
															<div className="cols">
																<div className="col">
																	<div className="tinyTitle txtse-main">
																		Storage advice
																	</div>
																	<div className="normalTitle txt-main">
																		4°C - 6°C
																	</div>
																</div>
																<div className="col">
																	<div className="tinyTitle txtse-main">
																		Color
																	</div>
																	<div className="normalTitle txt-main">
																		6 EBC
																	</div>
																</div>
															</div>
															<div className="cols">
																<div className="col">
																	<div className="tinyTitle txtse-main">
																		Calories
																	</div>
																	<div className="normalTitle txt-main">
																		160
																	</div>
																</div>
																<div className="col">
																	<div className="tinyTitle txtse-main">
																		Bitterness
																	</div>
																	<div className="normalTitle txt-main">
																		38 IBU
																	</div>
																</div>
															</div>
															<div className="extraInfo txtse-main">
																Suitable for vegetarians and vegans.
															</div>
															<button className="button hide-cursor">
																<span className="txt">Order now</span>
															</button>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
									<div className="beerinfo-navigator">
										<div className="navigatorWrapper">
											<div
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
											</div>
											<div className="slideItems">
												{beers.map((beer, index) => (
													<div
														key={index}
														className={`item slide ${
															currentSlideIndex === index ? "active" : ""
														}`}
													>
														<div className="slideItems-txt">{beer.name}</div>
													</div>
												))}
											</div>
											<div
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
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="beer__model">
				<div className="beer__model-inner">
					<div className="innerAnim">
						<div className={`scaleAnim first ${active ? "active" : ""}`}>
							<svg viewBox="0 0 89.2 89.2" className="scaleAnim-svg">
								<circle className="fill" cx="44.6" cy="44.6" r="44.6" />
								<circle className="overlay" cx="44.6" cy="44.6" r="44.6" />
							</svg>
						</div>
						<div className={`scaleAnim second ${active ? "active" : ""}`}>
							<svg viewBox="0 0 89.2 89.2" className="scaleAnim-svg">
								<circle
									className="fill"
									cx="44.6"
									cy="44.6"
									r="44.6"
									style={{ fill: "rgb(111, 142, 153)" }}
								/>
								<circle className="overlay" cx="44.6" cy="44.6" r="44.6" />
							</svg>
						</div>
					</div>
					<Canvas
						camera={{ position: [2, -10, 20], fov: 65 }}
						shadows
						className="beer__model-ani"
						style={{ pointerEvents: "none" }}
					>
						<ambientLight intensity={3} />
						<Suspense fallback={null}>
							<Model glbPath={currentGLB} currentIndex={currentIndex} />
						</Suspense>
					</Canvas>
				</div>
			</div>
			<div className="beer-title-custom">
				<div className="container">
					<div className="hugeTitle">
						<span className="txt txt-split-2">the FLavor</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BeerContainer;
