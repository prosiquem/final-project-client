import axios from 'axios'

class AlbumServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchAlbums() {
        return (
            this.axiosApp.get('/albums')
        )
    }

    fetchLastAlbums() {
        return (
            this.axiosApp.get('/albums/last')
        )
    }
}

export default new AlbumServices()