import React, { useEffect } from "react";
import "./VideoOne.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const VideoOne = () => {
  useEffect(() => {
    const videoElem =
      document.querySelector<HTMLVideoElement>(".videone video");

    if (videoElem) {
      ScrollTrigger.create({
        trigger: videoElem,
        start: "top 80%",
        end: "bottom top",
        // markers: true,
        onEnter: () => videoElem.play(),
        onEnterBack: () => videoElem.play(),
        onLeave: () => videoElem.pause(),
        onLeaveBack: () => videoElem.pause(),
      });
    }
  }, []);
  return (
    <div className="videone four-section">
      <video width="320" height="240" muted loop className="video">
        <source src="/videos/videoone.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoOne;
