import axios from "axios"

class UploadServices {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/upload`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
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