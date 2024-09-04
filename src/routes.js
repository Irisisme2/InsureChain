import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdOutlineAssignment,
  MdPerson,
  MdLock,
  MdPayment,
  MdAnalytics
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Claims from "views/admin/Claims";
import Profile from "views/admin/profile";
import Policies from "views/admin/Policies";
import Premiums from "views/admin/Premiums";
import DataInsights from "views/admin/DataInsights";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Policies",
    layout: "/admin",
    path: "/Policies",
    icon: (
      <Icon
        as={MdOutlineAssignment}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Policies,
    secondary: true,
  },
  {
    name: "Claims",
    layout: "/admin",
    icon: <Icon as={MdOutlineAssignment} width='20px' height='20px' color='inherit' />,
    path: "/Claims",
    component: Claims,
  },
  {
    name: "Premiums",
    layout: "/admin",
    icon: <Icon as={MdPayment} width='20px' height='20px' color='inherit' />,
    path: "/Premiums",
    component: Premiums,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Data Insights",
    layout: "/admin",
    path: "/DataInsights",
    icon: <Icon as={MdAnalytics} width='20px' height='20px' color='inherit' />,
    component: DataInsights,
  },
];

export default routes;
