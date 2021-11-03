import { Post } from "./models.js"
import { PostValidator } from "./validators.js";

export class PostController {
    static async sendErrorResponse(error, status=500, errorToSend='Internal server error') {
        console.error(error);
        return new Response(errorToSend, { status });
    }
    static async getPosts() {
        try {
            const posts = await Post.getAllPosts();
            return new Response(JSON.stringify(posts),{
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch(error) {
            return PostController.sendErrorResponse(
                `Error occured while getting posts ${error.stack}`);
        }
    }

    static async putPost(request) {
        try {
            if (request.headers.get("Content-Type") !== "application/json") {
                return PostController.sendErrorResponse(
                    'The new post data should be sent in a json',
                    400,
                    'The new post data should be sent in a json',
                );
            }
            const postData = await request.json()
            const validationResult = PostValidator.validatePost(postData)
            if(validationResult.error) {
                return PostController.sendErrorResponse(
                    `some validation error ${validationResult.error}`,
                    400,
                    validationResult.error
                );
            }
            await Post.putPost(validationResult.value);
            return new Response('success',{ status: 200 });
        } catch(error) {
            return PostController.sendErrorResponse(
                `Error occured while adding new post ${error.stack}`
            );
        }
    }
}