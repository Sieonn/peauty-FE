import CustomerSignUp from "../../pages/customer/sign-up";
import CustomerSignUpComplete from "../../pages/customer/sign-up-complete";
import CustomerHome from "../../pages/main";
import { petPaths } from "./pet";
import { requestPaths } from "./request";
import { myPagePaths } from "./mypage";

export const customerPaths = [
  {
    path: "signup",
    element: <CustomerSignUp />,
  },
  {
    path: "signup-complete",
    element: <CustomerSignUpComplete />,
  },
  {
    path: "mypage",
    children: myPagePaths,
  },
  {
    path: "pet",
    children: petPaths,
  },
];

export const customerPaths2 = [
  {
    path: "home",
    element: <CustomerHome />,
  },
];
