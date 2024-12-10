import axios from 'axios'

class UserServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    fetchUser(id) {
        return (
            this.axiosApp.get(`/users/${id}`)
        )
    }

    fetchArtists() {
        return (
            this.axiosApp.get('/artists')
        )
    }

    editUser(id, editUser) {
        return (
            this.axiosApp.put(`/users/${id}`, editUser)
        )
    }
}

export default new UserServices()