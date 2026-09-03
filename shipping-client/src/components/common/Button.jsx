import { Link } from "react-router-dom";

export function Button({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105 font-semibold"
    >
      {icon}
      {text}
    </Link>
  );
}
