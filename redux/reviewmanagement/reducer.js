import { REVIEW_CHART, REVIEW_LIST, SUBTITLE } from "./type";


const INIT_STATE = {
  subTitle: 'Last 6 months',
  reviewCartData: [], // if you use menu-sub-hidden as default menu type, set value of this variable to false
  reviewList: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBTITLE:
      return { ...state, subTitle: action.payload };
    case REVIEW_CHART:
      return { ...state, reviewCartData: action.payload };
    case REVIEW_LIST:
      return { ...state, reviewList: action.payload };
    default:
      return { ...state };
  }
};
