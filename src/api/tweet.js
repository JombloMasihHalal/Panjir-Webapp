import { request } from "@/helper";

export const getMapData = async options => {
  return await request.get("map", options);
};

export const getTweetList = async options => {
  return await request.get("map", options);
};
