import { useEffect, useRef } from 'react'

// Animated network topology: nodes drift slowly, nearby nodes link up,
// and small "packets" travel along the links. Reacts to the mouse.
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    type Packet = { a: number; b: number; t: number; speed: number }
    let nodes: Node[] = []
    let packets: Packet[] = []

    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4cc9f0'

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, Math.max(28, (w * h) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1.2,
      }))
      packets = []
    }

    const LINK = 140
    const draw = () => {
      const c = color()
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy }
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 120 && d > 0) { n.x += (dx / d) * 0.6; n.y += (dy / d) * 0.6 }
      }
      const links: [number, number][] = []
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            links.push([i, j])
            ctx.globalAlpha = (1 - d / LINK) * 0.35
            ctx.strokeStyle = c
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      if (!reduce && links.length && packets.length < 14 && Math.random() < 0.08) {
        const [a, b] = links[Math.floor(Math.random() * links.length)]
        packets.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.012 })
      }
      packets = packets.filter((p) => {
        p.t += p.speed
        const a = nodes[p.a], b = nodes[p.b]
        if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK) return false
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
        ctx.globalAlpha = 0.9
        ctx.fillStyle = c
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill()
        return true
      })
      for (const n of nodes) {
        ctx.globalAlpha = 0.75
        ctx.fillStyle = c
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    resize(); draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />
}
