import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormBorelogDataType } from "../types";
// Define a type for the slice state
type dataType = {
  pileId: string;
  formData: FormBorelogDataType;
};
export interface FormBorelogDataState {
  data: Array<dataType>;
  error: string;
  loading: string;
}

// Define the initial state using that type
const initialState: FormBorelogDataState = {
  data: [],
  error: "",
  loading: "idle",
};
const formBorelogSlice = createSlice({
  name: "formBorelog",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<FormBorelogDataType>) {
      // Find the index of the pile in the state array based on pileId
      const pileIndex = state.data.findIndex(
        (pile) => pile.pileId === action.payload.pileNo
      );

      // Check if the pile with the given pileId is already in the state
      if (pileIndex !== -1) {
        // If the pile is found, update its formData by merging existing data with the new payload
        state.data[pileIndex].formData = {
          ...state.data[pileIndex].formData,
          ...action.payload,
        };
      } else {
        // If the pile is not found, add a new pile to the state array
        state.data.push({
          pileId: action.payload.pileNo ?? "", // Use action payload's pileNo or an empty string
          formData: { ...action.payload }, // Copy the entire payload to formData
        });
      }
    },
  },
});

export const { setState } = formBorelogSlice.actions;

export default formBorelogSlice.reducer;
