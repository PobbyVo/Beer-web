export interface Beer {
	name: string;
	alc: string;
	ingredients: string;
	description: string;
	info: string;
	imagePath: string;
	className: string;
	colorPath: string;
}
export const beers: Beer[] = [
	{
		name: "Pale ALE",
		alc: "alc. 4.5% vOL 330ML",
		ingredients:
			"Malted Barley (Pilsner, Wheat, Light Crystal, Munich), Wheat, Hops (Perle, Simcoe, Citra), Water, Yeast",
		description:
			"We love our American cousins. But sometimes they can be kind of full on. So we've crafted this beer to more British Tastes. Hoppy, fruity and dry, ours is a drinkable 4%. Made with American hops, its still got all the punch of a pale ale. Just less shouty.",
		info: "sAVOUR THE PLEASANT BITTERNESS OF British Tastes PALE ALE",
		imagePath: "/images/paleAle.glb",
		className: "active-glb-pale-ale",
		colorPath: "#fec417",
	},
	{
		name: "ALE STOUT",
		alc: "alc. 4.5% vOL 330ML",
		ingredients:
			"Malted Barley (Pilsner, Wheat, Light Crystal, Munich), Wheat, Hops (Perle, Simcoe, Citra), Water, Yeast",
		description:
			"We love our American cousins. But sometimes they can be kind of full on. So we've crafted this beer to more British Tastes. Hoppy, fruity and dry, ours is a drinkable 4%. Made with American hops, its still got all the punch of a pale ale. Just less shouty.",
		info: "sAVOUR THE PLEASANT BITTERNESS OF British Tastes ALE STOUT",
		imagePath: "/images/AleStout.glb",
		className: "active-glb-ale-stout",
		colorPath: "#20be00",
	},
	{
		name: "Belgian White",
		alc: "alc. 4.5% vOL 330ML",
		ingredients:
			"Malted Barley (Pilsner, Wheat, Light Crystal, Munich), Wheat, Hops (Perle, Simcoe, Citra), Water, Yeast",
		description:
			"We love our American cousins. But sometimes they can be kind of full on. So we've crafted this beer to more British Tastes. Hoppy, fruity and dry, ours is a drinkable 4%. Made with American hops, its still got all the punch of a pale ale. Just less shouty.",
		info: "sAVOUR THE PLEASANT BITTERNESS OF British Tastes Belgian White",
		imagePath: "/images/BelgianWhite.glb",
		className: "active-glb-belgian-white",
		colorPath: "#ff2b00",
	},
	{
		name: "IPA",
		alc: "alc. 4.5% vOL 330ML",
		ingredients:
			"Malted Barley (Pilsner, Wheat, Light Crystal, Munich), Wheat, Hops (Perle, Simcoe, Citra), Water, Yeast",
		description:
			"We love our American cousins. But sometimes they can be kind of full on. So we've crafted this beer to more British Tastes. Hoppy, fruity and dry, ours is a drinkable 4%. Made with American hops, its still got all the punch of a pale ale. Just less shouty.",
		info: "sAVOUR THE PLEASANT BITTERNESS OF British Tastes IPA",
		imagePath: "/images/IPA.glb",
		className: "active-glb-ipa",
		colorPath: "#2785ff",
	},
];
