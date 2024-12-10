import { Col, Row, Form, FloatingLabel, Badge, Button } from "react-bootstrap"
import { MUSIC_GENRES } from "../../consts/music.consts"
import { Icon } from "../GeneralIconBootstrap/GeneralIconBootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { SOCIAL_MEDIA } from "../../consts/user.consts"
import { XLg } from "react-bootstrap-icons"

const ArtistDetailsDescription = ({ data, loggedUser, isEditing, socialMediaData, setSocialMediaData }) => {

    const navigate = useNavigate()
    const animatedComponents = makeAnimated()

    return (
        <Form className="ArtistDetailsDescription">

            <Row>
                <Col md={{ offset: "1" }}>
                    {isEditing ?
                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="description"
                                label="Sobre ti"
                                className={!isEditing && ""}>

                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    className="text-area"
                                    defaultValue={data.description} />
                            </FloatingLabel>
                        </Form.Group>
                        :
                        <p>{data.description}</p>
                    }

                    {isEditing ?

                        <Form.Group className="mb-3">
                            <Select
                                className="select-form"
                                classNamePrefix="select"
                                components={animatedComponents}
                                placeholder="Género musical"
                                name="musicGenres"
                                options={MUSIC_GENRES}
                                value={MUSIC_GENRES.filter(option => data.musicGenres.includes(option.value))}

                                isMulti
                            />
                        </Form.Group>
                        :
                        data.musicGenres.map(elm => {
                            return (
                                <Badge>{elm}</Badge>
                            )
                        })
                    }
                </Col>

                {isEditing ?
                    <Col md={{ span: "4", offset: "1" }}>
                        <Form.Group>
                            {data.socialMedia.map((elm, idx) => {
                                return (
                                    <Row className="gap-2" key={`musicGenre-${idx}`}>
                                        <Col md="4" className="p-0">
                                            <Form.Select className="mb-3">
                                                {SOCIAL_MEDIA.map((elm, idx) => {
                                                    return (
                                                        <option key={idx} value={[elm.value, elm.icon]}>{elm.label}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Col>
                                        <Col className="p-0">
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="social-media-input"
                                                    placeholder="URL"
                                                    value={elm.url}
                                                    id={`formSocialMedia-${idx}`}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="1" className="p-0">
                                            <Button
                                                variant="custom-transparent"
                                                disabled={socialMediaData.length <= 1}
                                                size="sm">
                                                <XLg color="#a8a8a8" />
                                            </Button>
                                        </Col>
                                    </Row>
                                )
                            })
                            }
                            <Button
                                variant="custom-transparent"
                                size="sm"
                                className="mt-2">
                                Añadir red social
                            </Button>
                        </Form.Group>
                    </Col>
                    :
                    <Col md={{ span: "1", offset: "2" }}>
                        {data.socialMedia.map(elm => {
                            return (
                                <NavLink variant="custom-transparent" to={elm.url}>
                                    <Icon
                                        iconName={elm.icon}
                                        size={28} />
                                </NavLink>
                            )
                        })}

                    </Col>
                }
            </Row>



        </Form>
    )

}

export default ArtistDetailsDescription