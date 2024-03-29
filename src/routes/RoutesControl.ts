import { useMemo } from "react";
import arrRoutes from "./Routes";
import { useRoutes } from "react-router-dom";
import useAuthStore from "@/store/authStore";


function RoutesControl() {
  const { user } = useAuthStore();
  const Role = user?.role.name ?? "none";

  const routes = useMemo(() => {
    return arrRoutes.filter(rt => rt.role.includes(Role));
  }, [Role])

  return useRoutes(routes);
}

export default RoutesControl