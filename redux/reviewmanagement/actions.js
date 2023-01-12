/* eslint-disable no-param-reassign */
import { REVIEW_CHART, REVIEW_LIST, SUBTITLE } from "./type";

export const updateSubtitle = (payload) => {
  return {
    type: SUBTITLE
    ,
    payload,
  };
};
export const getReviewChart = (payload) => {
  return {
    type: REVIEW_CHART,
    payload,
  };
};
export const getReviewList = (payload) => {
  return {
    type: REVIEW_LIST,
    payload,
  };
};
