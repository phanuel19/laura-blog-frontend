import Axios from "axios";

class ArticleServices {
    server = "http://localhost:5000";

    constructor() {
        this.routes = {
            getArticle: '/api/v1/articles',
            getArticleByID: '/api/v1/articles/:id',
            addArticle: '/api/v1/articles',
            updateArticle: '/api/v1/articles/:id',
            deleteArticle: '/api/v1/articles/:id',
        };
        this.status = 200;
    }

    // Create
    async AddArticle(article) {
        try {
            const response = await Axios.post(
                this.server + this.routes.addArticle,
                article,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            this.status = response.status;
            return response.data;
        } catch (error) {
            console.error('Error adding article:', error);
            this.status = error.response?.status || 500;
            throw error;
        }
    }

    // Read (All)
    async GetArticles() {
        try {
            const response = await Axios.get(this.server + this.routes.getArticle);
            this.status = response.status;
            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            this.status = error.response?.status || 500;
            throw error;
        }
    }

    // Read (Single)
    async GetArticleByID(id) {
        try {
            const url = this.server + this.routes.getArticleByID.replace(':id', id);
            const response = await Axios.get(url);
            this.status = response.status;
            return response.data;
        } catch (error) {
            console.error(`Error fetching article with ID ${id}:`, error);
            this.status = error.response?.status || 500;
            throw error;
        }
    }

    // Update
    async UpdateArticle(id, updatedArticle) {
        try {
            const url = this.server + this.routes.updateArticle.replace(':id', id);
            const response = await Axios.put(
                url,
                updatedArticle,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            this.status = response.status;
            return response.data;
        } catch (error) {
            console.error(`Error updating article with ID ${id}:`, error);
            this.status = error.response?.status || 500;
            throw error;
        }
    }

    // Delete
    async DeleteArticle(id) {
        try {
            const url = this.server + this.routes.deleteArticle.replace(':id', id);
            const response = await Axios.delete(url);
            this.status = response.status;
            return response.data;
        } catch (error) {
            console.error(`Error deleting article with ID ${id}:`, error);
            this.status = error.response?.status || 500;
            throw error;
        }
    }

    // Optional: Patch for partial updates

}

export const article = new ArticleServices();