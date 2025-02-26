import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import { getAdminRentalList } from '../../apis/RentalAPI';
import { getStoreList } from '../../apis/RentalAPI';
import { callUserListByAdminAPI } from '../../apis/AdminAPI'
import Pagination from '../../component/Pagination';

function AdminUser() {

    const [form, setForm] = useState({
        memberId: '',
        userName: '',
        phoneNumber: '',
        email: '',
        signupDate: '',
        point: ''
    });

    useEffect(() => {
        console.log('관리자 페이지 useEffect 실행');
        callUserListByAdminAPI();
    }, []);

    // 예약 리스트
    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await getAdminRentalList();
    //         setRentalList(data.results.adminRentalList);
    //     }
    //     fetchData();
    // }, []);

    // // 회사 리스트
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await getStoreList();
    //             setStoreList(data.results?.result || []);
    //             console.log('storeList:', data.results?.result);
    //         } catch (error) {
    //             console.error("API 호출 실패:", error);
    //             setStoreList([]);
    //         }
    //     }
    //     fetchData();
    // }, []);

    // 검색 조건 변경 핸들러 (Select, Input 공통)
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSearchRental((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // 검색 실행 (버튼 클릭 시 실행)
    // const handleSearch = async () => {
    //     try {
    //         // 최신 검색 조건을 기반으로 필터링된 데이터 가져오기
    //         const response = await getAdminRentalListWithCriteria(searchRental);

    //         // API 호출 후 결과 처리
    //         if (response && response.results && response.results.adminRentalList) {
    //             setRentalList(response.results.adminRentalList); // 검색 결과 상태에 저장
    //         } else {
    //             setRentalList([]); // 결과가 없을 경우 빈 리스트
    //         }
    //     } catch (error) {
    //         console.error("검색 실패:", error);
    //         setRentalList([]); // 오류 발생 시 빈 리스트로 설정
    //     }
    // };

    // 초기화 실행 
    const handleReset = async () => {
        // setSearchRental({
        //     rentalState: '',
        //     storeName: '',
        //     categoryName: '',
        //     searchDate: '',
        //     rentalNo: ''
        // });

        // try {
        //     // 전체 예약 리스트 다시 불러오기
        //     const data = await getAdminRentalList();
        //     setRentalList(data.results.adminRentalList);
        // } catch (error) {
        //     console.error("초기화 후 전체 조회 실패:", error);
        //     setRentalList([]); // 오류 발생 시 리스트 초기화
        // }
    };


    return (
        <>

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

                        {/* <select name="storeName" value={searchRental.storeName} onChange={handleChange}>
                            <option value='' selected>회사선택</option>
                            {storeList.map((store) => (
                                <option key={store.owner_no} value={store.store_name}>
                                    {store.store_name}
                                </option>
                            ))}
                        </select> */}
{/* 
                        <select name="categoryName" value={searchRental.categoryName} onChange={handleChange}>
                            <option value='' selected>분류 선택</option>
                            <option value="가전">가전</option>
                            <option value="가구">가구</option>
                        </select> */}

                        {/* <input type="date" name="searchDate" value={searchRental.searchDate} onChange={handleChange} />

                        <input type="text" name="rentalNo" value={searchRental.rentalNo} placeholder="주문번호를 검색하세요"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // 엔터 입력 시 폼 제출 방지
                                    handleSearch(); // 검색 실행
                                }
                            }}
                        /> */}

                        <img
                            src={require(`../../assets/icon/search-icon.svg`).default}
                            alt="검색 아이콘"
                            // onClick={handleSearch}
                        />
                    </div>
                </div>

                <div className={RentalCss.rentalBox}>
                    <div className={RentalCss.rentalSubBox}>
                        <div className={RentalCss.title}>
                            <div style={{ width: "15%" }}><p>회원번호</p></div>
                            <div style={{ width: "10%" }}><p>이름</p></div>
                            <div style={{ width: "10%" }}><p>전화번호</p></div>
                            <div style={{ width: "5%" }}><p>이메일</p></div>
                            <div style={{ width: "35%" }}><p>회원가입일</p></div>
                            <div style={{ width: "20%" }}><p>포인트</p></div>
                            {/* <div style={{ width: "5%" }}><p>수량</p></div> */}
                        </div>

                        {/* 테이블 데이터 */}
                        {/* {rentalList.length === 0 ? (
                                <div className={RentalCss.noResultsMessage}>
                                    <p>검색 조건에 맞는 예약 내역이 없습니다.</p>
                                </div>
                            ) : (
                                rentalList.map((item) => ( */}
                                    <>
                                        {/* 기본 행 */}
                                        <div
                                            // key={item.rentalNo}
                                            className={RentalCss.rentalItems}
                                        >
                                            <div style={{ width: '15%' }}><p>{form.memberId}</p></div>
                                            <div style={{ width: '10%' }}><p>{form.userName}</p></div>
                                            <div style={{ width: '10%' }}><p>{form.phoneNumber}</p></div>
                                            <div style={{ width: '5%' }}><p>{form.email}</p></div>
                                            <div style={{ width: '35%' }}><p>{form.signupDate}</p></div>
                                            <div style={{ width: '20%' }}><p>{form.point}</p></div>
                                        </div>
                                    </>
                                {/* ))
                            )
                        } */}
                    </div>

                    <Pagination />
                </div>
            </div>
        </>
    )
}

export default AdminUser;