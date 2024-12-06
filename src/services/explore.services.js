import axios from 'axios'

class ExploreServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchExplore() {
        return (
            this.axiosApp.get('/explore')
        )
    }

}

export default new ExploreServices()