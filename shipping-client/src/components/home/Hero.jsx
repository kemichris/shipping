import { useEffect, useState } from "react";

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
        <h1>WE DELIVER ON TIME</h1>

        <div>
          <form>
            <input type="search" name="" id="" />
            <button type="submit">Track Now</button>
          </form>
        </div>

        <p>
          Join the millions getting bargain deals on shipping cars, furniture,
          freight, and more.
        </p>
      </div>
    </section>
  );
}
