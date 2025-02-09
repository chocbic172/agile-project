import { Canvas } from "@react-three/fiber";
import { IfInSessionMode, XR, createXRStore } from '@react-three/xr'

import { Model } from "../models/Uclan_lg"
import { Button, Card, CardActions, CardContent, Paper, Typography } from "@mui/material";

type MobileProps = {
  returnToMenu: () => void,
}

const store = createXRStore()

export default function Mobile({ returnToMenu }: MobileProps) {
  return(
        <>
        <Card
          sx={{
            minWidth: '75%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9990
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Enter AR
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              To view the campus in your own room in 3d, press "Start AR" below:
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => store.enterAR()}>Start AR</Button>
            <Button size='small' onClick={returnToMenu}>Back</Button>
          </CardActions>
        </Card>
        <Canvas>
          <XR store={store}>
            <IfInSessionMode allow='immersive-ar'>
              <directionalLight color={0xffffff} intensity={0.8} position={[10, 15, 10]} />
              <Model scale={0.002} position={[0, 0.75, -0.5]} />
            </IfInSessionMode>
          </XR>
        </Canvas>
        <Paper
          sx={{
            backgroundColor: '#36363f',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </>
    )
}