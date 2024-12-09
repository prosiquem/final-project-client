import { createContext, useState } from "react"

const TracksUploaderContext = createContext()

function TracksUploaderWrapper(props) {

    const [showTrackUploader, setTrackUploader] = useState(false)

    const closeTrackUploader = () => {

        setTrackUploader(false)

    }

    const openTrackUploader = () => {

        setTrackUploader(true)

    }

    return (
        <TracksUploaderContext.Provider value={{ openTrackUploader, closeTrackUploader, showTrackUploader }}>
            {props.children}
        </TracksUploaderContext.Provider>
    )

}

export { TracksUploaderContext, TracksUploaderWrapper }