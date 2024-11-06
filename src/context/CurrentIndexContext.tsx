import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

interface CurrentIndexContextType {
	currentIndex: number;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const CurrentIndexContext = createContext<CurrentIndexContextType | undefined>(
	undefined
);

export const CurrentIndexProvider = ({ children }: { children: ReactNode }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<CurrentIndexContext.Provider value={{ currentIndex, setCurrentIndex }}>
			{children}
		</CurrentIndexContext.Provider>
	);
};

export const useCurrentIndex = () => {
	const context = useContext(CurrentIndexContext);
	if (!context) {
		throw new Error(
			"useCurrentIndex must be used within a CurrentIndexProvider"
		);
	}
	return context;
};
