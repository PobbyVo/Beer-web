"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Footer.scss";
import VideoThree from "../VideoThree/VideoThree";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// import { sendForm } from "../api/postForm";
import "react-toastify/dist/ReactToastify.css";
// import Joi, { any } from "joi";
// import { ToastContainer, toast } from "react-toastify";
import SelectComponent from "../Seclect/Seclect";
import Joi from "joi";
import { toast } from "react-toastify";

const Footer = () => {
	const [dataMail, setDataMail] = useState({ email: "" });
	const [isValidMail, setIsValidMail] = useState(true);
	const [errorMessageMail, setErrorMessageMail] = useState("");

	// Validate email format
	const validateEmail = (email: string): boolean => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
		return emailPattern.test(email);
	};

	const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const emailValue = e.target.value;
		setDataMail({ ...dataMail, email: emailValue }); // Update email value

		// No validation here, just update state
		setIsValidMail(true);
		setErrorMessageMail("");
	};

	const handleBlurMail = () => {
		if (!validateEmail(dataMail.email)) {
			setIsValidMail(false); // Set email validity to false
			setErrorMessageMail("Please enter a valid email address."); // Show error message
		} else {
			console.log(isValidMail);
			console.log(setIsValid(isValid));
		}
	};

	const [dataPhone, setDataPhone] = useState<{ phone: string }>({ phone: "" });
	const [isValid, setIsValid] = useState(true);

	// Validate phone number
	const validatePhone = (phone: string): boolean => {
		const phonePattern = /^\+?[0-9]{10,11}$/; // Adjust pattern to allow '+' at the beginning and 10 or 11 digits
		return phonePattern.test(phone);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remove non-numeric characters and limit to 11 digits
		const phoneValue = e.target.value.replace(/[^0-9+]/g, "").slice(0, 12);

		setDataPhone({ ...dataPhone, phone: phoneValue });
		setIsValid(validatePhone(phoneValue)); // Validate as user types
	};

	const [data, setData] = useState({
		email: "",
		phone: "",
		service: "",
		name: "",
	});

	const [errorMessages, setErrorMessages] = useState({
		email: "",
		phone: "",
		service: "",
		name: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	type ErrorMessages = {
		email: string;
		phone: string;
		service: string;
		name: string;
	};

	const schema = Joi.object({
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.messages({
				"string.email": "Invalid email format",
				"any.required": "Email is required",
			}),

		phone: Joi.string()
			.pattern(/^[0-9]{10,15}$/)
			.required()
			.messages({
				"string.pattern.base": "Phone number must be between 10 and 15 digits",
				"any.required": "Phone number is required",
			}),
		name: Joi.string().required().messages({
			"any.required": "Name is required",
		}),
		service: Joi.string().required().messages({
			"any.required": "Service selection is required",
		}),
	});

	const [successMessage, setSuccessMessage] = useState("");

	const sendFormHandler = async () => {
		setErrorMessages({ name: "", phone: "", email: "", service: "" });
		setSuccessMessage("");
		setIsLoading(true); // Bắt đầu tải
		// const newErrors: {
		// 	email: string;
		// 	phone: string;
		// 	service: string;
		// 	name: string;
		// } = {
		// 	email: "",
		// 	phone: "",
		// 	service: "",
		// 	name: "",
		// };

		// Validate data using Joi schema
		const { error } = schema.validate(data, { abortEarly: false });
		if (error) {
			// Initialize newErrors with the ErrorMessages type
			const newErrors: ErrorMessages = {
				email: "",
				phone: "",
				service: "",
				name: "",
			};

			error.details.forEach((err) => {
				const key = err.path[0] as keyof ErrorMessages;

				switch (key) {
					case "email":
						newErrors.email = "Email is required";
						break;
					case "phone":
						newErrors.phone = "Phone number is required";
						break;
					case "service":
						newErrors.service = "Service selection is required";
						break;
					case "name":
						newErrors.name = "Name is required";
						break;
					default:
						// Nếu có trường khác không nằm trong các trường trên
						// newErrors[key] = err.message;
						break;
				}
			});

			setErrorMessages(newErrors);
			setIsLoading(false); // Kết thúc tải
			return;
		}

		try {
			console.log(data);
			// const response = await sendForm(
			// 	data.email,
			// 	data.phone,
			// 	data.service,
			// 	data.name
			// );
			setSuccessMessage(
				"Registration successful. We will contact you shortly!"
			);
			toast.success("Registration successful. We will contact you shortly!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			// console.log("data", data);
		} catch (err) {
			console.error(err);
			toast.error(
				"One or more entries have errors. Please check and try again."
			);
		} finally {
			setIsLoading(false); // Kết thúc tải
		}
	};

	useEffect(() => {
		const spinner = document.querySelector(".wpcf7-spinner"); // Lấy phần tử spinner
		if (spinner) {
			if (isLoading) {
				spinner.classList.add("loading"); // Thêm lớp loading khi đang tải
			} else {
				spinner.classList.remove("loading"); // Xóa lớp loading khi đã tải xong
			}
		}
	}, [isLoading]); // Chạy khi isLoading thay đổi

	const handleFocus = () => {
		setErrorMessages({ name: "", phone: "", email: "", service: "" });
		setSuccessMessage("");
	};

	useEffect(() => {
		if (window.innerWidth > 1200) {
			const tlFooter = gsap.timeline({
				scrollTrigger: {
					trigger: ".footer-wrap",
					start: "0% 30%",
					// markers: true,
				},
				ease: "power2.out",
			});

			tlFooter.fromTo(
				".footer-contact-flex",
				{
					yPercent: 100,
				},
				{
					yPercent: 0,
				}
			);
			return () => {
				if (tlFooter) tlFooter.kill();
			};
		}
	}, []);
	return (
		<footer className="footer">
			<VideoThree />
			<div className="footer-wrap">
				<div className="footer-contact">
					<div className="container">
						<div className="footer-contact-flex">
							<div className="footer-contact-content">
								<div className="footer-contact-tt">Become part of our hood</div>
								<div className="footer-contact-desc">
									Only the absolute pioneers who sign up for our newsletter get
									a front row seat, because at Craft District we cherish those
									who embrace this adventure with us from the very beginning.
								</div>
							</div>
							<div className="footer-contact-form">
								<div className="form-tt">INTERESTED?</div>
								<form className="form" action="">
									<div className="form-group">
										<input
											className="form-control"
											size={40}
											placeholder="Name"
											type="text"
											onFocus={handleFocus} // Thêm onFocus
											onChange={(e) =>
												setData({ ...data, name: e.target.value })
											}
										/>
										{errorMessages.name && (
											<span className="error-message">
												{errorMessages.name}
											</span>
										)}
									</div>
									<div className="form-group">
										<span className="form-control-wrap" data-name="your-tel">
											<input
												className="form-control"
												size={40}
												placeholder="Phone number"
												type="tel"
												name="your-tel"
												onChange={(e) => {
													setData({ ...data, phone: e.target.value });
													handleChange(e);
												}}
												value={dataPhone.phone}
											/>
											{errorMessages.phone && (
												<span className="error-message">
													{errorMessages.phone}
												</span>
											)}
										</span>
									</div>
									<div className="form-group">
										<span className="form-control-wrap" data-name="your-email">
											<input
												className="form-control"
												size={40}
												placeholder="Email"
												type="email"
												onFocus={
													handleFocus // Call handleFocus with the event
												}
												onChange={(e) => {
													setData({ ...data, email: e.target.value }); // Update state
													handleChangeMail(e);
												}}
												onBlur={handleBlurMail} // Validate on blur
												value={dataMail.email}
											/>
											{errorMessageMail ? ( // Check if errorMessageMail exists
												<div className="invalid-feedback">
													{errorMessageMail}
												</div>
											) : (
												// If errorMessageMail does not exist, check for errorMessages.email
												errorMessages.email && (
													<span className="error-message">
														{errorMessages.email}
													</span>
												)
											)}
										</span>
									</div>
									<div className="form-group">
										<SelectComponent data={data} setData={setData} />
										{errorMessages.service && (
											<span className="error-message selectComponent">
												{errorMessages.service}
											</span>
										)}
									</div>
									<div
										className="form-group form-group-btn"
										onClick={() => sendFormHandler()}
									>
										<div className="btn-form">
											<div className="btn">
												<span className="txt"> Contact now</span>
												<span className="wpcf7-spinner"></span>
											</div>
										</div>
										{successMessage && (
											<div className="success-message">{successMessage}</div>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-info">
					<div className="container">
						<div className="footer-info-content">
							<div className="item">
								<p className="txt">All right reserved by</p>
								<a href="https://mona.media/" className="logo">
									<Image
										src="/images/logo-mona.png"
										width={213}
										height={77}
										alt="logo"
									/>
								</a>
							</div>
							<div className="item">
								<p className="txt">Terms & Privacy</p>
								<div className="link-wrap">
									<a href="" className="link">
										<Image
											src="/images/logo-fb.png"
											width={39.789}
											height={39.789}
											alt="logo"
										/>
									</a>
									<a href="" className="link">
										<Image
											src="/images/logo-insta.png"
											width={39.789}
											height={39.789}
											alt="logo"
										/>
									</a>
									<a href="" className="link">
										<Image
											src="/images/logo-linklin.png"
											width={39.789}
											height={39.789}
											alt="logo"
										/>
									</a>
									<a href="" className="link">
										<Image
											src="/images/logo-youtube.png"
											width={39.789}
											height={39.789}
											alt="logo"
										/>
									</a>
								</div>
							</div>
						</div>
						<div className="footer-info-copyright">
							<p className="txt">© 2024 BrewDistrict24 - All rights reserved</p>
							<span>|</span>
							<a href="#">Cookies</a>
							<span>|</span>
							<a href="#">Privacy policy</a>
							<span>|</span>
							<a href="#">Return policy</a>
							<span>|</span>
							<a href="#">General conditions</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
