import Joi from 'joi';

export class PostValidator {
    static validatePost(postData) {
        const postSchema = Joi.object({
            title: Joi.string().max(30).required(),
            content: Joi.string().required(),
            username: Joi.string().pattern(new RegExp('^[^-\s]*$')).required(),
        });
        return postSchema.validate(postData);
    }
}