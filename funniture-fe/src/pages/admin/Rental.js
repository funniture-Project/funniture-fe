import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import {getAdminRentalList} from '../../apis/RentalAPI';

function Rental() {

    const [rentalList, setRentalList] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getAdminRentalList();
            setRentalList(data.results.adminRentalList);
            console.log(data.results.adminRentalList);
        }
        fetchData();
      }, []);

    return (
        <>
            <AdminTop title={'예약 정보'} />

            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <select name="rentalState">
                        <option value="" selected>진행상태 선택</option>
                        <option value="예약대기">예약대기</option>
                        <option value="예약완료">예약완료</option>
                        <option value="예약취소">예약취소</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                        <option value="반납요청">반납요청</option>
                        <option value="수거중">수거중</option>
                        <option value="반납완료">반납완료</option>
                    </select>
                    <select name="storeName">
                        <option>회사선택</option>
                    </select>
                    <select name="categoryName">
                        <option value="" selected>분류 선택</option>
                        <option value="가전">가전</option>
                        <option value="가구">가구</option>
                    </select>
                    <input type="date"/>
                    <div>
                        <input type="text" placeholder='주문번호를 검색하세요'/>
                        <img src={require(`../../assets/icon/search-icon.svg`).default} alt="검색 아이콘" />
                    </div>
                </div>

                <div className={RentalCss.rentalBox}>
                    <div className={RentalCss.rentalSubBox}>
                        <div className={RentalCss.title}>
                            <div style={{width: "15%"}}><p>주문번호</p></div>
                            <div style={{width: "10%"}}><p>회사명</p></div>
                            <div style={{width: "10%"}}><p>진행상태</p></div>
                            <div style={{width: "5%"}}><p>분류</p></div>
                            <div style={{width: "35%"}}><p>제품명</p></div>
                            <div style={{width: "20%"}}><p>사용시작/만료날짜</p></div>
                            <div style={{width: "5%"}}><p>수량</p></div>
                        </div>

                        {/* 테이블 데이터 */}
                        {rentalList.map((item) => (
                            <>
                                {/* 기본 행 */}
                                <div
                                    key={item.rentalNo}
                                    className={RentalCss.rentalItems}
                                >
                                    <div style={{ width: '15%' }}><p>{item.rentalNo}</p></div>
                                    <div style={{ width: '10%' }}><p>{item.storeName}</p></div>
                                    <div style={{ width: '10%' }}><p>{item.rentalState}</p></div>
                                    <div style={{ width: '5%' }}><p>{item.categoryName}</p></div>
                                    <div style={{ width: '35%' }}><p>{item.productName}</p></div>
                                    <div style={{ width: '20%' }}>
                                        <p>{`${item.rentalStartDate} ~ ${item.rentalEndDate}`}</p>
                                    </div>
                                    <div style={{ width: '5%' }}><p>{item.rentalNumber}</p></div>
                                </div>
                            </>
                        ))}
                    </div>
                    
                    <div className={RentalCss.pagination}>
                        <img src={require(`../../assets/icon/angles-left-solid.svg`).default} alt="페이지 맨앞으로 가는 아이콘"/>
                        <img src={require(`../../assets/icon/angle-left-solid.svg`).default} alt="페이지 이전 아이콘"/>
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                        <img src={require(`../../assets/icon/angle-right-solid.svg`).default} alt="페이지 다음 아이콘"/>
                        <img src={require(`../../assets/icon/angles-right-solid.svg`).default} alt="페이지 맨뒤로 가는 아이콘"/>
                    </div>
                </div>
            </div>
        </>
    )   
}

export default Rental;