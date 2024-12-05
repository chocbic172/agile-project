import { Canvas } from "@react-three/fiber";
import Box from "../components/3d/Box";
import { useState } from "react";

export default function Desktop() {
    const [wireframe, setWireframe] = useState(false)

    return(
        <>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}  />
                <Box wireframe={wireframe} rotating={true} position={[-1.2, 0, 0]} />
                <Box wireframe={wireframe} rotating={true} position={[1.2, 0, 0]} />
            </Canvas>
            <button
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    userSelect: 'none'
                }}
                onClick={() => {setWireframe(!wireframe)}}
            >
                {wireframe ? 'Disable' : 'Enable'} Wireframe View
            </button>
        </>
    )
}