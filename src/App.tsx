import { useCallback, useState } from "react";

import Mobile from "./pages/MobileXR";
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import PrestonMap from "./components/PrestonMap";
import { BuildingCard } from "./components/BuildingCard";

export interface Building {
    name: string;
    image_src: string | null;
    google_maps: string | null;
    facilities: {
        "wheelchair_accessible": boolean;
    };
    isAccomodation: boolean;
}

export default function App() {
    const [XROpen, setXROpen] = useState(false)

    // Code of the selected building, or an empty string if not selected
    const [selectedCode, setSelectedCode] = useState('')
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)

    const openXR = useCallback(() => {
        setXROpen(true)
    }, [setXROpen])

    const closeXR = useCallback(() => {
        setXROpen(false)
    }, [setXROpen])

    const changeSelectedBuilding = useCallback((newCode: string) => {
        setSelectedCode(newCode)
    }, [setSelectedCode])

    const changeSelectedBuildingjson = useCallback((newBuilding: Building) => {
        setSelectedBuilding(newBuilding)
    }, [setSelectedBuilding])

    if (!XROpen) {
        return (
            <>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            UCLan Map
                        </Typography>
                        <IconButton
                            size='large'
                            edge='end'
                            color='inherit'
                            sx={{ ml: 2 }}
                        >
                            <FilterAlt />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                
                <PrestonMap
                    selectedCode={selectedCode}
                    setSelectedCode={changeSelectedBuilding}
                    setSelectedBuilding={changeSelectedBuildingjson}
                />

                <Container maxWidth='sm' sx={{paddingTop: 2}}>
                    {selectedBuilding ?
                        <BuildingCard
                            selectedBuilding={selectedBuilding}
                            openXR={openXR}
                        /> :
                        <>
                            <Typography variant={'h5'} textAlign={'center'}>
                                No Building Selected
                            </Typography>
                            <Typography variant={'body1'} textAlign={'center'}>
                                Please select a building by clicking on the map above.
                            </Typography>
                        </>
                    }
                </Container>
            </>
        )
    } else {
        return <Mobile returnToMenu={closeXR} />
    }
}