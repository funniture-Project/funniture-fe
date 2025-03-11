import { useDispatch, useSelector } from 'react-redux';
import OwMypageCss from './ownermypage.module.css';
import { useEffect, useRef, useState } from 'react';
import { getProductListByOwnerNo } from '../../apis/ProductAPI';
import { useNavigate } from 'react-router-dom';
import { callInquiryByOwnerNoAPI } from '../../apis/InquiryAPI';
import { callReviewByOwnerNoAPI } from '../../apis/ReviewAPI';
import OwnerReview from './ownerMainReview.module.css';
import { getAllNoticeList } from '../../apis/NoticeAPI';
import { getRentalStateCountByOwner } from '../../apis/RentalAPI';


function OwnerMyPage() {
    const { user } = useSelector(state => state.member)
    const { ownerAllProductList } = useSelector(state => state.product)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [saleProductNum, setSaleProductNum] = useState(0);
    const [stopProductNum, setStopProductNum] = useState(0);
    const [noAbleProductNum, setNoAbleProductNum] = useState(0);

    const inquiries = useSelector(state => state.owner.inquiries?.result?.data || []); // 조건부 렌더링 해야 에러 안 남.
    const reviews = useSelector(state => state.owner.reviews?.result?.data || []); // 조건부 렌더링 해야 에러 안 남.

    // 예약 현황 카운트 상태 추가
    const [reservationCounts, setReservationCounts] = useState({
        waiting: 0,       // 확정 대기
        confirmed: 0,     // 확정 완료
        canceled: 0,      // 예약 취소
    });

    // 예약 리스트 상태 추가
    const [rentalStateCount, setRentalStateCount] = useState([]);

    // 제공자 메인에 문의 출력
    useEffect(() => {
        if (user && user.memberId) {
            dispatch(callInquiryByOwnerNoAPI(user.memberId)); // API 호출
        }
    }, [user, dispatch]); // user와 dispatch에 의존

    // 제공자 메인에 리뷰 출력
    useEffect(() => {
        if (user && user.memberId) {
            dispatch(callReviewByOwnerNoAPI(user.memberId)); // API 호출
        }
    }, [user, dispatch]); // user와 dispatch에 의존

    async function getData(userId) {
        dispatch(getProductListByOwnerNo(userId))
    }

    useEffect(() => {
        getData(user.memberId)
    }, [user])

    useEffect(() => {
        setStopProductNum(ownerAllProductList.filter(product => product.productStatus == '판매종료').length)
        setSaleProductNum(ownerAllProductList.filter(product => product.productStatus == '판매중').length)
        setNoAbleProductNum(ownerAllProductList.filter(product => product.productStatus == '판매불가').length)
    }, [ownerAllProductList])

    // 공지사항
    const [noticeList, setNoticeList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        async function getNotice() {
            const response = await getAllNoticeList()
            setNoticeList(response)
        }
        getNotice()
    }, [])

    useEffect(() => {
        if (noticeList.length > 0) {

            const list = noticeList.filter(item => item.viewRoll == "owner" || item.viewRoll == "all").reverse()
            if (list.length > 3) {
                setFilteredList(list.slice(0, 5))
            } else {
                setFilteredList(list)
            }
        }
    }, [noticeList])

    // 예약 리스트 가져오기
    useEffect(() => {
        async function getRentalData() {
            try {
                // memberId를 사용하여 예약 리스트 가져오기
                const response = await getRentalStateCountByOwner(user.memberId);
                const rentals = response.results.rentalStateCount;
                setRentalStateCount(rentals);
            } catch (error) {
                console.error('Error fetching rentals list:', error);
                setRentalStateCount([]);
            }
        }

        if (user && user.memberId) {
            getRentalData();
        }
    }, [user]);

    // rentalStateCount 처리 useEffect 수정
    useEffect(() => {
        const counts = {
        waiting: 0,
        confirmed: 0,
        canceled: 0,
        };
    
        // API 응답 구조에 따른 처리
        rentalStateCount.forEach((stateCount) => {
        switch(stateCount.rentalState) {
            case "예약대기":
            counts.waiting = stateCount.count; // ✅ count 값 직접 할당
            break;
            case "예약완료":
            counts.confirmed = stateCount.count;
            break;
            case "예약취소":
            counts.canceled = stateCount.count;
            break;
            default:
            console.warn("알 수 없는 상태:", stateCount.rentalState);
        }
        });
    
        setReservationCounts(counts);
    }, [rentalStateCount]);


    return (
        <div className={OwMypageCss.mainPageContent}>
            <div>
                <div className={OwMypageCss.leftArea}>
                    <div className={OwMypageCss.leftAreaTop}>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>예약현황</div>
                                <div onClick={() => navigate("/owner/rentals")}>+ 더보기</div>
                            </div>
                            <div>
                                <div>
                                    <div>확정 대기</div>
                                    <div><span>{reservationCounts.waiting}</span>건</div>
                                </div>

                                <div>
                                    <div>확정 완료</div>
                                    <div><span>{reservationCounts.confirmed}</span>건</div>
                                </div>

                                <div>
                                    <div>예약 취소</div>
                                    <div><span>{reservationCounts.canceled}</span>건</div>
                                </div>
                            </div>
                        </div>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>계약만료</div>
                                <div onClick={() => navigate("/owner/rentals")}>+ 더보기</div>
                            </div>
                            <div>
                                <div>
                                    <div>세달전</div>
                                    <div><span>값</span> 건</div>
                                </div>
                                <div>
                                    <div>한달전</div>
                                    <div><span>값</span> 건</div>
                                </div>
                                <div>
                                    <div>일주전</div>
                                    <div><span>값</span> 건</div>
                                </div>
                            </div>
                        </div>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>상품관리</div>
                                <div onClick={() => navigate("/owner/product")}>+ 더보기</div>
                            </div>
                            <div>
                                <div>
                                    <div>판매 중</div>
                                    <div><span>{saleProductNum}</span> 건</div>
                                </div>
                                <div>
                                    <div>판매 중단</div>
                                    <div><span>{stopProductNum}</span> 건</div>
                                </div>
                                <div>
                                    <div>판매 불가</div>
                                    <div><span>{noAbleProductNum}</span> 건</div>
                                </div>
                            </div>
                        </div>
                        <div className={OwMypageCss.divItem}>평균 별점</div>
                    </div>

                    <div className={OwMypageCss.leftAreaBottom}>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>문의</div>
                                <div onClick={() => navigate("/owner/inquiry")}>+ 더보기</div>
                            </div>
                            <div className={OwMypageCss.inquiryItemBox}>
                                {inquiries.length > 0 ? (
                                    inquiries.map((inquiry, index) => (
                                        <>
                                            <div key={inquiry.qnaId || index} className={OwMypageCss.inquiryItem}>
                                                <div>{inquiry.qnaWriteTime.slice(0, 10)}</div>
                                                <div>{inquiry.productName}</div>
                                                <div>{inquiry.userName} 님</div>
                                                <div className={OwMypageCss.answerButton}>
                                                    <div>답변하기</div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <p>문의 내역이 없습니다.</p>
                                )}
                            </div>
                        </div>
                        <div className={OwMypageCss.divItem}>
                            <div>
                                <div>공지사항</div>
                                <div onClick={() => navigate("/owner/notice")}>+ 더보기</div>
                            </div>
                            <div className={OwMypageCss.noticeListBox}>
                                {filteredList.length == 0
                                    ? <div> 공지사항이 없습니다.</div>
                                    :
                                    filteredList.map(notice => (
                                        <>
                                            <div className={OwMypageCss.noticeItem} onClick={() => navigate(`/owner/notice/${notice.noticeNo}`)}>
                                                <div>{notice.noticeTitle}</div>
                                                <div className={OwMypageCss.noticeWriteTime}>{notice.writeTime}</div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={OwMypageCss.rightArea}>
                    <div className={OwMypageCss.divItem}>이번달 매출</div>

                    <div className={OwMypageCss.divItemReview}>
                        리뷰
                        <div className={OwnerReview.scrollableContainer}></div>
                        <div style={{ padding: '5px' }}>
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className={OwnerReview.reviewItem}>
                                        {/* 별점과 작성 날짜 */}
                                        <div className={OwnerReview.reviewHeader}>
                                            <span className={OwnerReview.starRating}>
                                                {'★'.repeat(Math.floor(review.score))}{'☆'.repeat(5 - Math.floor(review.score))}
                                            </span>
                                            <span>{review.reviewWriteTime.slice(0, 16)}</span>
                                        </div>
                                        {/* 상품명, 렌탈 기간, 작성자 이름 */}
                                        <div className={OwnerReview.reviewContent}>
                                            <span style={{ flex: '1', textAlign: 'center', marginLeft: '20%' }}>{review.productName}</span>
                                            <span style={{ flex: '1', textAlign: 'center', marginLeft: '20%' }}>{review.rentalTerm}개월</span>
                                            <span style={{ flex: '1', textAlign: 'center', marginLeft: '20%' }}>{review.userName} 님</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>리뷰 내역이 없습니다.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OwnerMyPage;