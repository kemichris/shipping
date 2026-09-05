
import pageHeroImg from '../../assets/pageHero.jpg'

export function PageHero({ title, description }) {
  return (
    <div
      className='relative bg-cover bg-center flex flex-col items-center justify-center w-full h-[50vh] mt-10'
      style={{ backgroundImage: `url(${pageHeroImg})` }}
    >

      <div className='absolute inset-0 bg-black/60'></div>

      
      <div className='relative z-10 flex flex-col items-center gap-4'>
        <h1 className='text-center text-4xl md:text-5xl font-bold text-white'>
          {title}
        </h1>
        <div className='w-20 h-1 bg-primary-light rounded-full'></div>

        <p className='text-white text-base md:text-lg text-center'>
          {description}
        </p>
      </div>
    </div>
  );
}