import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const fetchFeedbacks = createAsyncThunk("feedbacks/fetchFeedbacks", async () => {
    const res = await fetch("https://go-feedback-api.onrender.com/feedbacks", {
        credentials: "include"
    });
    if (res.status === 401) {
        throw new Error("you are " + res.statusText.toLowerCase() + " to access feedbacks")
    }

    const data = await res.json();
    return data
})


const likeFeedback = createAsyncThunk("feedbacks/like-feedback", async ({ newFeedback, newLikes, id }) => {
    const res = await fetch("https://go-feedback-api.onrender.com/like-feedback", {
        method: "PATCH",
        body: JSON.stringify({ id, likes: { ...newLikes }, upvotes: newFeedback.upvotes }),
        credentials: "include"
    })
    if (res.status !== 200) {
        throw new Error("something went wrong")
    }
    return { newFeedback, newLikes }
})

const editFeedback = createAsyncThunk("feedbacks/edit-feebacks", async (data) => {
    const res = await fetch("https://go-feedback-api.onrender.com/edit-feedback", {
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include"
    })

    if (res.status !== 200) {
        throw new Error(res.statusText)
    }
    return data

})

const createFeedback = createAsyncThunk("feedbacks/create-feedback", async (newFeedback) => {
    const res = await fetch("https://go-feedback-api.onrender.com/create-feedback", {
        method: "POST",
        body: JSON.stringify(newFeedback),
        credentials: "include"
    })

    if (res.status !== 200) {
        throw new Error("something went wrong")
    }
    return newFeedback

})

const deleteFeedback = createAsyncThunk("feedbacks/deletefeedback", async (id) => {
    const res = await fetch(`https://go-feedback-api.onrender.com/delete-feedback/${id}`, {
        method: "DELETE",
        credentials: "include"
    })

    if (res.status !== 200) {
        throw new Error("something went wrong")
    }
    return id

})


const initialState = {
    feedbacks: [],
    status: "idle"
}

const feedbacksSlice = createSlice({
    name: "feedbacks",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
            state.status = "success"
            state.feedbacks = action.payload
        }).addCase(fetchFeedbacks.pending, (state) => {
            state.status = "pending"
        }).addCase(fetchFeedbacks.rejected, (state, action) => {
            state.status = "failed"
            toast(action.error.message, { type: "error" })
        }).addCase(editFeedback.pending, (state) => {
            state.status = "pending"
        }).addCase(createFeedback.pending, (state) => {
            state.status = "pending"
        }).addCase(createFeedback.fulfilled, (state, action) => {
            state.feedbacks.push(action.payload)
            state.status = "success"
        }).addCase(createFeedback.rejected, (state, action) => {
            state.status = "failed"
            toast(action.error.message, { type: "error" })
        }).addCase(editFeedback.fulfilled, (state, action) => {
            console.log(action.payload)
            const newFeedBack = action.payload
            const index = state.feedbacks.findIndex((f) => f.id === newFeedBack.id)
            state.feedbacks[index] = newFeedBack
            state.status = "success"
        }).addCase(editFeedback.rejected, (state, action) => {
            console.log(action.error)
            state.status = "failed"
        }).addCase(likeFeedback.fulfilled, (state, action) => {
            const { newFeedback } = action.payload
            const index = state.feedbacks.findIndex((f) => f.id === newFeedback.id)
            state.feedbacks[index] = newFeedback
        }).addCase(likeFeedback.rejected, (state, action) => {
            console.log(action.error)
            state.status = "failed"
        }).addCase(deleteFeedback.pending, (state) => {
            state.status = "pending"
        }).addCase(deleteFeedback.fulfilled, (state, action) => {
            const feedbackIndex = state.feedbacks.findIndex((fb) => fb.id === Number(action.payload))
            state.feedbacks.splice(feedbackIndex, 1)
            state.status = "success"
        }).addCase(deleteFeedback.rejected, (state) => {
            state.status = "failed"
        })
    }

})


export { fetchFeedbacks, editFeedback, likeFeedback, createFeedback, deleteFeedback }

export default feedbacksSlice.reducer

