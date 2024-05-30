import { create } from 'zustand'

const usePostStore = create(set => ({
  posts: [],
  createPost: post => set(state => ({ posts: [...state.posts, post] }))
}))

export default usePostStore