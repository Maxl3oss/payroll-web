import useAuthStore from "@/store/authStore"
import { Fragment } from "react/jsx-runtime"

function Dashboard() {
  const { user, accessToken } = useAuthStore();

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>แดชบอร์ด</h1>
        </div>
        <div className="layout-contents">
          <h3>เร็วๆ นี้</h3>
          <p className="p-5 border rounded-2xl">
            {JSON.stringify(user)}
            {accessToken}
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard