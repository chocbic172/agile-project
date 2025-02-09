import { Suspense, useCallback, useState } from "react";

import Desktop from "./pages/Desktop";
import Mobile from "./pages/Mobile";
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import PrestonMap from "./components/PrestonMap";

enum Pages {
    DESKTOP,
    MOBILE

}

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
    const [choosingPage, setChoosingPage] = useState(true)
    const [page, setPage] = useState(Pages.DESKTOP)

    // Code of the selected building, or an empty string if not selected
    const [selectedCode, setSelectedCode] = useState('')
    const [selectedBuilding, setSelectedBuilding] = useState<Building>({
        google_maps: "",
        image_src: "",
        isAccomodation: false,
        name: "",
        facilities: {wheelchair_accessible: false,}})

    const choosePage = useCallback((page: Pages) => {
        setPage(page)
        setChoosingPage(false)
    }, [setPage, setChoosingPage])

    const returnToMenu = useCallback(() => {
        setChoosingPage(true)
    }, [setChoosingPage])

    const changeSelectedBuilding = useCallback((newCode: string) => {
        setSelectedCode(newCode)
    }, [setSelectedCode])

    const changeSelectedBuildingjson = useCallback((newBuilding: Building) => {
        setSelectedBuilding(newBuilding)
    }, [setSelectedBuilding])

    // A really cursed "page router", mainly for debugging on desktop
    if (choosingPage) {
        return(
            <>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            App Name
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
                <PrestonMap selectedCode={selectedCode} setSelectedCode={changeSelectedBuilding} selectedBuilding={selectedBuilding} setSelectedBuilding={changeSelectedBuildingjson}/>
                <Container maxWidth='sm' sx={{paddingTop: 2}}>
                    <Stack spacing={2}>
                        <span>
                          {/* TODO:  add the pop up for the building here. make a componant then populate that with the
                          building data. then set to null if a close button is clicked on top of the pop up*/}
                            {selectedBuilding.name}<br/>
                            <h1>Google maps link {selectedBuilding.google_maps}</h1><br/>
                            <img id={'image'} src={selectedBuilding.image_src ? selectedBuilding.image_src : undefined} alt={'building picture'}></img>
                            {selectedBuilding.isAccomodation ? <h1>It is accomodation</h1> : <h1>It isnt accomodation</h1>}
                            {selectedBuilding.facilities.wheelchair_accessible ? <h1>It is wheelchair accessible</h1> : <h1>It isnt wheelchair accessible</h1>}

                        </span>
                        <Button onClick={() => {choosePage(Pages.MOBILE)}} variant='contained'>
                            Preview In 3D
                        </Button>
                        <Button onClick={() => {choosePage(Pages.DESKTOP)}} variant='contained'>
                            Open Desktop
                        </Button>
                    </Stack>
                </Container>
            </>
        )

    } else {
        return(
            <>
                <Suspense fallback={<p>Loading</p>}>
                {(() => {
                    switch (page) {
                        case Pages.DESKTOP: return <Desktop returnToMenu={returnToMenu} />
                        case Pages.MOBILE:  return <Mobile returnToMenu={returnToMenu} />
                        default: <p>Error</p>
                    }
                })()}
                </Suspense>
            </>
        )
    }
}