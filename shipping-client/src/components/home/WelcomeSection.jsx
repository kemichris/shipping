import { FaShieldAlt, FaUmbrella, FaClock } from "react-icons/fa";
import welcomeImg from '../../assets/welcomeImg.jpg'

export function WelcomeSection() {
  const welcomeDetails = [
    {
      icon: <FaShieldAlt />,
      title: "100% Safe Delivery",
      text: "We ensure the safe delivery of packages is our top priority. We take every possible measure to ensure that packages arrive at their destination safely and intact.",
    },
    {
      icon: <FaUmbrella />,
      title: "Weather Insurance",
      text: "We offer weather insurance covering losses from unforeseen weather conditions such as hurricanes, floods, heavy snow, and other severe weather events.",
    },
    {
      icon: <FaClock />,
      title: "Fast & On Time Delivery",
      text: "We utilize latest technologies and highly skilled professionals to handle shipments of all sizes and types, ensuring timely delivery to any location.",
    },
  ];

  return (
    <section className="px-8 py-20 grid  lg:grid-cols-2 gap-8">
      <div>
        <h2 className=" font-bold text-3xl md:text-4xl">
          Welcome to <span className="text-primary-light">Shipment</span>
        </h2>
        <div className="flex flex-col gap-6 mt-8">
          {welcomeDetails.map((details) => (
            <div key={details.title} className="flex items-start gap-4">
              <div className="flex justify-center items-center w-12 h-12 px-4 rounded-xl text-primary-light text-lg bg-sky-200 ">
                {details.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{details.title}</h3>
                <p className="text-text-dark">{details.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <img src={welcomeImg} alt="" className="rounded-2xl w-full h-auto" />
    </section>
  );
}
