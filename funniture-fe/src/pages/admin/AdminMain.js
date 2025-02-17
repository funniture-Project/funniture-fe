import AdminTop from "../../component/adminpage/AdminTop";
import AdMainCss from "./adminMain.module.css"

function AdminMain() {

    return (
        <>
            <AdminTop title={'메인 페이지'} />

            <div className={AdMainCss.mainContent}>
                <div>제품 등록 현황</div>
                <div>매출 현황</div>
                <div>공지 사항</div>
                <div>접속자 수</div>
            </div>
        </>
    )

}

export default AdminMain;