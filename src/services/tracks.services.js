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

    searchSongs(query) {

        console.log(query)
        return (
            this.axiosApp.get(`/tracks/search?${query}`)
        )

    }
}

export default new TracksServices()