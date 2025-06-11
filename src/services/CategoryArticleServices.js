import Axios from 'axios';

class CategoryArticleServices {
    server =import.meta.env.SERVER

    constructor() {
        this.routes = {
            getCategoryArticleId: '/api/v1/categoryArticle/id',
            getCategoryArticle: '/api/v1/categoryArticle',
            assignCategoryToArticle: '/api/v1/categoryArticle',
            deleteArticle: '/api/v1/categoryArticle/:article_id/:category_id',
            getArticleFromCategory: '/api/v1/categoryArticle/articlesFrom/:category_id',
            getCategoryFromArticle: '/api/v1/categoryArticle/categoryFrom/:article_id',
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
    async getCategoryArticle() {
        return await this.get(this.routes.getCategoryArticle);
    }

    async getCategoryArticleById(id) {
        const endpoint = `${this.routes.getCategoryArticleId}/${id}`;
        return this.get(endpoint);
    }

    async assignCategoryToArticle(articleId, categoryId) {
        return this.post(this.routes.assignCategoryToArticle, {
            article_id: articleId,
            category_id: categoryId
        });
    }

    async deleteArticleCategory(articleId, categoryId) {
        const endpoint = this.routes.deleteArticle
            .replace(':article_id', articleId)
            .replace(':category_id', categoryId);
        return this.delete(endpoint);
    }

    async getArticlesFromCategory(categoryId) {
        const endpoint = this.routes.getArticleFromCategory
            .replace(':category_id', categoryId);
        return this.get(endpoint);
    }

    async getCategoriesFromArticle(articleId) {
        const endpoint = this.routes.getCategoryFromArticle
            .replace(':article_id', articleId);
        return this.get(endpoint);
    }
}

export const categoryArticle = new CategoryArticleServices();