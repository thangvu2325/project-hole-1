import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "../types";
// Define a type for the slice state
export interface ProjectsState {
  data: ProjectType[];
  error: string;
  loading: string;
  filter: {
    projectId: string;
    project_name: string;
    project_status: string;
  };
}

// Define the initial state using that type
const initialState: ProjectsState = {
  data: [
    {
      projectId: "1",
      project_name: "Shin Hi Tower",
      project_status: "Process",
      project_date: "23/12/2023",
    },
    {
      projectId: "2",
      project_name: "Hong Kong Building",
      project_status: "Done",
      project_date: "23/12/2023",
    },
  ],
  filter: {
    projectId: "",
    project_name: "",
    project_status: "Process",
  },
  error: "",
  loading: "idle",
};
let id = 3;
export const projectsSlice = createSlice({
  name: "projects",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    editFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    addProject(state, action: PayloadAction<ProjectType>) {
      state.data.push({ ...action.payload, projectId: id.toString() });
      id++;
    },
    addProjectPlantExcel(state, action: PayloadAction<ProjectType[]>) {
      state.data = [
        ...state.data,
        ...action.payload.map((project) => ({
          ...project,
          projectId: id.toString(),
        })),
      ];
    },
  },
});

export const { editFilter, addProject, addProjectPlantExcel } =
  projectsSlice.actions;

export default projectsSlice.reducer;
