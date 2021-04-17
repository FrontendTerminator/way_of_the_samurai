import React from "react"
import {Preloader} from "../components/Common/Preloader/Preloader";

export const WithSuspense = (Component: any) => {
    return (props: any) => <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </React.Suspense>
}