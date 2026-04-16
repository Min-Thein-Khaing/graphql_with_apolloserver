import { createPostService, deletePostService, getOnePost, getPosts, updatePostService } from "../services/postService.js"
import { Resolvers } from "../types.js"

export const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      return await getPosts()
    },
    post: async (_, { id }, contextValue) => {
      //const token = contextValue.token
      //if(!token){
      //  throw new Error("Unauthorized")
      //}
      return await getOnePost(id)
    }
  },
  Mutation: {
    createPost: async (_, { input }) => {
      //must validation
      if(input.title.length < 3){
        return {
          code: 400,
          success: false,
          message: "Title must be at least 3 characters long",
          post: null,
        }
      }
      try {
        const response = await createPostService(input)
        if (!response) {
          return {
            code: 500,
            success: false,
            message: "Post not created",
            post: null,
          }
        }
        return {
          code: 200,
          success: true,
          message: "Post created successfully",
          post: response,
        }
      } catch (error:any) {
        return {
          code: 500,
          success: false,
          //dar ka graphql error pyan nii
          // message: error.extensions.response.body.message ||"Post not created",
          message: error.message || "Post not created",
          post: null,
        }
      }
    },
    deletePost: async (_, { id }) => {
      try {
        const postExist = await getOnePost(id)
        if (!postExist) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
          }
        }
        const response = await deletePostService(id)
        
        return {
          code: 200,
          success: true,
          message: "Post deleted successfully",
        }
      } catch (error:any) {
        return {
          code: 500,
          success: false,
          message: error.message || "Post not deleted",
        }
      }
    },
    updatePost : async(_, {id,input}) => {
      try {
        const postExist = await getOnePost(id)
        if (!postExist) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
          }
        }
        const response = await updatePostService(id, input)
        if (!response) {
          return {
            code: 500,
            success: false,
            message: "Post not updated",
            post: null,
          }
        }
        return {
          code: 200,
          success: true,
          message: "Post updated successfully",
          post: response,
        }
      } catch (error:any) {
        return {
          code: 500,
          success: false,
          message: error.message || "Post not updated",
        }
      }
    }
  }
}