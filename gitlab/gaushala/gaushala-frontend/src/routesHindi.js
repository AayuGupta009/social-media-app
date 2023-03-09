const routes = [
  {
    to: "/dashboard",
    label: "डैशबोर्ड",
  },
  {
    to: "/registered-gaushala-management",
    label: "पंजीकृत गौशाला प्रबंधन",
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
    label: "उपयोगकर्ता प्रबंधन",
    child: [
      {
        to: "/user-management/user-details/:id",
        label: "User Management",
      },
    ],
  },
  {
    to: "/complaints-management",
    label: "शिकायत प्रबंधन",
  },
  {
    to: "/volunteer-management",
    label: "स्वयंसेवी प्रबंधन ",
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
    label: "विक्रेता प्रबंधन",
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
    label: "जागरूकता कार्यक्रम",
    child: [
      {
        to: "/awareness-programmes/add-programmes",
        label: "Awareness Programme",
      },
    ],
  },
  {
    to: "/gallery-management",
    label: "गैलरी प्रबंधन",
  },
  {
    to: "/acts-rules-management",
    label: "अधिनियम और नियम प्रबंधन",
    child: [
      {
        to: "/acts-rules-management/add-rules",
        label: "Acts & Rules Management",
      },
    ],
  },
  {
    to: "/training-management",
    label: "ट्रेनिंग प्रबंधन",
    child: [
      {
        to: "/training-management/add-video",
        label: "ट्रेनिंग प्रबंधन",
      },
    ],
  },
  {
    to: "/financial-management",
    label: "वित्त प्रबंधन",
    child: [
      {
        to: "/financial-management/donation-details",
        label: "Finance Management",
      },
    ],
  },
  {
    to: "/cms",
    label: "सीएमएस प्रबंधन",
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
    label: "एनजीओ प्रबंधन",
    child: [
      {
        to: "/ngo-management/view-ngo-application-form/:id",
        label: "NGO management",
      },
      {
        to: "/ngo-management/registered-ngo-form/:id",
        label: "NGO management",
      },
    ],
  },
  {
    to: "/query-management",
    label: "क्वेरी प्रबंधन",
  },
  {
    to: "/homepage-management",
    label: "होम पेज प्रबंधन ",
    child: [
      {
        to: "/homepage-management/add-blog",
        label: "Homepage management",
      },
      {
        to: "/homepage-management/add-news",
        label: "Homepage management",
      },
    ],
  },
];

export default routes;
