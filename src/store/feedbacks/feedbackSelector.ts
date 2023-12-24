import { RootState } from "../store"

export const selectFeedbacks = (state: RootState) => state.feedbacks.feedbacks
export const selectStatus = (state: RootState) => state.feedbacks.status