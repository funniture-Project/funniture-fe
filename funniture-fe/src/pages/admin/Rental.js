import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import { getAdminRentalList } from '../../apis/RentalAPI';
import { getStoreList } from '../../apis/RentalAPI';
import { getAdminRentalListWithCriteria } from '../../apis/RentalAPI'
import Pagination from '../../component/Pagination';

function Rental() {

    const [searchRental, setSearchRental] = useState({
        rentalState: '',
        storeName: '',
        categoryName: '',
        searchDate: '',
        rentalNo: ''
    });

    const [rentalList, setRentalList] = useState([]); // 예약
    const [storeList, setStoreList] = useState([]); // selected-> option 에 추가할 회사
    const [expandedRow, setExpandedRow] = useState(null); // 사용자, 제공자정보 보여 줄 행 관리

    // 예약 리스트
    useEffect(() => {
        async function fetchData() {
            const data = await getAdminRentalList();
            setRentalList(data.results.adminRentalList);
        }
        fetchData();
    }, []);

    // 회사 리스트
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getStoreList();
                setStoreList(data.results?.result || []);
                console.log('storeList:', data.results?.result);
            } catch (error) {
                console.error("API 호출 실패:", error);
                setStoreList([]);
            }
        }
        fetchData();
    }, []);

    // 검색 조건 변경 핸들러 (Select, Input 공통)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchRental((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 검색 실행 (버튼 클릭 시 실행)
    const handleSearch = async () => {
        try {
            // 최신 검색 조건을 기반으로 필터링된 데이터 가져오기
            const response = await getAdminRentalListWithCriteria(searchRental);

            // API 호출 후 결과 처리
            if (response && response.results && response.results.adminRentalList) {
                setRentalList(response.results.adminRentalList); // 검색 결과 상태에 저장
            } else {
                setRentalList([]); // 결과가 없을 경우 빈 리스트
            }
        } catch (error) {
            console.error("검색 실패:", error);
            setRentalList([]); // 오류 발생 시 빈 리스트로 설정
        }
    };

    // 초기화 실행 
    const handleReset = async () => {
        setSearchRental({
            rentalState: '',
            storeName: '',
            categoryName: '',
            searchDate: '',
            rentalNo: ''
        });

        try {
            // 전체 예약 리스트 다시 불러오기
            const data = await getAdminRentalList();
            setRentalList(data.results.adminRentalList);
        } catch (error) {
            console.error("초기화 후 전체 조회 실패:", error);
            setRentalList([]); // 오류 발생 시 리스트 초기화
        }
    };


    return (
        <>
            <AdminTop title={'예약 정보'} />

            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <div className={RentalCss.searchReset}>
                        <img
                            src={require(`../../assets/icon/rotate-right-solid.svg`).default}
                            alt="초기화 아이콘"
                            onClick={handleReset}
                        />
                    </div>

                    <div className={RentalCss.rentalSearch}>
                        <select name="rentalState" value={searchRental.rentalState} onChange={handleChange}>
                            <option value='' selected>진행상태 선택</option>
                            <option value="예약대기">예약대기</option>
                            <option value="예약완료">예약완료</option>
                            <option value="예약취소">예약취소</option>
                            <option value="배송중">배송중</option>
                            <option value="배송완료">배송완료</option>
                            <option value="반납요청">반납요청</option>
                            <option value="수거중">수거중</option>
                            <option value="반납완료">반납완료</option>
                        </select>

                        <select name="storeName" value={searchRental.storeName} onChange={handleChange}>
                            <option value='' selected>회사선택</option>
                            {storeList.map((store) => (
                                <option key={store.owner_no} value={store.store_name}>
                                    {store.store_name}
                                </option>
                            ))}
                        </select>

                        <select name="categoryName" value={searchRental.categoryName} onChange={handleChange}>
                            <option value='' selected>분류 선택</option>
                            <option value="가전">가전</option>
                            <option value="가구">가구</option>
                        </select>

                        <input type="date" name="searchDate" value={searchRental.searchDate} onChange={handleChange} />

                        <input type="text" name="rentalNo" value={searchRental.rentalNo} placeholder="주문번호를 검색하세요"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // 엔터 입력 시 폼 제출 방지
                                    handleSearch(); // 검색 실행
                                }
                            }}
                        />

                        <img
                            src={require(`../../assets/icon/search-icon.svg`).default}
                            alt="검색 아이콘"
                            onClick={handleSearch}
                        />
                    </div>
                </div>

                <div className={RentalCss.rentalBox}>
                    <div className={RentalCss.rentalSubBox}>
                        <div className={RentalCss.title}>
                            <div style={{ width: "15%" }}><p>주문번호</p></div>
                            <div style={{ width: "10%" }}><p>회사명</p></div>
                            <div style={{ width: "10%" }}><p>진행상태</p></div>
                            <div style={{ width: "5%" }}><p>분류</p></div>
                            <div style={{ width: "35%" }}><p>제품명</p></div>
                            <div style={{ width: "20%" }}><p>사용시작/만료날짜</p></div>
                            <div style={{ width: "5%" }}><p>수량</p></div>
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

                    <Pagination />
                </div>
            </div>
        </>
    )
}

export default Rental;