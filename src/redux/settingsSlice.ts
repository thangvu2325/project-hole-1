import { createSlice } from "@reduxjs/toolkit";
// Define a type for the slice state
export interface SettingsState {
  siderState: boolean | "idle";
}

// Define the initial state using that type
const initialState: SettingsState = {
  siderState: "idle",
};

export const SettingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleStatusSider(state) {
      if (state.siderState === "idle") {
        state.siderState = false;
      } else {
        state.siderState = !state.siderState;
      }
    },
  },
});

export const { toggleStatusSider } = SettingsSlice.actions;

export default SettingsSlice.reducer;
