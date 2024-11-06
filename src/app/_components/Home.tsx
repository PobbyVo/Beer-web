import BeerContainer from "@/app/_components/BeerContainer/BeerContainer";
import BeerWrap from "@/app/_components/BeerWrap/BeerWrap";
import { GLBProvider } from "@/app/_components/GLBContext/GLBContext";
import MoveCursor from "@/app/_components/MoveCursor/MoveCursor";
import { useGLTF } from "@react-three/drei";
import Lenis from "lenis";
import { useEffect } from "react";

const Home = () => {
	useGLTF.preload("/images/AleStout.glb");
	useGLTF.preload("/images/BelgianWhite.glb");
	useGLTF.preload("/images/IPA.glb");

	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	return (
		<main className="main">
			<GLBProvider>
				<div className="beer-layout-wrap">
					<div className="beercontainer-wrap-inner">
						<BeerContainer />
					</div>
					<BeerWrap />
				</div>
			</GLBProvider>
			<div className="move-curor-wrap">
				<MoveCursor />
			</div>
		</main>
	);
};

export default Home;
