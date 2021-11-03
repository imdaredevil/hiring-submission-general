import { PostRouter } from './router.js'

addEventListener('fetch', (e) => {
  try {
    const router = PostRouter.getRouter();
    e.respondWith(router.handle(e.request))
  } catch(error) {
    console.log(`error occured ${error.stack}`);
  }
  
})
