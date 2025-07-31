import {
  CTASection,
  FeaturesSection,
  HeroSection,
  LandingFooter,
  LandingHeader,
  TargetAudienceSection,
} from './sections'

export const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <LandingHeader />
      <HeroSection />
      <TargetAudienceSection />
      <FeaturesSection />
      <CTASection />
      <LandingFooter />
    </div>
  )
}
