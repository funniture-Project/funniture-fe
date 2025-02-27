import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import { callUserListByAdminAPI } from '../../apis/AdminAPI'
import Pagination from '../../component/Pagination';
import { useNavigate } from 'react-router-dom';

function AdminUser() {

    const navigate = useNavigate();

    // 회원 정보 리스트를 저장할 상태
    const [userList, setUserList] = useState([]); // 여러 회원 정보를 저장하는 배열

    useEffect(() => {
        callUserListByAdminAPI(setUserList);
    }, []);

    return (
        <>
            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <div className={RentalCss.searchReset}></div>
                </div>
                    {/* <div className="adminSelectButton"> */}
                    <div className={RentalCss.adminSelectButton}>
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
                            {userList.length === 0 ? (
                                // 데이터가 없을 경우 표시할 메시지
                                <div className={RentalCss.noResultsMessage}>
                                    <p>검색 조건에 맞는 회원 정보가 없습니다.</p>
                                </div>
                            ) : (
                                // 데이터가 있을 경우 렌더링
                                userList.map((user) => (
                                    <div key={user.memberId} className={RentalCss.rentalItems}>
                                        <div style={{ width: '15%' }}><p>{user.memberId}</p></div>
                                        <div style={{ width: '10%' }}><p>{user.userName}</p></div>
                                        <div style={{ width: '20%' }}><p>{user.phoneNumber}</p></div>
                                        <div style={{ width: '15%' }}><p>{user.email}</p></div>
                                        <div style={{ width: '27%' }}><p>{user.signupDate}</p></div>
                                        <div style={{ width: '13%' }}><p>{user.pointDTO.currentPoint}</p></div>
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

export default AdminUser;