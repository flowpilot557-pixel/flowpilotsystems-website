import { useRef } from 'react'

export default function TiltCard({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    node.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`
    node.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    node.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  const handleMouseLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
