import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./projectsSlice";
import pileplansSlice from "./pileplansSlice";
import settingsSlice from "./settingsSlice";
import formBorelogSlice from "./formBorelogSlice";

export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    pileplans: pileplansSlice,
    settings: settingsSlice,
    formBorelogData: formBorelogSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
