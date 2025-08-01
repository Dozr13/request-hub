import { Button } from '@/components/ui'
import { Icon } from '@/components/ui'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          The <span className="text-blue-600">Request Hub App</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          The exclusive platform for Request Hub portfolio companies.
          Centralized support, community, and resources to accelerate your
          growth.
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          Replace fragmented tools with one seamless ecosystem for founders,
          teams, and Request Hub advisors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="group">
              Get Started
              <Icon
                name="ArrowRight"
                className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
