export function SectionHeader({blackText, blueText, description}) {
  return (
    <>
      <h2 className="font-bold text-3xl md:text-4xl text-black mb-3 text-center">
        {blackText} <span className="text-primary-light">{blueText}</span>
      </h2>
      <p className="text-center text-gray-500">{description}</p>
    </>
  );
}
