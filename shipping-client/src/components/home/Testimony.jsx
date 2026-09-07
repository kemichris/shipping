import { Cta } from "./Cta";


const testimonies = [
  {
    review:
      "I've been using this shipping company for a while now, and I must say, they never disappoint. Their staff are always friendly, and they take great care of my packages. I would recommend them to anyone looking for a reliable shipping service.",
    name: "- kristen Hans",
  },
  {
    review:
      "I was blown away by the fast and efficient service provided by this shipping company. My package arrived earlier than expected, and it was in perfect condition. I highly recommend their services!",
    name: "- Jerry Stevenson",
  },
  {
    review:
      "I am thoroughly impressed with the level of service from this team. The entire process was seamless, tracking updates were highly accurate, and the customer support was incredibly responsive. My items arrived safely and right on schedule. I will definitely be using them for all my future shipping needs!",
    name: "- Sarah",
  },
];

export function Testimony() {

  return (
    <section className=" flex flex-col items-center pt-12 pb-20 px-8 bg-bg-white">
      <h2 className="font-bold text-3xl md:text-4xl text-black mb-8 text-center">
        Client <span className="text-primary-light">Testimonials</span>
      </h2>
      <div className="grid grid-col-1 md:grid-cols-3 gap-8">
        {testimonies.map((testimony) => (
          <div
            key={testimony.name}
            className="rounded-lg shadow-lg bg-white p-6"
          >
            <blockquote className="text-center text-gray-500 italic mb-4">
              "{testimony.review}"
            </blockquote>
            <small className=" text-center">{testimony.name}</small>
          </div>
        ))}
      </div>

      <Cta />
      
    </section>
  );
}
