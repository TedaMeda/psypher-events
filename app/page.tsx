import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { currentUser} from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Calendar, Users, Star, Crown } from 'lucide-react'

export default async function Home() {
  const user = await currentUser()

  if (user) {
    redirect('/event')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">EventTier</h1>
            </div>
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Discover Events
            <span className="block text-blue-600">Tailored to Your Tier</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access exclusive events based on your membership level. From free community meetups to platinum VIP experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
                Start Free Account
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Tier Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Membership Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Tier */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-gray-600" />
                <h4 className="text-xl font-semibold ml-2 text-gray-900">Free</h4>
              </div>
              <p className="text-gray-600 mb-4">Access to basic community events and webinars</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Welcome webinars</li>
                <li>• Community meetups</li>
                <li>• Basic resources</li>
              </ul>
            </div>

            {/* Silver Tier */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-blue-600" />
                <h4 className="text-xl font-semibold ml-2 text-gray-900">Silver</h4>
              </div>
              <p className="text-gray-600 mb-4">Enhanced access with workshops and networking events</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• All Free tier events</li>
                <li>• Advanced workshops</li>
                <li>• Silver networking</li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center mb-4">
                <Crown className="h-8 w-8 text-yellow-600" />
                <h4 className="text-xl font-semibold ml-2 text-gray-900">Gold</h4>
              </div>
              <p className="text-gray-600 mb-4">Premium access with masterclasses and VIP sessions</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• All Silver tier events</li>
                <li>• Gold masterclasses</li>
                <li>• VIP strategy sessions</li>
              </ul>
            </div>

            {/* Platinum Tier */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
                <h4 className="text-xl font-semibold ml-2 text-gray-900">Platinum</h4>
              </div>
              <p className="text-gray-600 mb-4">Ultimate access to all exclusive events and galas</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• All Gold tier events</li>
                <li>• Platinum galas</li>
                <li>• CEO roundtables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Access Your Events?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of members discovering events tailored to their interests and tier level.
          </p>
          <SignUpButton mode="modal">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium">
              Create Your Account
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-6 w-6" />
            <span className="text-lg font-semibold">EventTier</span>
          </div>
          <p className="text-gray-400">
            © 2025 EventTier. Built for Psypher AI technical assessment.
          </p>
        </div>
      </footer>
    </div>
  )
}