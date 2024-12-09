import axios from "axios"

class UploadServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/upload`
        })
    }

    uploadImage(imageForm) {
        return (
            this.axiosApp.post('/image', imageForm)
        )
    }

    uploadGallery(galleryForm) {
        return (
            this.axiosApp.post('/gallery', galleryForm)
        )
    }

    uploadSongs(tracksForm) {
        return (
            this.axiosApp.post('/audio', tracksForm)
        )
    }

}

export default new UploadServices()