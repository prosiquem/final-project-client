import { createContext, useContext, useState, useEffect } from "react"
import UserServices from "../services/user.services"
import { AuthContext } from "./auth.context"

const MusicPlayerContext = createContext()

export const MusicPlayerProvider = (props) => {

    const [currentTrack, setCurrentTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio, setAudio] = useState(null)
    const [playlist, setPlaylist] = useState([])
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playedTracks, setPlayedTracks] = useState([])

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        if (audio) {
            const onLoadedMetadata = () => {
                setDuration(audio.duration)
            }

            const onTrackEnd = () => {
                nextTrack()
            }

            const updateTime = () => {
                setCurrentTime(audio.currentTime)
            }

            audio.addEventListener("loadedmetadata", onLoadedMetadata)
            audio.addEventListener("ended", onTrackEnd)
            audio.addEventListener("timeupdate", updateTime)

            return () => {
                audio.removeEventListener("loadedmetadata", onLoadedMetadata)
                audio.removeEventListener("ended", onTrackEnd)
                audio.removeEventListener("timeupdate", updateTime)
            }
        }
    }, [audio])

    useEffect(() => {
        if (!loggedUser && audio) {
            audio.pause()
            setIsPlaying(false)
            setCurrentTrack(null)
        }
    }, [loggedUser, audio])

    const playTrack = (track) => {
        if (audio) {
            audio.pause()
        }
        const newAudio = new Audio(track.file)
        setAudio(newAudio)
        setCurrentTrack(track)
        setIsPlaying(true)
        newAudio.play()

        if (loggedUser && !playedTracks.includes(track.id)) {
            UserServices.countTracks(loggedUser._id)
        }
    }

    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const nextTrack = () => {
        const currentIndex = playlist.findIndex(track => track.file === currentTrack.file)

        if (currentIndex === playlist.length - 1) {

            if (audio) {
                audio.pause()
                setIsPlaying(false)
                audio.currentTime = audio.duration
            }
            return
        }

        const nextIndex = (currentIndex + 1) % playlist.length
        const nextTrack = playlist[nextIndex]

        if (nextTrack) {
            playTrack({
                file: nextTrack.file,
                title: nextTrack.title,
                artistName: nextTrack.author.artistName,
                cover: nextTrack.album.cover
            })

            if (loggedUser) {
                UserServices.countTracks(loggedUser._id)
            }
        }
    }

    const prevTrack = () => {

        const currentIndex = playlist.findIndex(track => track.file === currentTrack.file)

        if (currentIndex === 0) {
            const repeatFirstTrack = playlist[0]
            playTrack({
                file: repeatFirstTrack.file,
                title: repeatFirstTrack.title,
                artistName: repeatFirstTrack.author.artistName,
                cover: repeatFirstTrack.album.cover
            })

            if (loggedUser) {
                UserServices.countTracks(loggedUser._id)
            }

            return
        }

        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
        const prevTrack = playlist[prevIndex]

        if (prevTrack) {
            playTrack({
                file: prevTrack.file,
                title: prevTrack.title,
                artistName: prevTrack.author.artistName,
                cover: prevTrack.album.cover
            })

            if (loggedUser) {
                UserServices.countTracks(loggedUser._id)
            }
        }
    }


    const seek = (time) => {
        if (audio) {
            audio.currentTime = time
        }
    }

    return (
        <MusicPlayerContext.Provider value={{
            currentTrack,
            isPlaying,
            playTrack,
            togglePlayPause,
            nextTrack, prevTrack,
            currentTime,
            duration,
            seek,
            setPlaylist
        }}>
            {props.children}
        </MusicPlayerContext.Provider>
    )
}

export const useMusicPlayer = () => useContext(MusicPlayerContext)
