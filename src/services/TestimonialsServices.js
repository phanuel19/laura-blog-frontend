import Axios from 'axios';

class TestimonialServices {
    server = "http://localhost:5000";

    constructor() {
        this.routes = {
            getAll: '/api/v1/testimonials',
            getById: '/api/v1/testimonials/:id',
            addTestimonial: '/api/v1/testimonials',
            deleteTestimonial: '/api/v1/testimonials/:id',
            addLike: '/api/v1/testimonials/:id/like',
            removeLike: '/api/v1/testimonials/:id/like',
        };
        this.status = 200;
    }

    // Méthodes HTTP de base
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

    async put(endpoint, data = {}) {
        try {
            const response = await Axios.put(this.server + endpoint, data);
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
        console.error('Erreur API:', error);
        this.status = error.response?.status || 500;
    }

    // Méthodes spécifiques aux témoignages
    async getAllTestimonials() {
        return this.get(this.routes.getAll);
    }

    async getTestimonialById(id) {
        const endpoint = this.routes.getById.replace(':id', id);
        return this.get(endpoint);
    }

    async addTestimonial(testimonialData) {
        return this.post(this.routes.addTestimonial, testimonialData);
    }

    async deleteTestimonial(id) {
        const endpoint = this.routes.deleteTestimonial.replace(':id', id);
        return this.delete(endpoint);
    }

    async addLikeToTestimonial(id) {
        const endpoint = this.routes.addLike.replace(':id', id);
        return this.put(endpoint);
    }

    async removeLikeFromTestimonial(id) {
        const endpoint = this.routes.removeLike.replace(':id', id);
        return this.delete(endpoint);
    }
}

export const testimonialService = new TestimonialServices();