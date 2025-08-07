import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import storiesReducer from '../features/stories/storieSlice'
import createStoryReducer from '../features/stories/createStorySlice'
import updateStoryReducer from '../features/stories/updateStorySlice'
import deleteStoryReducer from '../features/stories/deleteStoryslice'
import contributorReducer from '../features/contributors/contributorSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        createStory: createStoryReducer,
        updateStory: updateStoryReducer,
        deleteStory: deleteStoryReducer,
        contributors: contributorReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch