import axios from 'axios'

class PlaylistServices{
    constructor(){

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
        })

    }

    fetchOnePlaylist (id) {
        return(
            this.axiosApp.get(`/playlists/${id}`)
        )
    }
}

export default new PlaylistServices()