export type TierType = 'free' | 'silver' | 'gold' | 'platinum'

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string | null
  tier: TierType
  created_at?: string
}

export interface Database {
  public: {
    Tables: {
      events: {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at'>
        Update: Partial<Omit<Event, 'id' | 'created_at'>>
      }
    }
  }
}

export interface UserMetadata {
  tier: TierType
}