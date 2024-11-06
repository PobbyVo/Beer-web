"use client";
import { useGLB } from "../GLBContext/GLBContext";
import { useEffect } from "react";
import Image from "next/image";
import "./BeerInfo.scss";
import { beers } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Model from "../BeerModel/Model";
gsap.registerPlugin(ScrollTrigger);

function BeerInfo() {
	const { setCurrentGLB, currentSlideIndex, setCurrentSlideIndex } = useGLB();

	const handleIndexChange = (delta: number) => {
		setCurrentSlideIndex((prevIndex) => {
			const newIndex = (prevIndex + delta + beers.length) % beers.length;
			updateGLB(newIndex);
			console.log("newIndex", newIndex);
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
					scrollTrigger: {
						trigger: ".beerIntroSlider",
						start: "top 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerIngredientsSlider", {
					y: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: ".beerIngredientsSlider",
						start: "top 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerInfoSlider", {
					y: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: ".beerInfoSlider",
						start: "-10% 70%",
						end: "bottom bottom",
						immediateRender: false,
					},
				})
				.to(".beerDetailsSlider", {
					y: 0,
					opacity: 1,
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
		<section className="beerinfo second-section">
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
										<div className="mediumTitle txt-main">{beer.name}</div>
										<div className="normalTitle txtse-main">{beer.alc}</div>
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
										<div className="tinyTitle txtse-main">Ingredients</div>
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
										<div className="smallTitle txtse-main">{beer.info}</div>
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
												<div className="normalTitle txt-main">4°C - 6°C</div>
											</div>
											<div className="col">
												<div className="tinyTitle txtse-main">Color</div>
												<div className="normalTitle txt-main">6 EBC</div>
											</div>
										</div>
										<div className="cols">
											<div className="col">
												<div className="tinyTitle txtse-main">Calories</div>
												<div className="normalTitle txt-main">160</div>
											</div>
											<div className="col">
												<div className="tinyTitle txtse-main">Bitterness</div>
												<div className="normalTitle txt-main">38 IBU</div>
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
							<Image
								src="/images/arrow-left.png"
								width={40}
								height={40}
								alt=""
								className="yellow"
							/>
							<Image
								src="/images/arrow-left-green.png"
								width={40}
								height={40}
								alt=""
								className="green"
							/>
							<Image
								src="/images/arrow-left-blue.png"
								width={40}
								height={40}
								alt=""
								className="blue"
							/>
							<Image
								src="/images/arrow-left-red.png"
								width={40}
								height={40}
								alt=""
								className="red"
							/>
						</div>
						<div className="slideItems">
							{beers.map((beer, index) => (
								<div
									key={index}
									className={`item slide ${
										currentSlideIndex === index ? "active" : ""
									}`}
								>
									{beer.name}
								</div>
							))}
						</div>
						<div
							className="sliderButton hide-cursor"
							onClick={() => handleIndexChange(1)}
						>
							<Image
								src="/images/arrow-right.png"
								width={40}
								height={40}
								alt=""
								className="yellow"
							/>
							<Image
								src="/images/arrow-right-green.png"
								width={40}
								height={40}
								alt=""
								className="green"
							/>
							<Image
								src="/images/arrow-right-blue.png"
								width={40}
								height={40}
								alt=""
								className="blue"
							/>
							<Image
								src="/images/arrow-right-red.png"
								width={40}
								height={40}
								alt=""
								className="red"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BeerInfo;
