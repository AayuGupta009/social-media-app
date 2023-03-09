import { combineReducers } from "redux";
import { getActRulesDataReducer } from "./act-rules/getActRulesDataReducer";
import { getActRulesEditDetailsReducer } from "./act-rules/getActRulesEditDetailsReducer";
import { authReducer } from "./auth/authReducer";
import { getAwarenessEditDetailsReducer } from "./awareness-programme/getAwarenessEditDetailsReducer";
import {
  addProgrammeReducer,
  getAwarenessProgDataReducer,
} from "./awareness-programme/getAwarenessProgDataReducer";
import { getComplaintDataReducer } from "./complain-management/getComplaintDataReducer";
import { getNearestCowshedDataReducer } from "./complain-management/getNearestCowshedDataReducer";
import { getDashboardReducer } from "./dashboard/getDashboardReducer";
import { getFinanceCowshedReducer } from "./finance-managment/cowshed/getFinanceCowshedReducer";
import { getFinanaceDataReducerData } from "./finance-managment/getFinanaceDataReducerData";
import { getGalleryDataReducer } from "./gallery-management/getGalleryDataReducer";
import { getCowAdoptionReqReducer } from "./gaushala-management/getCowAdoptionReqReducer";
import {
  deleteCowshedRequestReducer,
  getGaushalaManagementReducer,
} from "./gaushala-management/getGaushalaManagementReducer";
import { getRegCowshedCowDataReducer } from "./gaushala-management/getRegCowshedCowDataReducer";
import { viewAdoptedCowDetailData } from "./gaushala-management/viewAdoptedCowDetailData";
import { ViewGaushalApplicationFormReducer } from "./gaushala-management/ViewGaushalApplicationFormReducer";
import { getBlogsDataReducer } from "./homepage-management/blogs/getBlogsDataReducer";
import { getBlogsEditDetailsReducer } from "./homepage-management/blogs/getBlogsEditDetailsReducer";
import { getNewsDataReducer } from "./homepage-management/news/getNewsDataReducer";
import { getNewsEditDetailsReducer } from "./homepage-management/news/getNewsEditDetailsReducer";
import loadingReducer from "./loading/loadingReducer";
import { getComplainTypeReducer } from "./master-data/getComplainTypeReducer";
import { getCowsbreedMasterDataReducer } from "./master-data/getCowsbreedMasterDataReducer";
import { getDistrictMasterDataReducer } from "./master-data/getDistrictMasterDataReducer";
import { getNgoManagementReducer } from "./ngo/getNgoManagementReducer";
import { ViewNgoApplicationFormReducer } from "./ngo/ViewNgoApplicationFormReducer";
import { getQueryDataReducer } from "./query-management/getQueryDataReducer";
import { getTrainingDataReducer } from "./training/getTrainingDataReducer";
import {
  deleteUserReducer,
  getUserManagementDataReducer,
} from "./user-management/getUserManagementDataReducer";
import { getUserAdopReqReducer } from "./user-management/user-details/getUserAdopReqReducer";
import { getUserAdopReqViewReducer } from "./user-management/user-details/getUserAdopReqViewReducer";
import { getUserComplaintReducer } from "./user-management/user-details/getUserComplaintReducer";
import { getUserComplaintViewReducer } from "./user-management/user-details/getUserComplaintViewReducer";
import { getUserDonationReducer } from "./user-management/user-details/getUserDonationReducer";
import { getUserVenReqReducer } from "./user-management/user-details/getUserVenReqReducer";
import { getUserVenReqViewReducer } from "./user-management/user-details/getUserVenReqViewReducer";
import { getUserVolReqReducer } from "./user-management/user-details/getUserVolReqReducer";
import { getUserVolReqViewReducer } from "./user-management/user-details/getUserVolReqViewReducer";
import { getVenApplicantsListReducer } from "./vendor-management/getVenApplicantsListReducer";
import { getVenEditDetailsReducer } from "./vendor-management/getVenEditDetailsReducer";
import { getVenReqListReducer } from "./vendor-management/getVenReqListReducer";
import { viewVenApplicantsDataReducer } from "./vendor-management/viewVenApplicantsDataReducer";
import { getEditDetailsReducer } from "./volunteer-management/getEditDetailsReducer";
import { getVolApplicantsListReducer } from "./volunteer-management/getVolApplicantsListReducer";
import { getVolunteerReqListReducer } from "./volunteer-management/getVolunteerReqListReducer";
import { viewVolApplicantsDataReducer } from "./volunteer-management/viewVolApplicantsDataReducer";
import { getFaqDatasReducer } from "./cms/faq/getFaqDatasReducer";
import { getFaqEditDetailsReducer } from "./cms/faq/getFaqEditDetailsReducer";
import { getBannerDataReducer } from "./homepage-management/banner/getBannerDataReducer";
import { getBannerEditDetailsReducer } from "./homepage-management/banner/getBannerEditDetailsReducer";
import { getCmsDataReducer } from "./cms/getCmsDataReducer";
import { getFileDataReducer } from "./master-data/getFileDataReducer";
import { getImageDataReducer } from "./master-data/getImageDataReducer";

