import { Event } from '@/types'
import { Calendar, Clock } from 'lucide-react'
import TierBadge from './TierBadge'

interface EventCardProps {
  event: Event
  isAccessible: boolean
}

export default function EventCard({ event, isAccessible }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
      isAccessible ? 'border-gray-200 hover:border-blue-200' : 'border-gray-200 opacity-75'
    }`}>
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400'}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 right-3">
          <TierBadge tier={event.tier} />
        </div>
        {!isAccessible && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-t-xl flex items-center justify-center">
            <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Upgrade Required
            </div>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatTime(event.event_date)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {isAccessible ? (
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
          ) : (
            <button 
              disabled 
              className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              Upgrade to Access
            </button>
          )}
        </div>
      </div>
    </div>
  )
}