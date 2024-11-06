"use client";
import { useGLB } from "../GLBContext/GLBContext";
import { useEffect } from "react";
import Image from "next/image";
import "./BeerSlide.scss";
import { beers } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function BeerSlide() {
	const { setCurrentGLB, currentSlideIndex, setCurrentSlideIndex } = useGLB();

	const handleIndexChange = (delta: number) => {
		setCurrentSlideIndex((prevIndex) => {
			const newIndex = (prevIndex + delta + beers.length) % beers.length;
			updateGLB(newIndex);
			return newIndex;
		});
	};

	const updateGLB = (index: number) => {
		const { imagePath, className } = beers[index];
		setCurrentGLB(imagePath); // Cập nhật GLB theo chỉ số slide
		document.body.classList.remove(...beers.map((beer) => beer.className));
		document.body.classList.add(className);
	};

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
		<>
			<section className="beerslide section-six beerslide-trigger">
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
			</section>
			<div className="beerslider-navigator">
				<div className="navigatorWrapper">
					<button
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
					</button>
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
					<button
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
					</button>
				</div>
			</div>
		</>
	);
}

export default BeerSlide;
