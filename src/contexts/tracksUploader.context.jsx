import { createContext, useState } from "react"

const TracksUploaderContext = createContext()

function TracksUploaderWrapper(props) {

    const [showTrackUploader, setTrackUploader] = useState(false)
    const [albumId, setAlbumId] = useState()
    const [isLoadingTracks, setIsLoading] = useState()

    const closeTrackUploader = () => {

        setTrackUploader(false)

    }

    const openTrackUploader = () => {

        setTrackUploader(true)

    }

    return (
        <TracksUploaderContext.Provider value={{ openTrackUploader, closeTrackUploader, showTrackUploader, albumId, setAlbumId, isLoadingTracks, setIsLoading }}>
            {props.children}
        </TracksUploaderContext.Provider>
    )

}

export { TracksUploaderContext, TracksUploaderWrapper }