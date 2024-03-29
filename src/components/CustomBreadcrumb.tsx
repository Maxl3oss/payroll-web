import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import Routes from "@/routes/Routes";
import useAuthStore from "@/store/authStore";

type Data = {
  path: string;
  name: string;
}

type TypeRoutes = Data & {
  element: JSX.Element;
};

const CustomBreadcrumb: React.FC = () => {
  const {user} = useAuthStore();
  const roleUser = user?.role.name ?? "none";
  const [data, setData] = useState<Data[]>([]);
  const location = useLocation().pathname;

  const routes: TypeRoutes[] = useMemo(() => {
    if (!Routes || !location) return [] as TypeRoutes[];

    const currentRoute = Routes.find(route =>
      route.children.some(child => ("/" + child.path) === location) && route.role.includes(roleUser)
    );

    return currentRoute?.children
      .filter(child => ("/" + child.path) === location)
      .map(child => ({
        path: child.path,
        name: child.name,
        element: child.element
      })) ?? [];
  }, [location, roleUser]);

  useEffect(() => {
    const items = routes.map(route => {
      const pathParts = route.path.split("/");
      const nameParts = route.name.split("/");

      const titleObjects = [];
      let combinedPath = "";

      for (let i = 0; i < pathParts.length; i++) {
        combinedPath += (combinedPath ? "/" : "") + pathParts[i];
        titleObjects.push({
          path: i === pathParts.length ? "" : combinedPath,
          name: nameParts[i]
        });
      }
      return titleObjects;
    }).flat();
    setData(items);
  }, [routes]);

  return (
    <Breadcrumb
      items={
        data.map((item, index) => ({
          title:
            <NavLink
              key={item.name}
              to={(item.path === "" ? "" : "/") + item.path}
              className={data.length === (index + 1) ? "cursor-default !text-blue-main" : ""}
            >
              {item.name}
            </NavLink>,
        }))
      }
    />
  )
}

export default CustomBreadcrumb;