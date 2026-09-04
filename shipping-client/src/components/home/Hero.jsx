import { useEffect, useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";

import { Button } from "../common/Button";

import heroImg1 from "../../assets/heroImg1.jpg";
import heroImg2 from "../../assets/heroImg2.avif";
import heroImg3 from "../../assets/heroImg3.avif";
import heroImg4 from "../../assets/heroImg4.avif";

export function Hero() {
  const images = [heroImg1, heroImg2, heroImg3, heroImg4];
  const imageCount = images.length;

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageCount]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center gap-2 px-4">
      {/* Background images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold lg:text-6xl md:text-5xl text-white text-center">
          WE DELIVER <span className="text-sky-400">ON TIME</span>
        </h1>

        <div className="rounded-3xl border border-white/40 bg-white/20 p-6 backdrop-blur-xl shadow-xl w-full my-6">
          <form className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <input
              type="search"
              name=""
              id=""
              placeholder="Enter your tracking ID"
              className="h-12 min-h-12 bg-white rounded flex-1 px-2 text-base"
            />
            <button
              type="submit"
              className="shrink-0 w-full md:w-auto justify-center bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105"
            >
              <FaSearchLocation />
              Track Now
            </button>
          </form>
        </div>

        <p className="text-white text-center text-base md:text-lg">
          Join the millions getting bargain deals on shipping cars, furniture,
          freight, and more.
        </p>

        <Button
          to="/contact"
          icon={<MdOutlineSupportAgent size={25} />}
          text="Get Started"
        />
      </div>
    </section>
  );
}
