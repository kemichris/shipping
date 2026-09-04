import aimImg1 from '../../assets/aimImg1.png'
export function AimSection() {
    return (
        <section className='bg-linear-to-r from-primary-dark to-primary-light py-12 px-8 grid md:grid-cols-2 gap-8'>
            <img src={aimImg1} alt="" className='w-[50%] h-auto animate-bounce-slightly' />
            <div>

            </div>
        </section>
    )
}