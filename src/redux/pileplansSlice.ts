import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PilePlanType } from "../types";
// Define a type for the slice state
export interface PilePlansState {
  data: PilePlanType[];
  error: string;
  loading: string;
  filter: {
    pileId: string;
    pile_location: string;
    pile_status: string;
    pile_diameter: string;
    pile_raked: string;
  };
}

// Define the initial state using that type
const initialState: PilePlansState = {
  data: [
    {
      projectId: "1",
      pileId: "MP1A",
      pile_location: "MPLocation/MP1A.png",
      pile_status: "Completed",
      pile_diameter: "250mm",
      pile_raked: "Vertical",
    },
    {
      projectId: "1",
      pileId: "MP1B",
      pile_location: "MPLocation/MP1B.png",
      pile_status: "Not started",
      pile_diameter: "250mm",
      pile_raked: "Vertical",
    },
  ],
  error: "",
  loading: "idle",
  filter: {
    pileId: "",
    pile_location: "",
    pile_status: "",
    pile_diameter: "",
    pile_raked: "",
  },
};
// Math.random().toString(36).slice(-8)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const alphabetArray: Array<string> = [];
for (let i = 97; i <= 122; i++) {
  alphabetArray.push(String.fromCharCode(i).toUpperCase());
}
let index = 1;
export const pileplansSlice = createSlice({
  name: "pileplans",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    editPilePlantFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    // Math.random().toString(36).slice(-8)
    addPilePlant(state, action: PayloadAction<PilePlanType>) {
      index++;
      state.data.push({
        ...action.payload,
        pileId: `MP${action.payload.projectId}${alphabetArray[index]}`,
      });
    },
    addPilePlantExcel(state, action: PayloadAction<PilePlanType[]>) {
      state.data = [
        ...state.data,
        ...action.payload.map((pile) => {
          index++;
          return {
            ...pile,
            pileId: `MP${pile.projectId}${alphabetArray[index]}`,
          };
        }),
      ];
    },
  },
});

export const { editPilePlantFilter, addPilePlant, addPilePlantExcel } =
  pileplansSlice.actions;

export default pileplansSlice.reducer;
