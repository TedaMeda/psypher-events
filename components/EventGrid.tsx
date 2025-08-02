'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import EventCard from './EventCard'
import { Event } from '@/types'
import { Loader2, AlertCircle } from 'lucide-react'

interface EventGridProps {
  userTier: string
}

const tierHierarchy = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3
}

export default function EventGrid({ userTier }: EventGridProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [userTier])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) throw error

      // Filter events based on user tier
      const userTierLevel = tierHierarchy[userTier as keyof typeof tierHierarchy] || 0
      const filteredEvents = data?.filter(event => {
        const eventTierLevel = tierHierarchy[event.tier as keyof typeof tierHierarchy]
        return eventTierLevel <= userTierLevel
      }) || []

      setEvents(filteredEvents)
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Events</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={fetchEvents}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Available</h3>
          <p className="text-gray-600">
            There are currently no events available for your tier level.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Available Events */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Available Events ({events.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAccessible={true}
            />
          ))}
        </div>
      </div>

      {/* Show upgrade message if not platinum */}
      {userTier !== 'platinum' && (
        <UpgradeMessage userTier={userTier} />
      )}
    </div>
  )
}

function UpgradeMessage({ userTier }: { userTier: string }) {
  const getNextTier = (currentTier: string) => {
    const tiers = ['free', 'silver', 'gold', 'platinum']
    const currentIndex = tiers.indexOf(currentTier)
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
  }

  const nextTier = getNextTier(userTier)

  if (!nextTier) return null

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
      <h4 className="text-lg font-medium text-gray-900 mb-2">
        Want Access to More Events?
      </h4>
      <p className="text-gray-600 mb-4">
        Upgrade to <span className="font-medium capitalize text-blue-600">{nextTier}</span> to unlock additional exclusive events and experiences.
      </p>
      <div className="text-sm text-gray-500">
        Higher tier members get access to premium workshops, VIP networking events, and exclusive galas.
      </div>
    </div>
  )
}