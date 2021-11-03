export class Post {
    static async getPost(key) {
        try {
            console.log(key);
            const postString = await POSTS_KV.get(key);
            const post = JSON.parse(postString);
            return post; 
        } catch(error) {
            console.error(`error while fetching post with key ${key} - ${error.stack}`);
            throw error;
        }
    }
    static async getAllPosts() {
        try {
            const keyValues = await POSTS_KV.list();
            const posts = await Promise.all(keyValues.keys.map(key => Post.getPost(key.name)));
            return posts;
        } catch(error) {
            console.error(`error while fetching all posts - ${error.stack}`);
            throw error;
        }
    }

    static async putPost(postData) {
        try {
            const date = new Date();
            await POSTS_KV.put(date.toISOString(),JSON.stringify({ ...postData, date: date.toISOString() }));
        } catch(error) {
            console.error(`error while inserting post with data - ${error.stack}`);
            throw error;
        }
    }
}