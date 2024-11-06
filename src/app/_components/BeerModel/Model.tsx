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

export default function Model({ glbPath, currentIndex, ...props }: ModelProps) {
	// const { nodes, materials } = useGLTF(glbPath) as TrackGLTF;

	const { nodes, materials } = useGLTF(glbPath) as TrackGLTF;

	const refBeer = useRef<THREE.Group>(null!);
	const beer = useRef<THREE.Group>(null!);
	const { scene } = useThree();
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
		const beerLayoutWrap = document.querySelector(".beercontainer-wrap");
		refBeer.current.rotation.y = 0;
		const tllayout = gsap.timeline({
			scrollTrigger: {
				trigger: ".beercontainer-wrap",
				start: "top top",
				end: "bottom bottom",
				scrub: 1,
				// markers: true,
				onLeave: () => {
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.add("sticky");
					}
				},
				onLeaveBack: () => {
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.remove("sticky");
					}
				},
				onEnterBack: () => {
					if (beerLayoutWrap) {
						beerLayoutWrap.classList.remove("sticky");
					}
				},
			},
		});

		ScrollTrigger.matchMedia({
			// Điều kiện cho màn hình dưới 1727px
			"(max-width: 1727px)": function () {
				tllayout
					.fromTo(
						scene.rotation,
						{ x: -0.1, y: -0.1, z: -0.06 },
						{ x: 6.2, y: -0.1, z: -0.06 },
						"key0"
					)
					.fromTo(
						scene.position,
						{ x: 0.5, y: -3, z: 5 },
						{ x: 0.5, y: -1.5, z: 5 }, // Thay đổi y: -1.5 thành y: -4 khi dưới 1727px
						"key0"
					)
					.to(
						refBeer.current.rotation,
						{
							y: targetRotationY / 2,
							duration: totalTime,
							delay: 0.1,
						},
						"key0"
					);
			},

			"(max-width: 1200px)": function () {
				tllayout
					.fromTo(
						scene.rotation,
						{ x: -0.1, y: -0.1, z: -0.06 },
						{ x: 6.2, y: -0.1, z: -0.06 },
						"key0"
					)
					.fromTo(
						scene.position,
						{ x: 0.5, y: -3, z: 5 },
						{ x: 0.5, y: -3.5, z: 5 }, // Thay đổi y: -1.5 thành y: -4 khi dưới 1727px
						"key0"
					)
					.to(
						refBeer.current.rotation,
						{
							y: targetRotationY / 2,
							duration: totalTime,
							delay: 0.1,
						},
						"key0"
					);
			},

			// Điều kiện cho màn hình trên 1727px
			"(min-width: 1728px)": function () {
				tllayout
					.fromTo(
						scene.rotation,
						{ x: -0.1, y: -0.1, z: -0.06 },
						{ x: 6.2, y: -0.1, z: -0.06 },
						"key0"
					)
					.fromTo(
						scene.position,
						{ x: 0.5, y: -3, z: 5 },
						{ x: 0.5, y: -3.5, z: 5 }, // Giữ nguyên y: -1.5 khi trên 1727px
						"key0"
					)
					.to(
						refBeer.current.rotation,
						{
							y: targetRotationY / 2,
							duration: totalTime,
							delay: 0.1,
						},
						"key0"
					);
			},
		});

		return () => {
			if (tllayout) tllayout.kill();
		};
	}, []);

	// .fromTo(
	// 	scene.position,
	// 	{ x: 0.5, y: -3, z: 5 },
	// 	{ x: 0.5, y: -4, z: 5 },
	// 	"key0"
	// )

	useEffect(() => {
		if (currentIndex >= 0) {
			refBeer.current.rotation.y = 0;
			gsap.to(refBeer.current.rotation, {
				y: targetRotationY, // Rotate to the target rotation
				duration: totalTime, // Duration of the animation
				delay: 0.1,
				onComplete: () => {
					isRotating.current = false; // Set rotating to false when done
				},
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
				".slideItems .slide.active .slideItems-txt",
				{
					display: "none",
					x: "100px",
				},
				{
					display: "block",
					x: "0",
					delay: 0.8,
				}
			);
		} else {
			isRotating.current = true; // Reset the rotation flag for other indices
		}

		if (currentIndex == 1) {
			gsap.fromTo(
				".scaleAnim-second",
				{
					width: "0",
					height: "0",
				},
				{
					width: "200vw",
					height: "200vh",
				}
			);
		}
	}, [currentIndex]);

	return (
		<>
			<directionalLight position={[10, -2, -2]} intensity={5} />
			<directionalLight position={[-2.4, -1, 2]} intensity={5} />
			<ambientLight intensity={0.2} />
			<group ref={beer} {...props}>
				<group
					castShadow
					position={[0.5, 4, 5]}
					rotation={[0.6, -0.1, -0.06]}
					scale={0.17}
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
