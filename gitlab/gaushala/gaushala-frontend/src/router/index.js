import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "../modules/page-not-found";
import SignIn from "../modules/authentication/sign-in";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import VolunteerRegistration from "../modules/volunteer-registration/VolunteerRegistration";
import VendorRegistration from "../modules/vendor-registration/VendorRegistration";
import AddVendor from "../modules/vendor-registration/AddVendor";
import AddVolunteer from "../modules/volunteer-registration/AddVolunteer";
import AwarenessProgrammes from "../modules/awareness-programmes/AwarenessProgrammes";
import Cms from "../modules/cms/Cms";
import Ngo from "../modules/ngo/Ngo";
import AddProgrammes from "../modules/awareness-programmes/AddProgrammes";
import ForgetPassword from "../modules/authentication/forget-password/ForgetPassword";
import ResetPassword from "../modules/authentication/reset-password/ResetPassword";
import UserManagement from "../modules/user-management/UserManagement";
import ComplaintsManagement from "../modules/complain-management/ComplaintsManagement";
import Dashboard from "../modules/dashboard/Dashboard";
import RegCowshedRequestForm from "../modules/registered-gaushala/reg-cowshed-request/RegCowshedRequestForm";
import RegisteredGaushala from "../modules/registered-gaushala/RegisteredGaushala";
import RegCowshedInformation from "../modules/registered-gaushala/registered_cowshed/view-registered-cowshed-detail/RegCowshedInformation";
import UserDetail from "../modules/user-management/user-details/UserDetail";
import ViewVolApplicantsList from "../modules/volunteer-registration/view-applicants-list/ViewVolApplicantsList";
import ViewVenApplicantsList from "../modules/vendor-registration/view-applicants-list/ViewVenApplicantsList";
import QueryManagement from "../modules/query-management/QueryManagement";
import FinanceManagement from "../modules/financial-management/FinanceManagement";
import ActRulesManagement from "../modules/act-and-rules/ActRulesManagement";
import HomepageManagement from "../modules/homepage-management/HomepageManagement";
import GalleryManagement from "../modules/gallery/GalleryManagement";
import AddActRules from "../modules/act-and-rules/AddActRules";
import Training from "../modules/training/Training";
import DonationDetails from "../modules/financial-management/donation-details/DonationDetails";
import AddVideo from "../modules/training/AddVideo";
import ViewNgoApplicationForm from "../modules/ngo/ViewNgoApplicationForm";
import AddBlogs from "../modules/homepage-management/blog/AddBlogs";
import AddNews from "../modules/homepage-management/news/AddNews";
import ViewRegisteredNgoForm from "../modules/ngo/ViewRegisteredNgoForm";
import Faq from "../modules/cms/faq/Faq";
import AddFaq from "../modules/cms/faq/AddFaq";

export default function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRouter />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/user-management/user-details/:id"
            element={<UserDetail />}
          />
          <Route
            path="/registered-gaushala-management"
            element={<RegisteredGaushala />}
          />
          <Route
            path="/registered-gaushala-management/view-application-form/:id"
            element={<RegCowshedRequestForm />}
          />
          <Route
            path="/registered-gaushala-management/reg-cowshed-info-detail/:id"
            element={<RegCowshedInformation />}
          />
          <Route
            path="/complaints-management"
            element={<ComplaintsManagement />}
          />
          <Route
            path="/volunteer-management"
            element={<VolunteerRegistration />}
          />
          <Route
            path="/volunteer-management/volunteer-applicants-list/:id"
            element={<ViewVolApplicantsList />}
          />
          <Route
            path="/volunteer-management/add-volunteer"
            element={<AddVolunteer />}
          />
          <Route
            path="/volunteer-management/edit-volunteer/:id"
            element={<AddVolunteer />}
          />
          <Route
            path="/volunteer-management/edit-volunteer-form/:id"
            element={<AddVolunteer />}
          />
          <Route path="/vendor-management" element={<VendorRegistration />} />
          <Route
            path="/vendor-management/vendor-applicants-list/:id"
            element={<ViewVenApplicantsList />}
          />
          <Route path="/vendor-management/add-vendor" element={<AddVendor />} />
          <Route
            path="/vendor-management/edit-vendor/:id"
            element={<AddVendor />}
          />
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route
            path="/awareness-programmes"
            element={<AwarenessProgrammes />}
          />
          <Route
            path="/awareness-programmes/add-programmes"
            element={<AddProgrammes />}
          />
          <Route
            path="/awareness-programmes/edit-programmes/:id"
            element={<AddProgrammes />}
          />
          <Route path="/gallery-management" element={<GalleryManagement />} />
          <Route
            path="/acts-rules-management"
            element={<ActRulesManagement />}
          />
          <Route
            path="/acts-rules-management/add-rules"
            element={<AddActRules />}
          />
          <Route
            path="/acts-rules-management/edit-rules/:id"
            element={<AddActRules />}
          />
          <Route path="/training-management" element={<Training />} />
          <Route path="/training-management/add-video" element={<AddVideo />} />
          <Route path="/financial-management" element={<FinanceManagement />} />
          <Route
            path="/financial-management/donation-details/:id"
            element={<DonationDetails />}
          />
          <Route path="/cms" element={<Cms />} />
          <Route path="/cms/add-faq" element={<AddFaq />} />
          <Route path="/cms/edit-faq/:id" element={<AddFaq />} />
          <Route path="/ngo-management" element={<Ngo />} />
          <Route
            path="/ngo-management/view-ngo-application-form/:id"
            element={<ViewNgoApplicationForm />}
          />
          <Route
            path="/ngo-management/registered-ngo-form/:id"
            element={<ViewRegisteredNgoForm />}
          />
          <Route path="/query-management" element={<QueryManagement />} />
          <Route path="/homepage-management" element={<HomepageManagement />} />
          <Route path="/homepage-management/add-blog" element={<AddBlogs />} />
          <Route
            path="/homepage-management/edit-blog/:id"
            element={<AddBlogs />}
          />
          <Route path="/homepage-management/add-news" element={<AddNews />} />
          <Route
            path="/homepage-management/edit-news/:id"
            element={<AddNews />}
          />
        </Route>
      </Routes>
    </>
  );
}
