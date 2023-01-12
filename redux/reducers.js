import { combineReducers } from "redux";
import { customerApi } from "services/customerApi";
import { feedbackApi } from "services/feedbackApi";
import { widgetApi } from "services/widgetApi";
import { dashboardApi } from "../services/dashboardApi";
import { previewApi } from "../services/reviewApi";
import { templateApi } from "../services/templateApi";
import { userApi } from "../services/userApi";
import authUser from "./auth/reducer";
import chatApp from "./chat/reducer";
import dashboard from "./dashboard/reducer";
import menu from "./menu/reducer";
import reviewManagement from "./reviewmanagement/reducer";
import settings from "./settings/reducer";
import surveyDetailApp from "./surveyDetail/reducer";
import surveyListApp from "./surveyList/reducer";
import todoApp from "./todo/reducer";

const reducers = combineReducers({
  menu,
  dashboard,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  reviewManagement,
  [previewApi.reducerPath]: previewApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [widgetApi.reducerPath]: widgetApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
});

export default reducers;
