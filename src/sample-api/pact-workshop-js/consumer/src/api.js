import axios from 'axios';
// axios.defaults.adapter = "http"
export class API {

    constructor(url) {
        if (url === undefined || url === "") {
            url = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080";
        }
        if (url.endsWith("/")) {
            url = url.substr(0, url.length - 1)
        }
        this.url = url
    }

    withPath(path) {
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    generateAuthToken() {
        return "Bearer " + new Date().toISOString()
    }

    requestConfig() {
        return {
            headers: {
                "Authorization": this.generateAuthToken()
            }
        }
    }

    async getAllProducts() {
        return axios.get(this.withPath("/products"), this.requestConfig())
            .then(r => r.data);
    }

    async getProduct(id) {
        return axios.get(this.withPath("/product/" + id), this.requestConfig())
            .then(r => r.data);
    }

    async createProduct(product) {
        return axios.post(this.withPath("/products"), product, this.requestConfig())
            .then(r => r.data);
    }

    async updateProduct(id, product) {
        return axios.put(this.withPath("/product/" + id), product, this.requestConfig())
            .then(r => r.data);
    }

    async deleteProduct(id) {
        return axios.delete(this.withPath("/product/" + id), this.requestConfig())
            .then(r => r.data);
    }
}

export default new API(process.env.REACT_APP_API_BASE_URL);
