import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { MeshStandardMaterial } from "three";
import "./Model.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface TrackGLTF extends GLTF {
	nodes: {
		Cylinder006: THREE.Mesh;
		Cylinder006_1: THREE.Mesh;
	};
	materials: {
		base: MeshStandardMaterial;
		bel: MeshStandardMaterial;
	};
}
interface ModelProps {
	glbPath: string;
	currentIndex: number;
}

export default function ModelTwo({
	glbPath,
	currentIndex,
	...props
}: ModelProps) {
	const { nodes, materials } = useGLTF(glbPath) as TrackGLTF;
	const refBeer = useRef<THREE.Group>(null!);
	const beer = useRef<THREE.Group>(null!);
	const { scene, camera } = useThree();

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (beer.current) {
			beer.current.rotation.z = Math.sin(time * 1) * 0.1;
		}
	});

	const totalTime = 1;
	const rotationSpeed = (720 / totalTime) * (Math.PI / 180);
	const targetRotationY = (720 * Math.PI) / 180;
	const isRotating = useRef(true);

	useFrame((stale, delta) => {
		if (currentIndex >= 1 && refBeer.current && isRotating.current) {
			refBeer.current.rotation.y += rotationSpeed * delta;
			if (refBeer.current.rotation.y >= targetRotationY) {
				refBeer.current.rotation.y = targetRotationY;
				isRotating.current = false;
			}
		}
	});

	useEffect(() => {
		const beerLayoutWrap = document.querySelector(".beer-layout-wrap");
		gsap.set(scene.position, {
			x: -0.1,
			y: 50,
			z: -0.06,
		});

		const mm = gsap.matchMedia();
		let tlThird: gsap.core.Timeline;

		mm.add("(min-width: 1200px)", () => {
			tlThird = gsap.timeline({
				scrollTrigger: {
					trigger: ".third-section",
					start: "top bottom",
					end: "bottom-=300 bottom",
					scrub: 3,
					// markers: true,
				},
			});

			tlThird
				.fromTo(".beerdetail", { y: "0" }, { y: "-200px" }, "key0")
				.fromTo(".beerdetail-dlex", { y: "0" }, { y: "200px" }, "key0")
				.to(scene.rotation, { x: 0, y: 8, z: 2.2 });
		});

		mm.add("(max-width: 1200px)", () => {
			tlThird = gsap.timeline({
				scrollTrigger: {
					trigger: ".third-section",
					start: "top bottom",
					end: "bottom-=300 bottom",
					scrub: 1,
				},
			});

			tlThird
				.fromTo(".beerdetail", { y: 0 }, { y: "-100px" }, "key0")
				.fromTo(
					".beerdetail-dlex",
					{ y: 0 },
					{ y: "100px", ease: "power2.out", duration: 1 },
					"key0"
				)
				.to(scene.rotation, { x: 0, y: 8, z: 2.2 });
		});

		const tlSlide = gsap.timeline({
			scrollTrigger: {
				trigger: ".beerslide-trigger",
				start: "top-=100 70%",
				end: "bottom bottom",
				scrub: 1,
				// markers: true,
			},
		});

		const tllayoutwrap = gsap.timeline({
			scrollTrigger: {
				trigger: ".beerWrap",
				start: "top 50%",
				end: "bottom bottom",
				scrub: true,
				// markers: true,
				onEnter: () => {
					// console.log("onEnter");
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.add("start");
					}

					gsap.to(scene.position, {
						x: -0.1,
						y: 0,
						z: -0.06,
					});

					gsap.to(".beer__model", {
						y: "120%",
						opacity: 0,
					});
				},
				onLeave: () => {
					// console.log("onLeave");
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.add("end");
					}
				},
				onEnterBack: () => {
					// console.log("onEnterBack");
					const beerLayoutWrap = document.querySelector(".beer-layout-wrap");
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.remove("end");
					}
				},
				onLeaveBack: () => {
					// console.log("onLeaveBack");
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.remove("end");
						beerLayoutWrap.classList.remove("start");
					}
					gsap.to(scene.position, {
						x: -0.1,
						y: 50,
						z: -0.06,
					});
					gsap.to(scene.rotation, {
						x: -1,
						y: 0,
						z: 0,
					});
					gsap.to(".beer__model", {
						y: "0",
						opacity: 1,
					});
				},
			},
		});

		tlSlide
			.to(
				camera.position,
				{
					x: 1,
					y: -1,
					z: 24,
					ease: "power2.in",
					duration: 1,
				},
				"key0"
			)
			.to(
				scene.position,
				{
					x: -1,
					y: 10.5,
					z: 1,
					ease: "power2.in",
					duration: 1,
				},
				"key0"
			)
			.fromTo(
				scene.rotation,
				{
					x: 1,
					y: 0,
					z: 0,
				},
				{
					x: 6.1,
					y: 0,
					z: 0,
					ease: "power2.in",
					duration: 1,
				},
				"key0"
			)
			.to(
				refBeer.current.rotation,
				{
					y: targetRotationY / 2, // Rotate to the target rotation
					duration: totalTime, // Duration of the animation
				},
				"key0"
			);

		return () => {
			if (tllayoutwrap) tllayoutwrap.kill();
			if (tlSlide) tlSlide.kill();
			if (tlThird) tlThird.kill(); // Kill timeline if it exists
		};
	}, []);

	useEffect(() => {
		if (currentIndex >= 0) {
			refBeer.current.rotation.y = 0;
			gsap.to(refBeer.current.rotation, {
				y: targetRotationY, // Rotate to the target rotation
				duration: totalTime, // Duration of the animation
				delay: 0.1,
			});
			gsap.fromTo(
				".beer__model-ani",
				{
					y: "-100px",
				},
				{
					y: "0",
				}
			);
			gsap.fromTo(
				".beerInfoWrapper-item",
				{
					opacity: 0,
					x: "100px",
				},
				{
					opacity: 1,
					x: "0",
					delay: 0.8,
				}
			);
			gsap.fromTo(
				".beerslider-content .slide.active",
				{
					display: "none",
					x: "100px",
				},
				{
					display: "block",
					x: "0",
				}
			);
			gsap.fromTo(
				".slideItems .item.active .slideItems-text",
				{
					display: "none",
					x: "100px",
				},
				{
					display: "block",
					x: "0",
				}
			);
		} else {
			isRotating.current = true; // Reset the rotation flag for other indices
		}
	}, [currentIndex]);

	return (
		<>
			<directionalLight position={[-1000, -500, 1700]} intensity={5} />
			<ambientLight intensity={0.2} />
			<group ref={beer} {...props}>
				<group
					castShadow
					position={[0.5, 4, 5]}
					rotation={[0.6, -0.1, -0.06]}
					scale={0.22}
					ref={refBeer}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cylinder006.geometry}
						material={materials.base}
					/>

					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cylinder006_1.geometry}
						material={materials.bel}
					/>
				</group>
			</group>
		</>
	);
}
