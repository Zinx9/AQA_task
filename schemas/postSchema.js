export const postSchema = {
    type: 'object',
    properties: {
        userId: { type: 'integer' },
        id: { type: 'integer' },
        title: { type: 'string' },
        body: { type: 'string' },
    },
    required: ['userId', 'id', 'title', 'body'],
    additionalProperties: false
};
