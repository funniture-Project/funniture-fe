import OwnerRentalCSS from './ownerRental.module.css'
import Pagination from '../../component/Pagination';
import { useState, useEffect } from 'react';
import {getOwnerRentalList} from '../../apis/RentalAPI';

function OwnerRental() {

    const [rentalList, setRentalList] = useState([]);   // 제공자별 예약 리스트
    const [period , setPeriod ] = useState(''); // 1WEEK, 1MONTH, 3MONTH
    const [rentalTab, setRentalTab] = useState('');


    
    async function getData(ownerNo, period, rentalTab) {
        try {
            const data = await getOwnerRentalList(ownerNo, period, rentalTab);
            const rentals = data.results.ownerRentalList;
            setRentalList(rentals);
            console.log("period", period)

        } catch (error) {
            console.error('Error fetching rentals list:', error);
            setRentalList([]);
        }
    }

    // 검색 조건 변경 시 데이터 다시 불러오기
    useEffect(() => {
        getData("MEM001", period, rentalTab);
    }, [period, rentalTab]);

    // 기간 선택 핸들러
    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    // 탭 선택 핸들러
    const handleTabChange = (rentalTab) => {
        setRentalTab(rentalTab);
    }



    const getStatusClass = (status) => {
        console.log('status', status);

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
                <div
                    onClick={() => handlePeriodChange('')}
                    className={period === '' ? OwnerRentalCSS.selected : ''}
                >
                    전체
                </div>
                <div
                    onClick={() => handlePeriodChange('1WEEK')}
                    className={period === '1WEEK' ? OwnerRentalCSS.selected : ''}
                >
                    1주일
                </div>
                <div
                    onClick={() => handlePeriodChange('1MONTH')}
                    className={period === '1MONTH' ? OwnerRentalCSS.selected : ''}
                >
                    1개월
                </div>
                <div
                    onClick={() => handlePeriodChange('3MONTH')}
                    className={period === '3MONTH' ? OwnerRentalCSS.selected : ''}
                >
                    3개월
                </div>
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
                            <th style={{width : "10%"}}>예약 진행 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rentalList.length > 0 ? (
                        rentalList.map((rental, index) => (
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
            <div className={OwnerRentalCSS.pagingContainer}>
                <div>
                {<Pagination/>}
                </div>
            </div>
        </div>
    );
}

export default OwnerRental;