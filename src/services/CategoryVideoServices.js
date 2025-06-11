import Axios from 'axios';

class CategoryVideoServices {
    server =import.meta.env.VITE_SERVER

    constructor() {
        this.routes = {
            getCategoryVideoId: '/api/v1/categoryVideo/id',
            getCategoryVideo: '/api/v1/categoryVideo',
            assignCategoryToVideo: '/api/v1/categoryVideo',
            deleteVideo: '/api/v1/categoryVideo/:video_id/:category_id',
            getVideoFromCategory: '/api/v1/categoryVideo/videosFrom/:category_id',
            getCategoryFromVideo: '/api/v1/categoryVideo/categoryFrom/:video_id',
        };
        this.status = 200;
    }

    // Base HTTP methods
    async get(endpoint, params = {}) {
        try {
            const response = await Axios.get(this.server + endpoint, { params });
            this.status = response.status;
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await Axios.post(this.server + endpoint, data);
            this.status = response.status;
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await Axios.delete(this.server + endpoint);
            this.status = response.status;
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    handleError(error) {
        console.error('API Error:', error);
        this.status = error.response?.status || 500;
    }

    // Specific service methods
    async getCategoryVideo() {
        return await this.get(this.routes.getCategoryVideo);
    }

    async getCategoryVideoById(id) {
        const endpoint = `${this.routes.getCategoryVideoId}/${id}`;
        return this.get(endpoint);
    }

    async assignCategoryToVideo(videoId, categoryId) {
        return this.post(this.routes.assignCategoryToVideo, {
            video_id: videoId,
            category_id: categoryId
        });
    }

    async deleteVideoCategory(videoId, categoryId) {
        const endpoint = this.routes.deleteVideo
            .replace(':video_id', videoId)
            .replace(':category_id', categoryId);
        return this.delete(endpoint);
    }

    async getVideosFromCategory(categoryId) {
        const endpoint = this.routes.getVideoFromCategory
            .replace(':category_id', categoryId);
        return this.get(endpoint);
    }

    async getCategoriesFromVideo(videoId) {
        const endpoint = this.routes.getCategoryFromVideo
            .replace(':video_id', videoId);
        return this.get(endpoint);
    }
}

export const categoryVideo = new CategoryVideoServices();