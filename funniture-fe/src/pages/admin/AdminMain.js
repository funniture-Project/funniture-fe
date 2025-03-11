import { useEffect, useState } from "react";
import AdminTop from "../../component/adminpage/AdminTop";
import AdMainCss from "./adminMain.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getProductCount } from "../../apis/ProductAPI";

function AdminMain() {

    const [productCount, setProductCount] = useState([])

    async function getProductCountData() {
        const response = await getProductCount();

        console.log("response : ", response)

        if (response != null) {
            for (const item of response.result) {

                const data = {
                    "categoryName": Object.keys(item)[0],
                    "count": Object.values(item)[0]
                }

                setProductCount(prev => [...prev, data])
            }
        }
    }

    useEffect(() => {
        console.log("productCount : ", productCount)
    }, [productCount])

    useEffect(() => {
        getProductCountData()
    }, [])

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