export const reducers = combineReducers({
  // auth
  auth: authReducer,
  dashboard: getDashboardReducer,
  loadingReducer: loadingReducer,

  // master data reducer
  districtMasterData: getDistrictMasterDataReducer,
  cowsbreedMasterDataReducer: getCowsbreedMasterDataReducer,
  complainTypeReducer: getComplainTypeReducer,
  fileDataReducer: getFileDataReducer,
  imageDataReducer: getImageDataReducer,

  // cowshed management
  GaushalaManagementReducer: getGaushalaManagementReducer,
  ViewGaushalApplicationFormReducer: ViewGaushalApplicationFormReducer,
  deleteCowshedRequest: deleteCowshedRequestReducer,
  regCowshedCowDataReducer: getRegCowshedCowDataReducer,
  cowAdoptionReqReducer: getCowAdoptionReqReducer,
  viewAdoptedCowDetailData: viewAdoptedCowDetailData,

  // user management
  userManagementDataReducer: getUserManagementDataReducer,
  deleteUserReducer: deleteUserReducer,

  // user management- user details
  userAdopReqReducer: getUserAdopReqReducer,
  userAdopReqViewReducer: getUserAdopReqViewReducer,
  userComplaintReducer: getUserComplaintReducer,
  userComplaintViewReducer: getUserComplaintViewReducer,
  userDonationReducer: getUserDonationReducer,
  userVenReqReducer: getUserVenReqReducer,
  userVenReqViewReducer: getUserVenReqViewReducer,
  userVolReqReducer: getUserVolReqReducer,
  userVolReqViewReducer: getUserVolReqViewReducer,

  // complain management
  complaintDataReducer: getComplaintDataReducer,
  nearestCowshedDataReducer: getNearestCowshedDataReducer,

  // volunteer management
  volunteerReqListReducer: getVolunteerReqListReducer,
  volApplicantsListReducer: getVolApplicantsListReducer,
  viewVolApplicantsDataReducer: viewVolApplicantsDataReducer,
  editDetailsReducer: getEditDetailsReducer,

  // vendor management
  venReqListReducer: getVenReqListReducer,
  venApplicantsListReducer: getVenApplicantsListReducer,
  viewVenApplicantsDataReducer: viewVenApplicantsDataReducer,
  venEditDetailsReducer: getVenEditDetailsReducer,

  // awareness programme
  awarenessProgDataReducer: getAwarenessProgDataReducer,
  addProgrammeReducer: addProgrammeReducer,
  awarenessEditDetailsReducer: getAwarenessEditDetailsReducer,

  // gallery management
  galleryDataReducer: getGalleryDataReducer,

  // act rules
  actRulesEditDetailsReducer: getActRulesEditDetailsReducer,
  actRulesDataReducer: getActRulesDataReducer,

  // taining management
  trainingDataReducer: getTrainingDataReducer,

  // finance management
  finanaceDataReducerData: getFinanaceDataReducerData,
  financeCowshedReducer: getFinanceCowshedReducer,

  // cms management
  faqDatasReducer: getFaqDatasReducer,
  faqEditDetailsReducer: getFaqEditDetailsReducer,
  cmsDataReducer: getCmsDataReducer,

  // query management
  queryDataReducer: getQueryDataReducer,

  // ngo management
  ngoManagementReducer: getNgoManagementReducer,
  ViewNgoApplicationFormReducer: ViewNgoApplicationFormReducer,

  // homepage management
  bannerDataReducer: getBannerDataReducer,
  bannerEditDetailsReducer: getBannerEditDetailsReducer,
  blogsDataReducer: getBlogsDataReducer,
  blogsEditDetailsReducer: getBlogsEditDetailsReducer,
  newsDataReducer: getNewsDataReducer,
  newsEditDetailsReducer: getNewsEditDetailsReducer,
});
