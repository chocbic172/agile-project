import { Suspense, useState } from "react";

import Desktop from "./pages/Desktop";
import Mobile from "./pages/Mobile";
import { AppBar, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import PrestonMap from "./components/PrestonMap";

enum Pages {
    DESKTOP,
    MOBILE
}

export default function App() {
    const [choosingPage, setChoosingPage] = useState(true)
    const [page, setPage] = useState(Pages.DESKTOP)

    const choosePage = (page: Pages) => {
        setPage(page)
        setChoosingPage(false)
    }

    const returnToMenu = () => {
        setChoosingPage(true)
    }

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
                <PrestonMap />
                <Container maxWidth='sm' sx={{paddingTop: 2}}>
                    <Stack spacing={2}>
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