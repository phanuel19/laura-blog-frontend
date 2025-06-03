import Axios from 'axios'

class CategoryVideoServices {
    server =  "http://localhost:5000"
    constructor() {
        this.routes = {
            getCategoryVideo: '/api/v1/categoryvideo/',
            addVideo: '/api/v1/addVideo',
            getVideoById: '/api/v1/getVideo/',
            updateVideo: '/api/v1/updateVideo/',
            deleteVideo: '/api/v1/deleteVideo/',
        }
    }
    async getCategoryVideo() {
        try {
            const response = await Axios.get(this.server + this.routes.getCategoryVideo);
            this.status = response.status;
            return response.data
        } catch (error) {
            console.error('Error fetching videos:', error);
            this.status = error.response ? error.response.status : 500;
            return [];
        }
    }
}

export const CategoryVideo = new CategoryVideoServices();