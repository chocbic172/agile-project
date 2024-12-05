import { Suspense, useState } from "react";

import Desktop from "./pages/Desktop";
import Mobile from "./pages/Mobile";

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
                <button onClick={() => {choosePage(Pages.MOBILE)}}>
                    Open Mobile
                </button>
                <button onClick={() => {choosePage(Pages.DESKTOP)}}>
                    Open Desktop
                </button>
            </>
        )

    } else {
        return(
            <>
                <button
                    style={{position: 'absolute', top: 0, left: 0, zIndex: 999}}
                    onClick={returnToMenu}
                >
                    Back
                </button>

                <Suspense fallback={<p>Loading</p>}>
                {(() => {
                    switch (page) {
                        case Pages.DESKTOP: return <Desktop />
                        case Pages.MOBILE:  return <Mobile />
                        default:            <p>Error</p>
                    }
                })()}
                </Suspense>
            </>
        )
    }
}