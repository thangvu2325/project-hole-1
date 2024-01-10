import { ComponentType, FunctionComponent } from "react";
export type RouteType = {
  path: string;
  component: ComponentType;
  layout?: FunctionComponent<{ children: React.ReactNode }>;
};
export type ProjectType = {
  projectId: string;
  project_name: string;
  project_status: "Done" | "Process";
  project_date: string;
};
export type PilePlanType = {
  projectId: string;
  pileId: string;
  pile_location: string;
  pile_status: "Completed" | "Not started";
  pile_diameter: string;
  pile_raked: "Vertical" | "Horizon";
};
export type FormBorelogDataType = {
  projectDate?: string;
  pileNo?: string;
  boringStartDate?: string;
  boringStartTime?: string;
  boringEndDate?: string;
  boringEndTime?: string;
  groutingStartDate?: string;
  groutingStartTime?: string;
  groutingEndDate?: string;
  groutingEndTime?: string;
  platformLevel?: string;
  topOfCasing?: string;
  cutOffLevel?: string;
  toc?: string;
  toe?: string;
  ogl?: string;
  pileLength?: string;
  soilDrilling?: string;
  totalWeathered?: string;
  rockSocket?: string;
  groutLength?: string;
  ofBag?: string;
  api?: string;
  apiPileLength?: string;
  apiPileSize?: string;
  boringRig?: string;
  permanent?: string;
  deep?: Array<deepType>;
};
export type deepType = {
  depth: number;
  description: string;
};
