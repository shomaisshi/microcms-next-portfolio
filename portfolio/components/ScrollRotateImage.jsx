// 'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * @param {{ src: string, alt?: string, size?: number, scrollPerRotation?: number, offset?: number }} props
 */
export default function ScrollRotateImage({
  src,
  alt = '',
  size = 80,
  scrollPerRotation = 1200,
  offset = 24,
}) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const deg = (window.scrollY / scrollPerRotation) * 360
      setRotation(deg)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPerRotation])

  return (
    <div
      style={{
        position: 'fixed',
        right: offset,
        bottom: offset,
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        zIndex: 50,
        pointerEvents: 'none', // クリック等の邪魔をしない
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  )
}
