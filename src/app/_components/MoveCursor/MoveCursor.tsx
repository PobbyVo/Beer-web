import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import './MoveCursor.scss';

const MoveCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const requestRef = useRef<number | null>(null);
    const targetX = useRef<number>(0);
    const targetY = useRef<number>(0);
    const currentX = useRef<number>(0);
    const currentY = useRef<number>(0);
    const [hideCursor, setHideCursor] = useState<boolean>(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            targetX.current = e.clientX - 10;
            targetY.current = e.clientY - 10;
        };

        const animate = () => {
            if (!cursor) return;
            currentX.current += (targetX.current - currentX.current) * 0.2;
            currentY.current += (targetY.current - currentY.current) * 0.2;
            cursor.style.top = `${currentY.current + window.scrollY}px`;
            cursor.style.left = `${currentX.current}px`;
            requestRef.current = requestAnimationFrame(animate);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('.hide-cursor')) {
                setHideCursor(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('.hide-cursor')) {
                setHideCursor(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className={`move-cursor ${hideCursor ? 'hide-cursor' : ''}`} ref={cursorRef}>
            <div className="scrollDownWrapper active">
                <div className="scrollAnim is-inview">
                    <div className="circleAnim">
                        <Image
                            src="/images/mouse-text.svg"
                            width={160}
                            height={160}
                            alt=""
                            className='black'
                        />
                        <Image
                            src="/images/mouse-text-white.svg"
                            width={160}
                            height={160}
                            alt=""
                            className='white'
                        />
                    </div>
                    <div className="icon">
                        <Image
                            src="/images/mouse-Icon.svg"
                            width={48}
                            height={56}
                            alt=""
                            className='black'
                        />
                        <Image
                            src="/images/mouse-Icon-white.svg"
                            width={48}
                            height={56}
                            alt=""
                            className='white'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoveCursor;
