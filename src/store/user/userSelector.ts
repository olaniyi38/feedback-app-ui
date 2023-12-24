import { RootState } from "../store"

export const selectLikes = (state: RootState) => state.currentUser.user ? state.currentUser.user.likes : []
export const selectUser = (state: RootState) => state.currentUser.user