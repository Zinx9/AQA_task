const { request } = require('@playwright/test');
const Ajv = require('ajv');
const ajv = new Ajv();


class ApiHelper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllPosts(request) {
        const response = await request.get(`${this.baseURL}/posts`);
        return response;
    }

    async createPost(postData, request) {
        const response = await request.post(`${this.baseURL}/posts`, {
            data: postData
        });
        return response;
    }

    async getPostById(id, request) {
        const response = await request.get(`${this.baseURL}/posts/${id}`);
        return response;
    }

    async updatePost(id, updateData, request) {
        const response = await request.patch(`${this.baseURL}/posts/${id}`, {
            data: updateData
        });
        return response;
    }

    async deletePost(id, request) {
        return await request.delete(`${this.baseURL}/posts/${id}`);
    }

    validateSchema(schema, data) {
        const validate = ajv.compile(schema);
        const isValid = validate(data);
        if (!isValid) {
            console.log('Schema validation errors:', validate.errors);
        }
        return isValid;
    }
}

export default ApiHelper;

