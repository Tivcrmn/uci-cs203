import Dashboard from "../Dashboard";
import F0F from "../F0F";

const routes = [
  {
    path: "/",
    exact: true,
    main: Dashboard
  },
  {
    path: "*",
    main: F0F
  }
];

export default routes;
