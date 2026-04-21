import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-4 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full flex items-center justify-center text-gray-500 z-40 active:scale-90 transition-transform"
      aria-label="맨 위로"
    >
      ↑
    </button>
  )
}
