import { useDispatch, useSelector } from 'react-redux';
import OwMypageCss from './ownermypage.module.css';
import { useEffect, useRef, useState } from 'react';
import { getProductListByOwnerNo } from '../../apis/ProductAPI';
import { useNavigate } from 'react-router-dom';

function OwnerMyPage() {
    const { user } = useSelector(state => state.member)
    const { ownerAllProductList } = useSelector(state => state.product)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [saleProductNum, setSaleProductNum] = useState(0);
    const [stopProductNum, setStopProductNum] = useState(0);
    const [noAbleProductNum, setNoAbleProductNum] = useState(0);

    async function getData(userId) {
        console.log("데이터 부르기")
        dispatch(getProductListByOwnerNo(userId))
    }

    useEffect(() => {
        console.log("userInfo : ", user.memberId)
        getData(user.memberId)
    }, [user])

    useEffect(() => {
        setStopProductNum(ownerAllProductList.filter(product => product.productStatus == '판매종료').length)
        setSaleProductNum(ownerAllProductList.filter(product => product.productStatus == '판매중').length)
        setNoAbleProductNum(ownerAllProductList.filter(product => product.productStatus == '판매불가').length)
    }, [ownerAllProductList])

    return (
        <div className={OwMypageCss.mainPageContent}>
            <div>
                <div className={OwMypageCss.leftArea}>
                    <div className={OwMypageCss.leftAreaTop}>
                        <div className={OwMypageCss.divItem}>
                            <div>예약현황</div>
                            <div>
                                <div>판매 중 {saleProductNum.current}</div>
                                <div>판매 중단 {stopProductNum.current}</div>
                                <div>판매 불가 {noAbleProductNum.current}</div>
                            </div>
                        </div>
                        <div className={OwMypageCss.divItem}>계약 만료</div>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>상품관리</div>
                                <div onClick={() => navigate("/owner/product")}>+ 더보기</div>
                            </div>
                            <div>
                                <div>
                                    <div>판매 중 : </div>
                                    <div><span>{saleProductNum}</span> 건</div>
                                </div>
                                <div>
                                    <div>판매 중단 : </div>
                                    <div><span>{stopProductNum}</span> 건</div>
                                </div>
                                <div>
                                    <div>판매 불가 : </div>
                                    <div><span>{noAbleProductNum}</span> 건</div>
                                </div>
                            </div>
                        </div>
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