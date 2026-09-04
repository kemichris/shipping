import { Button } from "../common/Button";

export function CtaCard({ title, text, icon, to, btnText, style }) {
  return (
    <div className={`flex flex-col gap-6 rounded-lg p-8 ${style}`}>
      <h3 className="text-2xl text-white font-semibold">{title}</h3>
      <p className="text-gray-500 ">{text}</p>
      <div className="w-fit">
        <Button to={to} icon={icon} text={btnText} />
      </div>
      
    </div>
  );
}
