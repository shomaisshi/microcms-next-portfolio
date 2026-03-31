// 'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * @param {{ src: string, alt?: string, size?: number, scrollPerRotation?: number, offset?: number, mobileBreakpoint?: number }} props
 */
export default function ScrollRotateImage({
  src,
  alt = '',
  size = 80,
  scrollPerRotation = 1200,
  offset = 24,
  mobileBreakpoint = 768,
}) {
  const [rotation, setRotation] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const deg = (window.scrollY / scrollPerRotation) * 360
      setRotation(deg)
    }

    const handleResize = () => {
      setIsVisible(window.innerWidth >= mobileBreakpoint)
    }

    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollPerRotation, mobileBreakpoint])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        right: offset,
        bottom: offset,
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        zIndex: 50,
        cursor: 'pointer',
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