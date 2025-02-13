import { Outlet } from "react-router-dom"
import AdminTop from "../component/adminpage/AdminTop"

function AuthorityLayout() {

    return (
        <>
            <AdminTop title={'회원 정보'} />

            <div>여기는 회원정보 페이지</div>
            <Outlet />
        </>
    )

}

export default AuthorityLayout