import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrdersReturnCSS from './ordersReturn.module.css';
import Pagination from '../../component/Pagination';
import { getActiveRentalList } from '../../apis/RentalAPI';

function OrdersReturn() {

    // 사용자 꺼내오기
    const { user } = useSelector(state => state.member)
    const { memberId } = user

    // 페이징 상태 관리
    const [pageInfo, setPageInfo] = useState(null);  // pageInfo 상태 추가
    const [pageNum, setPageNum] = useState(1);  // pageNum 상태 관리 

    // 페이지 변경 핸들러
    const handlePageChange = (newPageNum) => {

        setPageNum(newPageNum);  // pageNum 변경
    };

    // 데이터 관리
    const [activeRentalList, setActiveRentalList] = useState([]);   // 제공자별 예약 리스트

    // 데이터 가져오는 함수
    async function getData(memberId, pageNum) {
        try {
            const data = await getActiveRentalList(memberId, pageNum);
            const rentals = data.results.activeRentalList;
            const pageInfo = data.results.pageInfo;
            setActiveRentalList(rentals);
            setPageInfo(pageInfo);

        } catch (error) {
            console.error('Error fetching rentals list:', error);
            setActiveRentalList([]);
        }
    }

    // 검색 조건 변경 시 데이터 다시 불러오기
    useEffect(() => {
        getData(memberId, pageNum);
    }, [memberId, pageNum]);  // pageInfo 제거하고, period, rentalTab, pageNum만 의존성으로 설정


    return(
        <div className={OrdersReturnCSS.activeContainer}>
            <div className={OrdersReturnCSS.activeRentalTitle}>
                <div>사용상품/반납</div>
            </div>

            <div className={OrdersReturnCSS.activeRentalContainer}>
                <table className={OrdersReturnCSS.activeRentalTable}>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>주문번호</th>
                            <th style={{ width: "24%" }}>상품명</th>
                            <th style={{ width: "5%" }}>수량</th>
                            <th style={{ width: "10%" }}>약정기간</th>
                            <th style={{ width: "8%" }}>A/S</th>
                            <th style={{ width: "28%" }}>사용 날짜 / 만료 날짜</th>
                            <th style={{ width: "15%" }}>반납신청</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeRentalList.length > 0 ? (
                            activeRentalList.map((activeRental, index) => (
                                <tr key={activeRental.rentalNo || index}>                                    
                                    <td>{activeRental.rentalNo}</td>
                                    <td>{activeRental.productName}</td>
                                    <td>{activeRental.rentalNumber}</td>
                                    <td>{activeRental.rentalTerm}개월</td>
                                    <td>{activeRental.asNumber}</td>
                                    <td>{activeRental.rentalStartDate}~{activeRental.rentalEndDate} </td>
                                    <td>
                                        <div>
                                            반납신청
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: "center" }}>예약된 데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* 페이징 컴포넌트 가져오기 */}
            <div className={OrdersReturnCSS.pagingContainer}>
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


export default OrdersReturn