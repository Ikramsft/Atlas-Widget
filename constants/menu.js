import { LINKS } from "lib/constants";

const data = [

  {
    id: "reviews",
    icon: "iconsminds-dashboard",
    label: "Reviews",
    to: `reviews`,
    subs: [
      {
        id: "dashboard",
        icon: "iconsminds-shop-4",
        label: "Dashboard",
        parentLabel: "Reviews",
        to: `${LINKS.DASHBOARD}`,

      },
      {
        id: "management",
        icon: "simple-icon-pie-chart",
        label: "Reviews Management",
        parentLabel: "Reviews",
        to: `${LINKS.REVIEWS_MANAGEMENT}`,

      },
    ],
  },
  {

    id: "widget",
    icon: "simple-icon-grid",
    label: "Widget",
    to: `widget`,
    subs: [
      {
        id: "widgets",
        icon: "simple-icon-social-soundcloud",
        label: "Widgets",
        to: `${LINKS.WIDGET}`,
        parentLabel: "Widget",


      },
      // {
      //   icon: "simple-icon-pie-chart",
      //   label: "Reviews Management",
      //   to: `/reviews`,

      // },
    ],
  },
  {
    id: "template",
    icon: "iconsminds-mail",
    label: "Template",
    to: `template`,
    subs: [
      {
        id: "templates",
        icon: "iconsminds-file-copy",
        label: "Templates",
        to: `${LINKS.TEMPLATE}`,


      },
    ],
  },
  {
    id: "forms",
    icon: "simple-icon-doc",
    label: "Forms",
    to: ``,
    disabled: true,
    subs: [
      {
        icon: "simple-icon-user-following",
        label: "Coming Soon",
        to: "",


      },
    ],
  },
  {
    id: "calls",
    icon: "simple-icon-call-end",
    label: "Calls",
    to: ``,
    disabled: true,
    subs: [
      {
        icon: "simple-icon-check",
        label: "Coming Soon",
        to: ``,


      },
    ],
  },
  // {
  //   id: "integrations",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "Integrations",
  //   to: ``,
  //   subs: [
  //     {
  //       icon: "simple-icon-check",
  //       label: "Sub integrations",
  //       to: `/integrations`,

  //     },
  //   ],
  // },
  {
    id: "customer",
    icon: "simple-icon-user",
    label: "Customers",
    to: `customer`,
    subs: [
      {
        id: "customers",
        icon: "simple-icon-user",
        label: "Customers",
        to: `${LINKS.CUSTOMER}`,

      },
    ],
  },
  // {
  //   id: "settings",
  //   icon: "simple-icon-settings",
  //   label: "Settings",
  //   to: ``,
  //   subs: [
  //     {
  //       icon: "simple-icon-check",
  //       label: "Sub Setting",
  //       to: `/settings`,
  //     },
  //     {
  //       icon: "simple-icon-user",
  //       label: "Profile",
  //       to: `${LINKS.PROFILE}`,
  //     },
  //   ],
  // },
];
export default data;
