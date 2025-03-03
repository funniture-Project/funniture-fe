import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserRouter() {

    const { user } = useSelector(state => state.member)

    // 로그인하지 않은 경우 로그인 페이지로 리디렉트
    // if (user.memberRole != "USER") {
    //     return <Navigate to="/notfound" />;
    // }

    // 로그인된 경우 정상적으로 해당 컴포넌트를 렌더링
    return <Outlet />;
}

export default UserRouter;