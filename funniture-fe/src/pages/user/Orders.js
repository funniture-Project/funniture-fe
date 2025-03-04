import OrdersCss from './orders.module.css';
import { useState, useEffect } from 'react';
import { getUserOrderList } from '../../apis/RentalAPI';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Pagination from '../../component/Pagination';

function Orders() {

    // 사용자 꺼내오기
    const { user } = useSelector(state => state.member)
    const { memberId } = user

    const [orderList, setOrderList] = useState([]); // 사용자별 주문 리스트
    const [searchOrder, setSearchOrder] = useState({
        period: 'ALL',     // period=1MONTH, 3MONTH
        searchDate: ''  // searchDate=2025-02-06
    });
    
    // 페이징 상태 관리
    const [pageInfo, setPageInfo] = useState(null);  // pageInfo 상태 추가
    const [pageNum, setPageNum] = useState(1);  // pageNum 상태 관리 


    async function getData(memberId, period, pageNum) {
        try {
            const data = await getUserOrderList(memberId, period, pageNum);
            const orders = data.results.userOrderList;
            const pageInfo = data.results.pageInfo;
            setOrderList(orders);
            setPageInfo(pageInfo);

        } catch (error) {
            console.error('Error fetching order list:', error);
        }
    }

    // 페이지 변경 시 데이터 가져오기
    const handlePageChange = (newPageNum) => {
        setPageNum(newPageNum);  // pageNum 변경
    };


    // 검색 조건 변경 시 데이터 다시 불러오기
    useEffect(() => {
        getData(memberId, searchOrder.period, pageNum);
    }, [memberId, searchOrder, pageNum]);

 
    // 기간 선택 핸들러
    const handleChange = (period) => {
        setSearchOrder((prev) => ({
            ...prev,
            period: period
        }));
    };


    return (
        <div className={OrdersCss.ordersContainer}>
            <div className={OrdersCss.orderPageTitle}>주문/배송</div>
            <div className={OrdersCss.rentalPeriodSelector}>
                <div
                    onClick={() => handleChange('ALL')}
                    className={searchOrder.period === 'ALL' ? OrdersCss.selected : ''}
                >
                    전체
                </div>
                <div
                    onClick={() => handleChange('1MONTH')}
                    className={searchOrder.period === '1MONTH' ? OrdersCss.selected : ''}
                >
                    1개월
                </div>
                <div
                    onClick={() => handleChange('3MONTH')}
                    className={searchOrder.period === '3MONTH' ? OrdersCss.selected : ''}
                >
                    3개월
                </div>
                <div>직접선택</div>
            </div>
            <div className={OrdersCss.orderListContainer}>

                {/* 테이블 데이터 */}
                {orderList.length === 0 ? (
                    <div>
                        <p>검색 조건에 맞는 예약 내역이 없습니다.</p>
                    </div>
                ) : (
                    orderList.map((item) => (
                        <>
                            <div className={OrdersCss.orderListItem}>
                                <div className={OrdersCss.status}>
                                    <div>
                                        {item.rentalState}
                                    </div>
                                </div>
                                <div className={OrdersCss.statusAndProductImgBox}>
                                    <div className={OrdersCss.productImg}>
                                        <img src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지 입니다" />
                                    </div>
                                    <div className={OrdersCss.ordersInfo}>
                                        <div>주문번호 : {item.rentalNo}</div>
                                        <div>{item.orderDate} 결제</div>
                                        <div>상품명 : {item.productName}</div>
                                        <div>{item.rentalPrice} 원</div>
                                        <div>
                                            <Link to={`/mypage/orders/${item.rentalNo}`} className={OrdersCss.link}>주문상세 &gt;</Link>
                                        </div>
                                    </div>
                                    <div className={OrdersCss.inquiryButton}>
                                        <div>문의하기</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                )
                }
            </div>

            {/* 페이징 컴포넌트 가져오기 */}
            <div className={OrdersCss.pagingContainer}>
                <div>
                    <Pagination 
                    pageInfo={pageInfo} 
                    onPageChange={handlePageChange} 
                    />
                </div>
            </div>
        </div>

    );

}

export default Orders