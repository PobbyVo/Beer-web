import { Html, Head, Main, NextScript } from "next/document";
// import demoModel from "../../public/images/paleAle.glb";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <link
					rel="preload"
					href="/images/AleStout.glb"
					as="fetch"
					type="model/gltf-binary"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/images/BelgianWhite.glb"
					as="fetch"
					type="model/gltf-binary"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/images/IPA.glb"
					as="fetch"
					type="model/gltf-binary"
					crossOrigin="anonymous"
				/> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
