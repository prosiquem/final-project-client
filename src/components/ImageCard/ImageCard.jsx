import { Button, Card } from "react-bootstrap"
import { Trash2Fill } from "react-bootstrap-icons"

const ImageCard = ({ data, idx, deleteGalleryElm }) => {

    return (
        <article className="ImageCard">
            <Card className="gap-3">
                <Card.Img
                    variant="top"
                    src={data}
                />
                <Button variant="custom-secondary" onClick={() => deleteGalleryElm(idx)}>
                    <Trash2Fill />
                </Button>
            </Card>
        </article>
    )

}

export default ImageCard