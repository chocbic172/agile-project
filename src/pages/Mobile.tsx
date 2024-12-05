import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from '@react-three/xr'
import { useState } from "react";

import { Model } from "../models/Uclan_lg"

const store = createXRStore()

export default function Mobile() {
    const [red, setRed] = useState(false)

    return(
        <>
        <button
            onClick={() => store.enterAR()}
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                userSelect: 'none',
                zIndex: 9999
            }}>
                Enter AR
        </button>
        <Canvas>
          <XR store={store}>
            <directionalLight color={0xffffff} intensity={0.8} position={[10, 15, 10]} />
            {/* <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -0.5]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshPhysicalMaterial color={red ? 'red' : 'blue'} />
            </mesh> */}
            <Model scale={0.002} position={[0, 0.75, -0.5]} />
          </XR>
        </Canvas>
      </>
    )
}