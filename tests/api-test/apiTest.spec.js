const { test, expect } = require('@playwright/test');
const { default: ApiHelper } = require('../../utils/Apihelper');
const { postSchema } = require('../../schemas/postSchema');


test.describe.serial('JSONPlaceholder API CRUD Tests with Schema Validation', () => {
    let apiHelper;
    let initialPostCount;
    let createdPostId;

    test.beforeAll(async () => {
        apiHelper = new ApiHelper('https://jsonplaceholder.typicode.com');
    });

    test('Step 1: Read total number of posts and store in a variable', async ({request}) => {
        const posts = await apiHelper.getAllPosts(request);
        expect(posts.status()).toBe(200);

        const jsonResponse = await posts.json();
        initialPostCount = await jsonResponse.length;

        // Validate that each post matches the schema
        jsonResponse.forEach(post => {
            const isValid = apiHelper.validateSchema(postSchema, post);
            expect(isValid).toBe(true);
        });
        console.log(initialPostCount);
        expect(initialPostCount).toBe(100);
    });

    test('Step 2: Create a new post and store its ID', async ({request}) => {
        const newPost = { title: 'Emilokan', body: 'God go help us', userId: 2 };
        const createdPost = await apiHelper.createPost(newPost, request);
        expect(createdPost.status()).toBe(201);

        const jsonResponse = await createdPost.json();
        createdPostId = await jsonResponse.id;

        // Validate schema for created post
        const isValid = apiHelper.validateSchema(postSchema, jsonResponse);
        expect(isValid).toBe(true);
        expect(jsonResponse.title).toBe('Emilokan');
        expect(jsonResponse.body).toBe('God go help us');
    });

    test('Step 3: Get only the created post by ID', async ({request}) => {
        const post = await apiHelper.getPostById(createdPostId, request);
        const jsonResponse = await post.json()

        // Validate schema for retrieved post
        const isValid = apiHelper.validateSchema(postSchema, jsonResponse);
        // expect(isValid).toBe(true);                              - The data here appears to be mocked as the user cannot update the data, fetching the createdPostId returns an empty object.
        // expect(jsonResponse.id).toBe(createdPostId);
        // expect(jsonResponse.title).toBe('Emilokan');
    });

    test('Step 4: Replace some field in the created post with PATCH', async ({request}) => {
        const updatedPostData = { title: 'Emilokan update title' };
        const updatedPost = await apiHelper.updatePost(99, updatedPostData, request);
        const jsonResponse = await updatedPost.json();

        // Validate schema for updated post
        const isValid = apiHelper.validateSchema(postSchema, jsonResponse);
        expect(isValid).toBe(true);
        expect(jsonResponse.title).toBe('Emilokan update title');

        console.log(jsonResponse);
    });

    test('Step 5: Delete the created post by ID', async ({request}) => {
        const response = await apiHelper.deletePost(99, request);
        expect([200, 204]).toContain(response.status());

        const deletedPostResponse = await request.get(`${apiHelper.baseURL}/posts/${createdPostId}`);
        expect(deletedPostResponse.status()).toBe(404); // Post should be deleted
    });

    test('Step 6: Check the number of posts to ensure integrity', async ({request}) => {
        const posts = await apiHelper.getAllPosts(request);
        const jsonResponse = await posts.json();
        const finalPostCount = jsonResponse.length;
        
        console.log(finalPostCount);  
        expect(finalPostCount).toBe(initialPostCount);
    
        // Validate schema for each post in the list
        jsonResponse.forEach(post => {
            const isValid = apiHelper.validateSchema(postSchema, post);
            expect(isValid).toBe(true);
        });
    });
});




