import { request } from "@/utils";

export const getMapData = async options => {
  return await request.get("tweets/getTweetsLocation", {
    params: options
  });
};

export const getTweetList = async options => {
  return await request.get("tweets/listTweets", {
    params: options
  });
};

export const createPhoneNumber = async data => {
  return await request.post("usersSubscriber/addPhoneNumber", {
    phoneNumber: data
  });
};

