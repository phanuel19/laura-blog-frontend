import Axios from 'axios';

class VideoArticleServices {
    baseURL = "http://localhost:5000/api/v1/videoArticle";

    constructor() {
        this.status = null;
    }

    // Méthode HTTP générique
    async _request(method, endpoint, data = null) {
        try {
            const response = await Axios({
                method,
                url: `${this.baseURL}${endpoint}`,
                data
            });
            this.status = response.status;
            return response.data;
        } catch (error) {
            this._handleError(error);
            throw error;
        }
    }

    _handleError(error) {
        console.error('VideoArticle Service Error:', error);
        this.status = error.response?.status || 500;
        return {
            error: error.message,
            status: this.status
        };
    }

    // Opérations CRUD
    async getAll() {
        return this._request('get', '/');
    }

    async getIds() {
        return this._request('get', '/id');
    }

    async getVideosByArticle(articleId) {
        return this._request('get', `/videosfrom/${articleId}`);
    }

    async getArticlesByVideo(videoId) {
        return this._request('get', `/articlesfrom/${videoId}`);
    }

    async assignArticleToVideo(videoId, articleId) {
        return this._request('post', '/', { video_id: videoId, article_id: articleId });
    }

    async removeArticleFromVideo(videoId, articleId) {
        return this._request('delete', `/${videoId}/${articleId}`);
    }
}

export const videoArticleService = new VideoArticleServices();