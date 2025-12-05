'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Props {
  onClose: () => void
}

export default function SELAHyperTunnelGame({ onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [lastThreat, setLastThreat] = useState('')

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 10, 50)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0.9)
    containerRef.current.appendChild(renderer.domElement)

    let playerLane = 0
    let threats: Array<{ mesh: THREE.Mesh; lane: number; type: string; speed: number }> = []
    let animationId: number
    let isRunning = true

    const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    core.position.set(0, 0, 10)
    scene.add(core)

    const coreLight = new THREE.PointLight(0x00ffff, 2, 20)
    coreLight.position.copy(core.position)
    scene.add(coreLight)

    const rings: THREE.Mesh[] = []
    for (let i = 0; i < 20; i++) {
      const ringGeometry = new THREE.TorusGeometry(4, 0.1, 16, 100)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.z = -i * 3
      scene.add(ring)
      rings.push(ring)
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const threatTypes = [
      { name: 'Prompt Injection', color: 0xff0000 },
      { name: 'Data Exfiltration', color: 0xffff00 },
      { name: 'Model Poisoning', color: 0xff00ff },
      { name: 'Identity Attack', color: 0x0000ff }
    ]

    const spawnThreat = () => {
      if (!isRunning || gameOver) return

      const type = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const lane = Math.floor(Math.random() * 3) - 1

      const geometry = new THREE.OctahedronGeometry(0.3)
      const material = new THREE.MeshBasicMaterial({
        color: type.color,
        transparent: true,
        opacity: 0.8
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(lane * 2, 0, -20)

      scene.add(mesh)
      threats.push({
        mesh,
        lane,
        type: type.name,
        speed: 0.15 + Math.random() * 0.1
      })
    }

    const keys: { [key: string]: boolean } = {}
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true

      if (e.key === 'Escape') {
        onClose()
      }

      if ((e.key === 'a' || e.key === 'ArrowLeft') && playerLane > -1) {
        playerLane--
      }
      if ((e.key === 'd' || e.key === 'ArrowRight') && playerLane < 1) {
        playerLane++
      }

      if (e.key === ' ') {
        e.preventDefault()
        const threat = threats.find(t => t.lane === playerLane && t.mesh.position.z > -5)
        if (threat) {
          setLastThreat(`${threat.type} blocked!`)
          setScore(prev => prev + 10)
          scene.remove(threat.mesh)
          threat.mesh.geometry.dispose()
          ;(threat.mesh.material as THREE.Material).dispose()
          threats = threats.filter(t => t !== threat)
          setTimeout(() => setLastThreat(''), 1000)
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const playerGeometry = new THREE.ConeGeometry(0.3, 0.6, 3)
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff })
    const player = new THREE.Mesh(playerGeometry, playerMaterial)
    player.position.set(0, -2, 2)
    player.rotation.z = Math.PI
    scene.add(player)

    let lastSpawn = 0
    const animate = (time: number) => {
      if (!isRunning) return
      animationId = requestAnimationFrame(animate)

      if (time - lastSpawn > 2000) {
        spawnThreat()
        lastSpawn = time
      }

      rings.forEach(ring => {
        ring.position.z += 0.1
        if (ring.position.z > 5) {
          ring.position.z = -60
        }
        ring.rotation.z += 0.01
      })

      core.rotation.y += 0.02
      coreLight.intensity = 2 + Math.sin(time * 0.003) * 0.5

      threats = threats.filter(threat => {
        threat.mesh.position.z += threat.speed
        threat.mesh.rotation.x += 0.05
        threat.mesh.rotation.y += 0.05

        if (threat.mesh.position.z > 4 && threat.lane === playerLane) {
          setGameOver(true)
          setLastThreat(`${threat.type} reached SELA Core!`)
          isRunning = false
          return false
        }

        if (threat.mesh.position.z > 6) {
          setScore(prev => prev + 5)
          setLastThreat(`${threat.type} detected!`)
          setTimeout(() => setLastThreat(''), 800)
          scene.remove(threat.mesh)
          threat.mesh.geometry.dispose()
          ;(threat.mesh.material as THREE.Material).dispose()
          return false
        }

        return true
      })

      player.position.x = THREE.MathUtils.lerp(player.position.x, playerLane * 2, 0.1)

      renderer.render(scene, camera)
    }

    animationId = requestAnimationFrame(animate)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)

      threats.forEach(threat => {
        scene.remove(threat.mesh)
        threat.mesh.geometry.dispose()
        ;(threat.mesh.material as THREE.Material).dispose()
      })

      rings.forEach(ring => {
        scene.remove(ring)
        ring.geometry.dispose()
        ;(ring.material as THREE.Material).dispose()
      })

      scene.remove(core)
      core.geometry.dispose()
      coreMaterial.dispose()

      scene.remove(player)
      player.geometry.dispose()
      playerMaterial.dispose()

      renderer.dispose()
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [onClose, gameOver])

  return (
    <div className="fixed inset-0 z-[9999]">
      <div ref={containerRef} className="w-full h-full" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <div className="text-4xl font-bold text-cyan-400 mb-2">SELA DEFENSE GRID</div>
        <div className="text-lg text-slate-300">Blocking Real-Time AI Attacks</div>
      </div>

      <div className="absolute top-8 left-8 bg-slate-900/80 px-6 py-3 rounded-lg border border-cyan-500/50">
        <div className="text-sm text-slate-400">SCORE</div>
        <div className="text-3xl font-bold text-cyan-400">{score}</div>
      </div>

      <div className="absolute bottom-8 left-8 bg-slate-900/80 px-6 py-3 rounded-lg border border-cyan-500/50">
        <div className="text-xs text-slate-400 space-y-1">
          <div>← → or A/D: Move</div>
          <div>SPACE: Zero Trust Beam</div>
          <div>ESC: Exit</div>
        </div>
      </div>

      {lastThreat && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-400 animate-pulse">
          {lastThreat}
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-slate-900 rounded-2xl border-2 border-red-500/50">
            <div className="text-6xl mb-4">💥</div>
            <div className="text-3xl font-bold text-red-500 mb-4">THREAT BREACH</div>
            <div className="text-xl text-white mb-6">Final Score: {score}</div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-colors"
            >
              Return to Mission Control
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 bg-slate-900/80 hover:bg-slate-800 rounded-full border border-cyan-500/50 flex items-center justify-center text-white text-2xl transition-colors"
      >
        ×
      </button>
    </div>
  )
}
