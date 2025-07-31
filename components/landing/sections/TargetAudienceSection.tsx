import { Card, CardContent } from '@/components/ui'
import { Icon } from '@/components/ui'

export const TargetAudienceSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for HTV Portfolio Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed exclusively for founders who have completed the HTV
            accelerator program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Icon name="Crown" className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Portfolio Companies
              </h3>
              <p className="text-gray-600">
                Companies that have successfully completed the HTV accelerator
                program.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Icon name="Users" className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Founders & Teams
              </h3>
              <p className="text-gray-600">
                Founders and their teams seeking comprehensive, efficient, and
                immediate support.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Icon
                  name="Shield"
                  className="h-8 w-8 text-purple-600 mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                HTV Internal Team
              </h3>
              <p className="text-gray-600">
                HTV team managing, advising, and interacting daily with
                portfolio companies.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why HTV Portfolio Companies Choose This Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Eliminates Fragmentation
                  </h4>
                  <p className="text-gray-600">
                    Replace Slack, Skool, Calendly, Typeform, and finance tools
                    with one platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Superior Support
                  </h4>
                  <p className="text-gray-600">
                    Unmatched, responsive, and proactive support surpassing all
                    existing VC standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Community-Driven
                  </h4>
                  <p className="text-gray-600">
                    Engage with peer founders, share insights, and foster
                    collaboration.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Scalable Solution
                  </h4>
                  <p className="text-gray-600">
                    Built to handle hundreds of thousands of interactions and
                    data points.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Real-time Updates
                  </h4>
                  <p className="text-gray-600">
                    Instant notifications and live updates across all
                    interactions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Enterprise Security
                  </h4>
                  <p className="text-gray-600">
                    Bank-level security with role-based access control and
                    compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
