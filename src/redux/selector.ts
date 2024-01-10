import { createSelector } from "@reduxjs/toolkit";
import { PilePlansState } from "./pileplansSlice";
import { ProjectsState } from "./projectsSlice";
import { RootState } from "./store";
import { SettingsState } from "./settingsSlice";
import { FormBorelogDataState } from "./formBorelogSlice";

export const projectsSelector = (state: RootState): ProjectsState =>
  state.projects;
export const settingsSelector = (state: RootState): SettingsState =>
  state.settings;
export const formBorelogSelector = (state: RootState): FormBorelogDataState =>
  state.formBorelogData;
export const projectsRemainingSelector = createSelector(
  projectsSelector,
  (projectData) => {
    const projectList = projectData.data;
    const filter = projectData.filter;
    const isCheckSearch: (text: string, filter: string) => boolean = (
      text,
      filter
    ) => {
      return !!(
        text &&
        text
          .trim()
          .toUpperCase()
          .includes(filter ? filter?.trim()?.toUpperCase() : "")
      );
    };

    const projectSort = projectList?.filter((project) => {
      const isProjectId = isCheckSearch(project.projectId, filter.projectId);
      const isProjecetName = isCheckSearch(
        project.project_name,
        filter.project_name
      );

      return isProjecetName && isProjectId;
    });
    return projectSort;
  }
);
export const pileplansSelector = (state: RootState): PilePlansState =>
  state.pileplans;
export const pilePlansRemainingSelector = createSelector(
  pileplansSelector,
  (pileplansData) => {
    const pilePlans = pileplansData.data;
    const filter = pileplansData.filter;
    const isCheckSearch: (text: string, filter: string) => boolean = (
      text,
      filter
    ) => {
      return !!(
        text &&
        text
          .trim()
          .toUpperCase()
          .includes(filter ? filter?.trim()?.toUpperCase() : "")
      );
    };

    const pileplanSort = pilePlans?.filter((pileplan) => {
      const isPileId = isCheckSearch(pileplan.pileId, filter.pileId);
      const isPileLocation = isCheckSearch(
        pileplan.pile_location,
        filter.pile_location
      );
      const isPileDiameter = isCheckSearch(
        pileplan.pile_diameter,
        filter.pile_diameter
      );
      const isPileRaked = isCheckSearch(pileplan.pile_raked, filter.pile_raked);

      return isPileLocation && isPileId && isPileDiameter && isPileRaked;
    });
    return pileplanSort;
  }
);
