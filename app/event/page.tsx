import { UserButton } from '@clerk/nextjs'
import { currentUser} from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Calendar } from 'lucide-react'
import EventGrid from '@/components/EventGrid'
import TierUpgrade from '@/components/TierUpgrade'

export default async function EventsPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const userTier = (user.publicMetadata?.tier as string) || 'free'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">EventTier</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user.firstName || user.emailAddresses[0].emailAddress}</span>
              </div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Events
          </h2>
          <p className="text-gray-600">
            Discover events available for your{' '}
            <span className="font-medium capitalize text-blue-600">{userTier}</span> tier membership
          </p>
        </div>

        {/* Tier Upgrade Component */}
        <TierUpgrade currentTier={userTier} />

        {/* Events Grid */}
        <EventGrid userTier={userTier} />
      </main>
    </div>
  )
}