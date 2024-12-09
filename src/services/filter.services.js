import axios from 'axios'

class FilterServices {
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

    fetchAll(query) {
        return this.axiosApp.get('/search', { params: { name: query } });
    }

}

export default new FilterServices()