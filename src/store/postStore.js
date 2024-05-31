import { create } from 'zustand'

const usePostStore = create(set => ({
  posts: [],
  createPost: post => set(state => ({ posts: [...state.posts, post] })),
  deletePost: id => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
  setPosts: posts => set({ posts }),
  addComment: (postId, comment) => set(state => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    )
  })),
  addLike: (postId, userId) => set(state => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likes: [...post.likes, userId]
          }
        : post
    )
  })),
  removeLike: (postId, userId) => set(state => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likes: post.likes.filter(id => id !== userId)
          }
        : post
    )
  }))
}))

export default usePostStore
