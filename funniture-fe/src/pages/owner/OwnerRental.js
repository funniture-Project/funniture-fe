import OwnerRentalCSS from './ownerRental.module.css'
import Pagination from '../../component/Pagination';
function OwnerRental() {
    return(
        <div className={OwnerRentalCSS.container}>
            <div className={OwnerRentalCSS.ownerRentalTab}>
                <div style={{color: "#7F5539"}}>전체</div>
                <div>예약</div>
                <div>배송</div>
                <div>반납</div>
            </div>
            <div className={OwnerRentalCSS.periodContainer}>
                <div>계약만료기간</div>
                <div>1주일</div>
                <div>1개월</div>
                <div>3개월</div>
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
                            <th style={{width : "19%"}}>사용 날짜 ~ 만료 날짜</th>
                            <th style={{width : "10%"}}>예약 진행 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>20250225001</td>
                            <td>CJ대한통운</td>
                            <td>987654321</td>
                            <td>스마트 TV</td>
                            <td>11</td>
                            <td>12개월</td>
                            <td>12회</td>
                            <td>2025-02-01 ~ 2026-02-01</td>
                            <td>배송 중</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="row-checkbox"/></td>
                            <td>789012</td>
                            <td>한진택배</td>
                            <td>654321987</td>
                            <td>의자</td>
                            <td>2</td>
                            <td>6개월</td>
                            <td>1회</td>
                            <td>2025-03-01 ~ 2025-09-01</td>
                            <td>예약 완료</td>
                        </tr>
                        
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