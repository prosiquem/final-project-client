const TrackElement = ({ id, idx, album, author, title, time }) => {

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{title}</td>
            <td>{author.artistName}</td>
            <td>{album.title}</td>
            <td>{time}</td>
        </tr>
    )
}

export default TrackElement