import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Button } from "@mui/material";
import Box from "../components/3d/Box";

type DesktopProps = {
    returnToMenu: () => void,
}

export default function Desktop({ returnToMenu }: DesktopProps) {
    const [wireframe, setWireframe] = useState(false)

    return(
        <>
            <Button
                    style={{position: 'absolute', top: 0, left: 0, zIndex: 999}}
                    onClick={returnToMenu}
                >
                    Back
            </Button>
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