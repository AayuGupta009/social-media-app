const routes = [
  {
    to: "/dashboard",
    label: "Dashboard",
  },
  {
    to: "/registered-gaushala-management",
    label: "Cowshed Management",
    child: [
      {
        to: "/registered-gaushala-management/view-application-form/:id",
        label: "Cowshed Management",
      },
      {
        to: "/registered-gaushala-management/reg-cowshed-info-detail/:id",
        label: "Cowshed Management",
      },
    ],
  },
  {
    to: "/user-management",
    label: "User Management ",
    child: [
      {
        to: "/user-management/user-details/:id",
        label: "User Management",
      },
    ],
  },
  {
    to: "/complaints-management",
    label: "Complaint Management",
  },
  {
    to: "/volunteer-management",
    label: "Volunteer Management",
    child: [
      {
        to: "/volunteer-management/add-volunteer",
        label: "Volunteer Management",
      },
      {
        to: "/volunteer-management/volunteer-applicants-list/:id",
        label: "Volunteer Management",
      },
    ],
  },
  {
    to: "/vendor-management",
    label: "Vendor Management",
    child: [
      {
        to: "/vendor-management/add-vendor",
        label: "Vendor Management",
      },
      {
        to: "/vendor-management/vendor-applicants-list/:id",
        label: "Vendor Management",
      },
    ],
  },
  {
    to: "/awareness-programmes",
    label: "Awareness Programme",
    child: [
      {
        to: "/awareness-programmes/add-programmes",
        label: "Awareness Programme",
      },
    ],
  },
  {
    to: "/gallery-management",
    label: "Gallery Management ",
  },
  {
    to: "/acts-rules-management",
    label: "Acts & Rules Management",
    child: [
      {
        to: "/acts-rules-management/add-rules",
        label: "Acts & Rules Management",
      },
    ],
  },
  {
    to: "/training-management",
    label: "Training Management ",
    child: [
      {
        to: "/training-management/add-video",
        label: "प्रशिक्षण प्रबंधन",
      },
    ],
  },
  {
    to: "/financial-management",
    label: "Finance Management",
    child: [
      {
        to: "/financial-management/donation-details",
        label: "Finance Management",
      },
    ],
  },
  {
    to: "/cms",
    label: "CMS Management",
    child: [
      {
        to: "/cms/add-faq",
        label: "CMS Management",
      },
      {
        to: "/cms/edit-faq/:id",
        label: "CMS Management",
      },
    ],
  },
  {
    to: "/ngo-management",
    label: "NGO Management",
    child: [
      {
        to: "/ngo-management/view-ngo-application-form/:id",
        label: "NGO Management",
      },
      {
        to: "/ngo-management/registered-ngo-form/:id",
        label: "NGO Management",
      },
    ],
  },
  {
    to: "/query-management",
    label: "Query Management",
  },
  {
    to: "/homepage-management",
    label: "Homepage Management",
    child: [
      {
        to: "/homepage-management/add-blog",
        label: "Homepage Management",
      },
      {
        to: "/homepage-management/add-news",
        label: "Homepage Management",
      },
    ],
  },
];
export default routes;
