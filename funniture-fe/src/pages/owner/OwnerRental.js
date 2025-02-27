import OwnerRentalCSS from './ownerRental.module.css'
import Pagination from '../../component/Pagination';
import { useState, useEffect } from 'react';
import {getOwnerRentalList} from '../../apis/RentalAPI';

function OwnerRental() {

    const [rentalList, setRentalList] = useState([]);   // 제공자별 예약 리스트
    const [period , setPeriod ] = useState(''); // 1WEEK, 1MONTH, 3MONTH 만료기간별 필터링
    const [rentalTab, setRentalTab] = useState(''); // 예약, 배송, 반납 탭별 필터링
    const [rentalStateFilter, setRentalStateFilter] = useState(''); // 예약 상태 필터링

    // 페이징 상태 관리
    const [pageInfo, setPageInfo] = useState(null);  // pageInfo 상태 추가
    const [pageNum, setPageNum] = useState(1);  // pageNum 상태 관리 

    async function getData(ownerNo, period, rentalTab, pageNum) {
        try {
            const data = await getOwnerRentalList(ownerNo, period, rentalTab, pageNum);
            const rentals = data.results.ownerRentalList;
            const pageInfo = data.results.pageInfo;
            setRentalList(rentals);
            setPageInfo(pageInfo);
          
        } catch (error) {
            console.error('Error fetching rentals list:', error);
            setRentalList([]);
        }
    }

    // 페이지 변경 시 데이터 가져오기
    const handlePageChange = (newPageNum) => {

        setPageNum(newPageNum);  // pageNum 변경
    };

     // 검색 조건 변경 시 데이터 다시 불러오기
     useEffect(() => {
        getData("MEM001", period, rentalTab, pageNum);
    }, [pageNum, period, rentalTab]);  // pageInfo 제거하고, period, rentalTab, pageNum만 의존성으로 설정

    // 기간 선택 핸들러
    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    // 탭 선택 핸들러
    const handleTabChange = (rentalTab) => {
        setRentalTab(rentalTab);
        setRentalStateFilter('');
    }

    // 상태 필터링 핸들러
    const handleStatusChange = (e) => {
        setRentalStateFilter(e.target.value);
    };

    // 예약진행상태로 필터링
    const filteredRentalList = rentalList.filter((rental) => {
        if (rentalStateFilter) {
            return rental.rentalState === rentalStateFilter;
        }
        return true; // 필터가 없으면 전체 렌탈 리스트 반환
    });


    // 예약진행상태마다 스타일 다르게 적용하기 위해서
    const getStatusClass = (status) => {

        switch (status) {
          case "예약대기":
            return "statusPending";
          case "예약완료":
            return "statusConfirmed";
          case "예약취소":
            return "statusCanceled";
          case "배송중":
            return "statusDelivering";
          case "배송완료":
            return "statusDelivered";
          case "반납요청":
            return "statusReturnRequested";
          case "수거중":
            return "statusCollecting";
          case "반납완료":
            return "statusReturned";
          default:
            return "statusDefault";
        }
      };

    return(
        <div className={OwnerRentalCSS.container}>
            <div className={OwnerRentalCSS.ownerRentalTab}>
                <div
                    onClick={() => handleTabChange('')}
                    className={rentalTab === '' ? OwnerRentalCSS.selected : ''}
                >
                    전체
                </div>
                <div
                    onClick={() => handleTabChange('예약')}
                    className={rentalTab === '예약' ? OwnerRentalCSS.selected : ''}
                >
                    예약
                </div>
                <div
                    onClick={() => handleTabChange('배송')}
                    className={rentalTab === '배송' ? OwnerRentalCSS.selected : ''}
                >
                    배송
                </div>
                <div
                    onClick={() => handleTabChange('반납')}
                    className={rentalTab === '반납' ? OwnerRentalCSS.selected : ''}
                >
                    반납
                </div>
            </div>
            <div className={OwnerRentalCSS.periodContainer}>
                <div>계약만료기간</div>
                <div onClick={() => handlePeriodChange('')}
                     className={period === '' ? OwnerRentalCSS.selected : ''}>전체</div>
                <div onClick={() => handlePeriodChange('1WEEK')}
                     className={period === '1WEEK' ? OwnerRentalCSS.selected : ''}>1주일</div>
                <div onClick={() => handlePeriodChange('1MONTH')}
                     className={period === '1MONTH' ? OwnerRentalCSS.selected : ''}>1개월</div>
                <div onClick={() => handlePeriodChange('3MONTH')}
                     className={period === '3MONTH' ? OwnerRentalCSS.selected : ''}>3개월</div>
            </div>
            <div className={OwnerRentalCSS.rentalContainer}>
                <table className={OwnerRentalCSS.rentalTable}>
                    <thead>
                        <tr>
                            <th style={{width : "2%"}}></th>
                            <th style={{width : "11%"}}>주문번호</th>
                            <th style={{width : "10%"}}>택배사</th>
                            <th style={{width : "10%"}}>운송장번호</th>
                            <th style={{width : "20%"}}>상품명</th>
                            <th style={{width : "4%"}}>수량</th>
                            <th style={{width : "7%"}}>약정기간</th>
                            <th style={{width : "7%"}}>A/S 횟수</th>
                            <th style={{width : "19%"}}>사용 날짜 / 만료 날짜</th>
                            <th style={{width : "10%"}}>
                                <select 
                                    onChange={handleStatusChange} 
                                    value={rentalStateFilter} 
                                    className={OwnerRentalCSS.statusSelect}
                                >
                                    {rentalTab == "예약" ? (
                                        <>
                                            <option value="">예약진행상태</option>
                                            <option value="예약대기">예약대기</option>
                                            <option value="예약완료">예약완료</option>
                                            <option value="예약취소">예약취소</option>
                                        </>
                                    ) : rentalTab == "배송" ? (
                                        <>
                                            <option value="">배송진행상태</option>
                                            <option value="배송중">배송중</option>
                                            <option value="배송완료">배송완료</option>
                                        </>
                                    ) : rentalTab == "반납" ? (
                                        <>
                                            <option value="">반납진행상태</option>
                                        <option value="반납요청">반납요청</option>
                                            <option value="수거중">수거중</option>
                                            <option value="반납완료">반납완료</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="">예약진행상태</option>
                                            <option value="예약대기">예약대기</option>
                                            <option value="예약완료">예약완료</option>
                                            <option value="예약취소">예약취소</option>
                                            <option value="배송중">배송중</option>
                                            <option value="배송완료">배송완료</option>
                                            <option value="반납요청">반납요청</option>
                                            <option value="수거중">수거중</option>
                                            <option value="반납완료">반납완료</option>
                                        </>
                                    )}
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredRentalList.length > 0 ? (
                            filteredRentalList.map((rental, index) => (
                            <tr key={rental.rentalNo || index}>
                                <td><input type="checkbox" className={OwnerRentalCSS.rowCheckbox} /></td>
                                <td>{rental.rentalNo}</td>
                                <td>{rental.deliverCom || '-'}</td>
                                <td>{rental.deliveryNo || '-'}</td>
                                <td>{rental.productName}</td>
                                <td>{rental.rentalNumber}</td>
                                <td>{rental.rentalTerm}일</td>
                                <td>{rental.asNumber}회</td>
                                <td>
                                    {rental.rentalStartDate && rental.rentalEndDate
                                        ? `${rental.rentalStartDate} ~ ${rental.rentalEndDate}`
                                        : '배송대기중'}
                                </td>
                                <td>
                                    <div className={`${OwnerRentalCSS[getStatusClass(rental.rentalState)]}`}>
                                        {rental.rentalState}
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
            <div className={OwnerRentalCSS.pagingContainer}>
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

export default OwnerRental;