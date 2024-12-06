import axios from 'axios'

class PlaylistServices {
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

    fetchPlaylists() {
        return (
            this.axiosApp.get('/playlists')
        )
    }

    fetchOnePlaylist(id) {
        return (
            this.axiosApp.get(`/playlists/${id}`)
        )
    }

    fetchLastPlaylists() {
        return (
            this.axiosApp.get('/playlists/last')
        )
    }

    postPlaylist(playlistData) {
        return (
            this.axiosApp.post('/playlists', playlistData)
        )
    }

    deletePlaylist(id) {
        return (
            this.axiosApp.delete(`/playlists/${id}`)
        )
    }

    editPlaylist(id, playlistData) {
        return (
            this.axiosApp.put(`/playlists/${id}`, playlistData)
        )
    }
}

export default new PlaylistServices()