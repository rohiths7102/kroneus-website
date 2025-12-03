'use client'

import { useEffect, useRef, useState } from 'react'

interface EnterpriseWebGLBackgroundProps {
    variant?: 'hero' | 'section'
    intensity?: 'low' | 'medium' | 'high'
}

export default function EnterpriseWebGLBackground({
    variant = 'hero',
    intensity = 'low'
}: EnterpriseWebGLBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isSupported, setIsSupported] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const glContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (!glContext) {
            console.warn('WebGL not supported, falling back to canvas')
            setIsSupported(false)
            return
        }

        const gl = glContext as WebGLRenderingContext

        const dpr = window.devicePixelRatio || 1
        const updateSize = () => {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            gl.viewport(0, 0, canvas.width, canvas.height)
        }
        updateSize()
        window.addEventListener('resize', updateSize)

        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `

        const fragmentShaderSource = `
            precision highp float;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform float u_intensity;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            float grid(vec2 st, float scale) {
                vec2 grid = fract(st * scale);
                float line = step(0.98, grid.x) + step(0.98, grid.y);
                return line;
            }

            vec3 particles(vec2 st, float time) {
                vec3 color = vec3(0.0);
                
                for(float i = 0.0; i < 8.0; i++) {
                    vec2 particlePos = vec2(
                        fract(i * 0.1 + time * 0.02 + noise(vec2(i))),
                        fract(i * 0.15 + time * 0.03 + noise(vec2(i * 2.0)))
                    );
                    
                    float dist = distance(st, particlePos);
                    float glow = 0.003 / dist;
                    
                    vec3 particleColor = mix(
                        vec3(0.024, 0.714, 0.827),
                        vec3(0.078, 0.725, 0.651),
                        fract(time * 0.5 + i * 0.2)
                    );
                    
                    color += particleColor * glow * u_intensity;
                }
                
                return color;
            }

            float wave(vec2 st, float time) {
                float wave1 = sin(st.x * 3.0 + time * 0.5) * 0.02;
                float wave2 = sin(st.y * 2.0 - time * 0.3) * 0.02;
                return wave1 + wave2;
            }

            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                st.x *= u_resolution.x / u_resolution.y;
                
                vec3 color = vec3(0.0);

                vec3 bgGradient = mix(
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.02, 0.02, 0.04),
                    st.y
                );
                color += bgGradient;

                float gridPattern = grid(st + wave(st, u_time), 20.0);
                color += vec3(0.024, 0.714, 0.827) * gridPattern * 0.15 * u_intensity;

                color += particles(st, u_time);

                float scanline = sin(st.y * 800.0 + u_time * 2.0) * 0.02;
                color += vec3(scanline) * 0.3;

                float vignette = smoothstep(1.2, 0.3, length(st - 0.5));
                color *= vignette;

                gl_FragColor = vec4(color, 1.0);
            }
        `

        function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
            const shader = gl.createShader(type)
            if (!shader) return null

            gl.shaderSource(shader, source)
            gl.compileShader(shader)

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }

            return shader
        }

        const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
        const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)

        if (!vertexShader || !fragmentShader) {
            console.error('Failed to compile shaders')
            return
        }

        const program = gl.createProgram()
        if (!program) return

        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program))
            return
        }

        gl.useProgram(program)

        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ])

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

        const positionLocation = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(positionLocation)
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
        const timeLocation = gl.getUniformLocation(program, 'u_time')
        const intensityLocation = gl.getUniformLocation(program, 'u_intensity')

        const intensityValues = {
            low: 0.6,
            medium: 1.0,
            high: 1.5,
        }

        let startTime = Date.now()
        let animationId: number

        const render = () => {
            const currentTime = (Date.now() - startTime) / 1000

            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
            gl.uniform1f(timeLocation, currentTime)
            gl.uniform1f(intensityLocation, intensityValues[intensity])

            gl.clearColor(0, 0, 0, 1)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

            animationId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', updateSize)
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
            gl.deleteProgram(program)
            gl.deleteShader(vertexShader)
            gl.deleteShader(fragmentShader)
            gl.deleteBuffer(buffer)
        }
    }, [intensity, variant])

    if (!isSupported) {
        return (
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: 'linear-gradient(to bottom, #000000, #05050a, #000000)',
                }}
            />
        )
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    )
}
