import { Button } from "react-bootstrap"
import { PlusCircleFill, Trash2Fill } from "react-bootstrap-icons"

const TrackElement = ({ _id, idx, album, author, title, time, isCreateElm, addToPlaylist, deleteFromPlaylist, user, playlistOwner }) => {

    return (
        <tr>
            {!isCreateElm && <td>{idx + 1}</td>}
            <td>{title}</td>
            <td>{author?.artistName ? `${author.artistName}` : 'Desconocido'}</td>
            {!isCreateElm &&
                <td>{album.title}</td>}
            {/* {!isCreateElm && <td>{time}</td>*/}
            {!isCreateElm && playlistOwner._id === user._id && <td>
                <Button variant="custom-transparent" onClick={() => deleteFromPlaylist(_id)}>
                    <Trash2Fill />
                </Button>
            </td>}
            {isCreateElm && <td>
                <Button variant="custom-transparent" onClick={() => addToPlaylist(_id)}>
                    <PlusCircleFill />
                </Button>
            </td>}
        </tr>
    )
}

export default TrackElement
