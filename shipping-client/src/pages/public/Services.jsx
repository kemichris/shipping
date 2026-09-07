import { PageHero } from "../../components/layout/PageHero"
import { OurServices } from "../../components/services/OurServices"
import { WhyChooseUs } from "../../components/services/WhyChooseUs"

export function Services() {
    return (
        <>
        <title>shipping-client | Services</title>
        <PageHero title='Services' description='Comprehensive logistics solutions tailored to meet your business needs' />
        <OurServices />
        <WhyChooseUs />
        
        </>
    )
}