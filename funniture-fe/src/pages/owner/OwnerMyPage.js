import OwMypageCss from './ownermypage.module.css';

function OwnerMyPage() {
    return (
        <div className={OwMypageCss.mainPageContent}>
            <div>
                <div className={OwMypageCss.leftArea}>
                    <div className={OwMypageCss.leftAreaTop}>
                        <div className={OwMypageCss.divItem}>예약 현황</div>
                        <div className={OwMypageCss.divItem}>계약 만료</div>
                        <div className={OwMypageCss.divItem}>상품 관리</div>
                        <div className={OwMypageCss.divItem}>평균 별점</div>
                    </div>

                    <div className={OwMypageCss.leftAreaBottom}>
                        <div className={OwMypageCss.divItem}>문의</div>
                        <div className={OwMypageCss.divItem}>공지사항</div>
                    </div>
                </div>

                <div className={OwMypageCss.rightArea}>
                    <div className={OwMypageCss.divItem}>이번달 매출</div>
                    <div className={OwMypageCss.divItem}>리뷰</div>
                </div>
            </div>
        </div>
    )
}

export default OwnerMyPage;