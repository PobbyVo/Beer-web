"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import "./Header.scss";

function Header() {
	const barsRef = useRef<HTMLDivElement | null>(null);
	const navRef = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		if (navRef.current && barsRef.current) {
			navRef.current.classList.toggle("active");
			barsRef.current.classList.toggle("active");

			if (navRef.current.classList.contains("active")) {
				document.body.classList.add("no-scroll");
			} else {
				document.body.classList.remove("no-scroll");
			}
		}
	};

	useEffect(() => {
		let lastScrollTop = 50;

		const handleScroll = () => {
			const currentScrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (currentScrollTop > lastScrollTop) {
				// Scroll Down
				document.body.classList.add("scroll-down");
				document.body.classList.remove("scroll-up");
			} else if (currentScrollTop < lastScrollTop) {
				// Scroll Up
				document.body.classList.add("scroll-up");
				document.body.classList.remove("scroll-down");
			}

			lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className="header">
			<div className="container">
				<div className="header-nav">
					<div className="header-logo hide-cursor">
						{["", "green", "red", "blue"].map((color, index) => (
							<Image
								key={index}
								src={`/images/logo-beer${color ? `-${color}` : ""}.png`}
								width={214}
								height={84}
								alt=""
								className={color || "black"}
							/>
						))}
					</div>
					<div className="nav-bars" ref={barsRef} onClick={handleClick}>
						<FaBarsStaggered />
						<FaXmark />
					</div>
					<div className="header-menu" ref={navRef}>
						<ul className="header-menu-list">
							<li className="header-menu-item hide-cursor">
								<Link href="/" className="header-menu-link">
									Beer
								</Link>
							</li>
							<li className="header-menu-item hide-cursor">
								<Link href="/" className="header-menu-link">
									Our Story
								</Link>
							</li>
							<li className="header-menu-item hide-cursor">
								<Link href="/" className="header-menu-link">
									Our Mission
								</Link>
							</li>
							<li className="header-menu-item hide-cursor">
								<Link href="/" className="header-menu-link">
									Where to Find Us
								</Link>
							</li>
							<li className="header-menu-item hide-cursor">
								<Link href="/" className="header-menu-link">
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
