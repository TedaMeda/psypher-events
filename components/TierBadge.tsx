interface TierBadgeProps {
  tier: string
  size?: 'sm' | 'md' | 'lg'
}

export default function TierBadge({ tier, size = 'sm' }: TierBadgeProps) {
  const getTierStyles = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'free':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'silver':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'platinum':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'md':
        return 'px-3 py-1.5 text-sm'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-2 py-1 text-xs'
    }
  }

  return (
    <span className={`
      inline-flex items-center rounded-full border font-medium capitalize
      ${getTierStyles(tier)}
      ${getSizeStyles(size)}
    `}>
      {tier}
    </span>
  )
}