import Axios from "axios";
class ArticleServices {
    server = "http://localhost:5000"
    constructor() {
        this.routes = {
            getArticle: '/api/v1/articles',
            addArticle: '/api/v1/addArticle',
            getArticleById: '/api/v1/getArticle/',
            updateArticle: '/api/v1/updateArticle/',
            deleteArticle: '/api/v1/deleteArticle/',
        }
        this.status = 200
    }

    async AddArticle(article){
        Axios.post(this.server + this.routes.addArticle, article)
            .then(response => {
                this.status = response.status;
                return response.data;

            })
            .catch(error => {
                console.error('Error adding article:', error);
                this.status = error.response ? error.response.status : 500;
            });
    }
    async GetArticles() {
        try {
            const response = await Axios.get(this.server + this.routes.getArticle);
            this.status = response.status;
            return response.data
        } catch (error) {
            console.error('Error fetching articles:', error);
            this.status = error.response ? error.response.status : 500;
            return [];
        }
    }
}

export const article = new ArticleServices();