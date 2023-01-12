/* eslint-disable no-param-reassign */
import { CHANGE_DASHBOARD_DATA, CHANGE_REVIEWS_DATA, SESSION_DATA } from '../contants';

export const sessionData = (payload) => {
  return {
    type: SESSION_DATA
    ,
    payload,
  };
};
export const changeDashboardData = (payload) => {
  return {
    type: CHANGE_DASHBOARD_DATA,
    payload,
  };
};
export const changeReviewData = (payload) => {
  return {
    type: CHANGE_REVIEWS_DATA,
    payload,
  };
};
