import axios from 'axios'

class FilterServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchPlaylists() {
        return (
            this.axiosApp.get('/playlists')
        )
    }

    fetchAlbums() {
        return (
            this.axiosApp.get('/albums')
        )
    }
}

export default new FilterServices()