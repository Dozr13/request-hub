import { Card, CardContent } from '@/components/ui'
import { Icon } from '@/components/ui'
import { FEATURES } from '@/lib/constants/features'

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built Exclusively for HTV Portfolio Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consolidate Skool, Slack, Calendly, Typeform, and finance tools into
            one powerful platform. Scale from 1 to 1,000+ portfolio companies
            seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Icon
                    name={feature.icon}
                    className={`h-6 w-6 ${feature.color}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
