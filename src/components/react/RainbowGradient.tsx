import type { FC } from 'react'
import { cn } from '../../lib/cn'

export const RainbowGradient: FC<{ id: string }> = ({ id }) => {
  return (
    <linearGradient
      id={id}
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
      gradientTransform="rotate(45, 0.5, 0.5)"
    >
      <stop offset="0%" stopColor="#8B83FF" />
      <stop offset="25%" stopColor="#8B83FF" />
      <stop offset="25%" stopColor="#00C0E9" />
      <stop offset="37.5%" stopColor="#00C0E9" />
      <stop offset="37.5%" stopColor="#5FDF6C" />
      <stop offset="50%" stopColor="#5FDF6C" />
      <stop offset="50%" stopColor="#F8D71E" />
      <stop offset="62.5%" stopColor="#F8D71E" />
      <stop offset="62.5%" stopColor="#FF8E00" />
      <stop offset="75%" stopColor="#FF8E00" />
      <stop offset="75%" stopColor="#FF532E" />
      <stop offset="100%" stopColor="#FF532E" />
    </linearGradient>
  )
}

export const RainbowGradientSvg: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  return (
    <svg
      className={cn(
        'absolute top-0 left-0 size-0 pointer-events-none',
        className
      )}
    >
      <defs>
        <RainbowGradient id={id} />
      </defs>
    </svg>
  )
}
