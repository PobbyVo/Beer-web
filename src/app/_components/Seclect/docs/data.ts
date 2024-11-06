export interface ServiceOption {
	readonly value: string;
	readonly label: string;
	readonly isFixed?: boolean;
}

export const serviceOptions: readonly ServiceOption[] = [
	{
		value: "Website for business",
		label: "Website for business",
		isFixed: true,
	},
	{ value: "SEO/Marketing", label: "SEO/Marketing" },
	{ value: "Photo & Video service", label: "Photo & Video service" },
	{ value: "Hosting/VPS", label: "Hosting/VPS" },
	{ value: "Domain Transfer", label: "Domain Transfer" },
	{
		value: "Web-App - Business management software system",
		label: "Web-App - Business management software system",
	},
	{ value: "Mobile/App", label: "Mobile/App" },
	{
		value: "Deploy IOS Android application",
		label: "Deploy IOS Android application",
	},
	{
		value: "Outsource - Only for Partner",
		label: "Outsource - Only for Partner",
	},
];
