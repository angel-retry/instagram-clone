import { create } from 'zustand'

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: userProfile => set({ userProfile }),
  addPost: (post) => set(state => ({
    userProfile: {
      ...state.userProfile,
      posts: [...state.userProfile.posts, post.id]
    }
  })),
  removePost: (postId) => set(state => ({
    userProfile: {
      ...state.userProfile,
      posts: state.userProfile.posts.filter(id => id !== postId)
    }
  }))
}))

export default useUserProfileStore
