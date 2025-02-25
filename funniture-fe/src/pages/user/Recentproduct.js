import { useEffect, useState } from 'react'
import RecentCss from './RecentProduct.module.css'

function RecentProduct() {

    const [recentList, setRecentList] = useState([])

    useEffect(() => {
        if (localStorage.getItem("recent")) {
            const recent = localStorage.getItem("recent")

            console.log("저장 전 recent : ", recent);

            setRecentList(recent)
        }
    }, [])

    useEffect(() => {
        console.log("APi에게 전송될 예정 : ", recentList)
    }, [recentList])

    return (
        <div className={RecentCss.wholeContainer}>
            <div className={RecentCss.orderPageTitle}>최근본 상품</div>
            <div className={RecentCss.recentList}>
                <div className={RecentCss.recentItem}>
                    <div className={RecentCss.imgBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={RecentCss.productStatus}>판매중</div>
                    <div>위니아 김치냉장고</div>
                    <div className={RecentCss.productPrice}>29,000 원</div>
                    <div>
                        <a href="/PRD001">상세페이지 &gt;</a>
                    </div>
                </div>
                <div className={RecentCss.recentItem}>
                    <div className={RecentCss.imgBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={RecentCss.productStatus}>판매중</div>
                    <div>위니아 김치냉장고</div>
                    <div className={RecentCss.productPrice}>29,000 원</div>
                    <div>
                        <a href="/PRD001">상세페이지 &gt;</a>
                    </div>
                </div>
                <div className={RecentCss.recentItem}>
                    <div className={RecentCss.imgBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={RecentCss.productStatus}>판매중</div>
                    <div>위니아 김치냉장고</div>
                    <div className={RecentCss.productPrice}>29,000 원</div>
                    <div>
                        <a href="/PRD001">상세페이지 &gt;</a>
                    </div>
                </div>
                <div className={RecentCss.recentItem}>
                    <div className={RecentCss.imgBox}>
                        <img src={require("../../assets/images/a.jpg")} alt="상품 이미지" />
                    </div>
                    <div className={RecentCss.productStatus}>판매중</div>
                    <div>위니아 김치냉장고</div>
                    <div className={RecentCss.productPrice}>29,000 원</div>
                    <div>
                        <a href="/PRD001">상세페이지 &gt;</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RecentProduct