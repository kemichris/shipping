import { AimSection } from "../../components/home/AimSection";
import { FeaturedServices } from "../../components/home/FeaturedServices";
import { Hero } from "../../components/home/Hero";
import { ServiceSection } from "../../components/home/ServiceSection";
import { WelcomeSection } from "../../components/home/WelcomeSection";



export function Home() {
    return (
        <>
        <title>shipping-client | Home</title>
        <Hero />
        <FeaturedServices />
        <WelcomeSection />
        <AimSection />
        <ServiceSection />
        </>
    )
}