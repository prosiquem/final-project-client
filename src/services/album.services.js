import axios from 'axios'

class AlbumServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })


        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
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

    fetchOneAlbum(id) {
        return (
            this.axiosApp.get(`/albums/${id}`)
        )
    }

    postAlbum(albumData) {
        return (
            this.axiosApp.post('/albums', albumData)
        )
    }

    editAlbum(id, albumData) {
        return (
            this.axiosApp.put(`/albums/${id}`, albumData)
        )
    }

    deleteAlbum(id) {
        return (
            this.axiosApp.delete(`/albums/${id}`)
        )
    }
}

export default new AlbumServices()