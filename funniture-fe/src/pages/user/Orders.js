import OrdersCss from './orders.module.css';
import { useState, useEffect } from 'react';
import {getUserOrderList} from '../../apis/RentalAPI';
import { Link } from "react-router-dom";

function Orders() {
    
    const [orderList, setOrderList] = useState([]); // 사용자별 주문 리스트
    const [searchOrder, setSearchOrder] = useState({
        period: 'ALL',     // period=1MONTH, 3MONTH
        searchDate: ''  // searchDate=2025-02-06
    });
    const [selectedPeriod, setSelectedPeriod] = useState('ALL'); // 선택된 개월 수

    async function getData(memberId, period) {
        try {
            const data = await getUserOrderList(memberId, period);
            const orders = data.results.orderList;
            setOrderList(orders);
            console.log('orderList', orders);
        } catch (error) {
            console.error('Error fetching order list:', error);
        }
    }

    // 검색 조건 변경 시 데이터 다시 불러오기
    useEffect(() => {
        getData("MEM011", searchOrder.period);
    }, [searchOrder]);

    // 기간 선택 핸들러
    const handleChange = (period) => {
        setSearchOrder((prev) => ({
            ...prev,
            period: period
        }));
        setSelectedPeriod(period);
    };


    return(
        <div className={OrdersCss.ordersContainer}>
            <div className={OrdersCss.orderPageTitle}>주문/배송</div>        
            <div className={OrdersCss.rentalPeriodSelector}>
                <div 
                    onClick={() => handleChange('ALL')} 
                    className={selectedPeriod === 'ALL' ? OrdersCss.selected : ''}
                >
                    전체
                </div>
                <div 
                    onClick={() => handleChange('1MONTH')} 
                    className={selectedPeriod === '1MONTH' ? OrdersCss.selected : ''}
                >
                    1개월
                </div>
                <div 
                    onClick={() => handleChange('3MONTH')} 
                    className={selectedPeriod === '3MONTH' ? OrdersCss.selected : ''}
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
        </div>
        
    );

}

export default Orders