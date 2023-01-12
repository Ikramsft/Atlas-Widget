import { CHANGE_DASHBOARD_DATA, CHANGE_REVIEWS_DATA, SESSION_DATA } from '../contants';


const INIT_STATE = {
  sessionData: {},
  dashboardData: [], // if you use menu-sub-hidden as default menu type, set value of this variable to false
  reviewData: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SESSION_DATA:
      return { ...state, sessionData: action.payload };
    case CHANGE_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload };
    case CHANGE_REVIEWS_DATA:
      return { ...state, reviewData: action.payload };
    default:
      return { ...state };
  }
};
