// import { Post } from "src/posts/entities/post.entity";

//   const  preparePostToResponse = async (post: Post, userId: string) => {
//     const isLiked = await this.likesService.findOneByPostUser(post.id, userId);
//     const totalLikes = await getTotalLikes(post);
//     const totalComments = await this.getTotalComments(post);

//     return { ...post, isLiked: !!isLiked, totalLikes, totalComments };
//   }
