import { Button } from "react-bootstrap"
import { PencilFill, PlusCircleFill, Trash2Fill } from "react-bootstrap-icons"

const TrackElement = ({
    _id,
    idx,
    album,
    author,
    title,
    time,
    file,
    isCreateElm,
    addToPlaylist,
    deleteFromPlaylist,
    user,
    playlistOwner,
    playTrack,
    albumOwner,
    type,
    deleteTrack,
    setEditTrackModal,
    setTrackId
}) => {

    const handleTrackClick = () => {
        const trackData = {
            file,
            title,
            artistName: author.artistName,
            cover: album.cover,
        }
        playTrack(trackData)
    }

    return (
        <tr onClick={handleTrackClick} style={{ cursor: 'pointer' }}>
            {!isCreateElm && <td>{idx + 1}</td>}
            <td>{title}</td>
            {type != 'album' && <td>{author?.artistName ? `${author.artistName}` : 'Desconocido'}</td>}
            {/* {!isCreateElm && <td>{time}</td>*/}

            {type != 'album' && !isCreateElm && playlistOwner._id === user._id && <td>
                <Button variant="custom-transparent" onClick={() => deleteFromPlaylist(_id)}>
                    <Trash2Fill />
                </Button>
            </td>}
            {type != 'album' && isCreateElm && <td>
                <Button variant="custom-transparent" onClick={() => addToPlaylist(_id)}>
                    <PlusCircleFill />
                </Button>
            </td>}

            {type === 'album' && albumOwner._id === user._id && <td>
                <Button variant="custom-transparent" onClick={() => deleteTrack(_id)}>
                    <Trash2Fill />
                </Button>
            </td>}
            {type === 'album' && albumOwner._id === user._id && <td>
                <Button
                    variant="custom-transparent"
                    onClick={() => {
                        setEditTrackModal(true)
                        setTrackId(_id)
                    }}>
                    <PencilFill />
                </Button>
            </td>}
        </tr>
    )
}

export default TrackElement