import axios from 'axios'

class UserServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchArtists() {
        return (
            this.axiosApp.get('/artists')
        )
    }
}

export default new UserServices()