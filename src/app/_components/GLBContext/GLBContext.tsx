import React, { createContext, useContext, useState, ReactNode } from "react";

interface GLBContextType {
	currentGLB: string;
	setCurrentGLB: React.Dispatch<React.SetStateAction<string>>;
	currentSlideIndex: number;
	setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GLBContext = createContext<GLBContextType | undefined>(undefined);

export const GLBProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [currentGLB, setCurrentGLB] = useState<string>("/images/paleAle.glb");
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); // Thêm state cho slide

	return (
		<GLBContext.Provider
			value={{
				currentGLB,
				setCurrentGLB,
				currentSlideIndex,
				setCurrentSlideIndex,
			}}
		>
			{children}
		</GLBContext.Provider>
	);
};

export const useGLB = () => {
	const context = useContext(GLBContext);
	if (context === undefined) {
		throw new Error("useGLB must be used within a GLBProvider");
	}
	return context;
};
