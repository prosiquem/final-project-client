import axios from 'axios'

class TracksServices {

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

    getTrack(id) {

        return (
            this.axiosApp.get(`/tracks/${id}`)
        )

    }

    searchSongs(query) {

        return (
            this.axiosApp.get(`/tracks/search`, { params: query })
        )

    }

    postTrack(trackData) {

        return (
            this.axiosApp.post('/track', trackData)
        )
    }

    postTracks(tracksData) {

        return (
            this.axiosApp.post('/tracks', tracksData)
        )
    }

    editTrack(id, trackData) {

        return (
            this.axiosApp.put(`/tracks/${id}`, trackData)
        )
    }

    deleteTrack(id) {
        return (
            this.axiosApp.delete(`/tracks/${id}`)
        )
    }
}

export default new TracksServices()