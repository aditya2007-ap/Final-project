import React from 'react'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import TrustedSection from './TrustedSection'
import TrendingSection from './TrendingSection'
import CounterSection from './CounterSection'
import TestimonialSection from './TestimonialSection'
import ContactUs from './ContactUs'
import CertificateSection from './CertificateSection'
import PartnerSection from './PartnerSection'
import ArticleSection from './ArticleSection'
import TalentSection from './TalentSection'
import Pricing from './Pricing'
const Home = () => {
  return (<>
    <HeroSection />
    <CategorySection/>
    <TrustedSection/>
    <TrendingSection/>
    <CounterSection/>
    <TestimonialSection/>
    <ContactUs/>
    <TalentSection/>
    <Pricing/>
    <CertificateSection/>
    <PartnerSection/>
    <ArticleSection/>
  </>)
}

export default Home