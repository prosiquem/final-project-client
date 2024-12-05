import axios from 'axios'

class FilterServices {
    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchAll(query) {
        return this.axiosApp.get('/search', { params: { name: query } });
    }

}

export default new FilterServices()