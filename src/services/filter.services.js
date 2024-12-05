import axios from 'axios'

class FilterServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchAll() {
        return (
            this.axiosApp.get('/search')
        )
    }
}

export default new FilterServices()