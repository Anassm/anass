import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home/page.tsx"),
  route("about", "routes/about/page.tsx"),
  route("playground", "routes/playground/page.tsx"),
] satisfies RouteConfig;
