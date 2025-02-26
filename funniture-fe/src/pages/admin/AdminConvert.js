import './adminUser.module.css'
import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import Pagination from '../../component/Pagination';
import { callConvertByAdminAPI } from '../../apis/AdminAPI';
import { useNavigate } from 'react-router-dom';

function AdminConvert() {

    const navigate = useNavigate();

    // 회원 정보 리스트를 저장할 상태
    const [convertList, setConvertList] = useState([]); // 여러 제공자 정보를 저장하는 배열

    useEffect(() => {
        console.log('관리자 페이지, 제공자 useEffect 실행');
        callConvertByAdminAPI(setConvertList);
    }, []);


    return (
        <>
            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <div className={RentalCss.searchReset}></div>
                </div>
                    <div className="adminSelectButton">
                    <button onClick={()=>{navigate('/admin/authority/user')}} className="active">사용자</button>
                        <button onClick={()=>{navigate('/admin/authority/owner')}}>제공자</button>
                        <button onClick={()=>{navigate('/admin/authority/convert')}}>전환요청</button>
                        <button onClick={()=>{navigate('/admin/authority/leaver')}}>탈퇴자</button>
                        <button>접근권한변경</button>
                    </div>
                    <div className={RentalCss.rentalBox}>
                        <div className={RentalCss.rentalSubBox}>
                            {/* 테이블 헤더 */}
                            <div className={RentalCss.title}>
                                <div style={{ width: "15%" }}><p>회원번호</p></div>
                                <div style={{ width: "10%" }}><p>이름</p></div>
                                <div style={{ width: "20%" }}><p>전화번호</p></div>
                                <div style={{ width: "15%" }}><p>이메일</p></div>
                                <div style={{ width: "27%" }}><p>회원가입일</p></div>
                                <div style={{ width: "13%" }}><p>포인트</p></div>
                            </div>

                            {/* 테이블 데이터 */}
                            {convertList.length === 0 ? (
                                // 데이터가 없을 경우 표시할 메시지
                                <div className={RentalCss.noResultsMessage}>
                                    <p>검색 조건에 맞는 회원 정보가 없습니다.</p>
                                </div>
                            ) : (
                                // 데이터가 있을 경우 렌더링
                                convertList.map((convert) => (
                                    <div key={convertList.memberId} className={RentalCss.rentalItems}>
                                        <div style={{ width: '15%' }}><p>{convert.memberId}</p></div>
                                        <div style={{ width: '10%' }}><p>{convert.userName}</p></div>
                                        <div style={{ width: '20%' }}><p>{convert.phoneNumber}</p></div>
                                        <div style={{ width: '15%' }}><p>{convert.email}</p></div>
                                        <div style={{ width: '27%' }}><p>{convert.signupDate}</p></div>
                                        <div style={{ width: '13%' }}><p>{convert.pointDTO.currentPoint}</p></div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 페이지네이션 컴포넌트 */}
                        <Pagination />
                    </div>
            </div>
        </>
    )
}

export default AdminConvert;