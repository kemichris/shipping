import { PageHero } from "../../components/layout/PageHero"
import { WelcomeSection } from "../../components/home/WelcomeSection"
import { StatsSection } from "../../components/home/StatsSection"

export function About() {
    return (
        <>
        <title>shipping-client | About</title>
        <PageHero title='About Us' description='Learn about shipment - Your trusted global logistics partner' />
        <WelcomeSection />
        <StatsSection />
        
        </>
    )
}