'use client'

import { useEffect, useMemo, useState } from 'react'

const RELEASE_DATE_ISO = '2026-03-16T23:59:59Z'

function getTimeLeft(targetDate: Date) {
  const now = new Date().getTime()
  const diff = targetDate.getTime() - now

  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    done: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function MaintenanceCountdown() {
  const targetDate = useMemo(() => new Date(RELEASE_DATE_ISO), [])
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.done) {
    return (
      <p className="text-sm md:text-base text-emerald-100">
        Le lancement est imminent. Revenez dans quelques instants.
      </p>
    )
  }

  const cells = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
            {String(cell.value).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm uppercase tracking-widest text-amber-100/90 mt-1">
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  )
}
