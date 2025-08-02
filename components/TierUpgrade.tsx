'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Crown, ArrowUp, Loader2 } from 'lucide-react'
import TierBadge from './TierBadge'


interface TierUpgradeProps {
  currentTier: string
}

export default function TierUpgrade({ currentTier }: TierUpgradeProps) {
  const { user } = useUser()
  const [upgrading, setUpgrading] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const tiers = ['free', 'silver', 'gold', 'platinum']
  const currentTierIndex = tiers.indexOf(currentTier)
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null

  const handleUpgrade = async (targetTier: string) => {
    if (!user) return

    try {
      setUpgrading(true)

      await fetch('/upgrade-tier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          targetTier: targetTier.toLowerCase()
        })
      })

      window.location.reload()
    } catch (error) {
      console.error('Error upgrading tier:', error)
      alert('Failed to upgrade tier. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  if (currentTier === 'platinum') {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center space-x-2">
          <Crown className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">
            Platinum Member
          </h3>
          <TierBadge tier="platinum" size="md" />
        </div>
        <p className="text-center text-purple-700 mt-2">
          You have access to all events! Enjoy your premium membership benefits.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Current Tier:</span>
            <TierBadge tier={currentTier} size="md" />
          </div>
        </div>

        <button
          onClick={() => setShowUpgrade(!showUpgrade)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ArrowUp className="h-4 w-4" />
          <span>Upgrade Tier</span>
        </button>
      </div>

      {showUpgrade && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Simulate Tier Upgrade (Demo Only)
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tiers.map((tier) => {
              const isCurrentTier = tier === currentTier
              const isAvailable = tiers.indexOf(tier) > currentTierIndex

              return (
                <button
                  key={tier}
                  onClick={() => isAvailable && handleUpgrade(tier)}
                  disabled={!isAvailable || upgrading || isCurrentTier}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-all duration-200
                    ${isCurrentTier
                      ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                      : isAvailable
                        ? 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
                        : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <TierBadge tier={tier} size="sm" />
                    {isCurrentTier && (
                      <span className="text-xs text-gray-500">Current</span>
                    )}
                    {upgrading && isAvailable && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This is a demo feature. In a real application, tier upgrades would be handled through a payment system and proper backend validation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}