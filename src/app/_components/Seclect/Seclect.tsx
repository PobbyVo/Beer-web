import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import "./Seclect.scss";
import { serviceOptions } from "./docs/data";

interface ServiceOption {
	label: string;
	value: string;
}

interface SelectComponentProps {
	data: {
		email: string;
		phone: string;
		service: string;
		name: string;
	};
	setData: React.Dispatch<
		React.SetStateAction<{
			email: string;
			phone: string;
			service: string;
			name: string;
		}>
	>;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ data, setData }) => {
	const [isClearable] = useState(true);
	const [isSearchable] = useState(true);

	return (
		<>
			<Select
				className="basic-single"
				options={serviceOptions}
				isClearable={isClearable}
				isSearchable={isSearchable}
				placeholder="Which service are you interested in?"
				onChange={(e: SingleValue<ServiceOption>) => {
					if (e) {
						setData({ ...data, service: e.value });
					} else {
						setData({ ...data, service: "" }); // Clear the service if no option is selected
					}
				}}
			/>
		</>
	);
};

export default SelectComponent;
