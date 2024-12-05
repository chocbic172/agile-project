import { Mesh } from 'three'

import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

type BoxProps = {
    wireframe: boolean,
    rotating: boolean,
    position: [x: number, y: number, z: number],
} 

export default function Box({ wireframe, rotating, position } : BoxProps) {
    const meshRef = useRef<Mesh>(null!)

    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((_state, delta) => {
        if (rotating) { meshRef.current.rotation.x += delta }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={active ? 1.5 : 1}
            onClick={() => {setActive(!active)}}
            onPointerOver={() => {setHovered(true)}}
            onPointerLeave={() => {setHovered(false)}}
        >
            <boxGeometry args={[1]} />
            <meshStandardMaterial color={ hovered ? 'hotpink' : '#2f7430'} wireframe={wireframe} />
        </mesh>
    )
}