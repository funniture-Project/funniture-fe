import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import { callUserListByAdminAPI , callChangeLimitRoleAPI} from '../../apis/AdminAPI'
import Pagination from '../../component/Pagination';
import { useNavigate , useLocation } from 'react-router-dom';
import BtnModal from '../../component/BtnModal';

function AdminUser() {

    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const [activeTab, setActiveTab] = useState(location.pathname); // 기본 활성화 탭 설정

    // 회원 정보 리스트를 저장할 상태
    const [userList, setUserList] = useState([]); // 여러 회원 정보를 저장하는 배열
    const [selectedUsers, setSelectedUsers] = useState([]); // 체크박스 관리
    const [showModal, setShowModal] = useState(false); // 접근 권한 변경 누를 때 뜨는 모달 

    useEffect(() => {
        setActiveTab(location.pathname); // URL 변경 시 activeTab 동기화
    }, [location.pathname]);

    const handleTabClick = (path) => {
        navigate(path); // 경로 이동
    };
    useEffect(() => {
        console.log('관리자 페이지, 탈퇴자 useEffect 실행');
        callUserListByAdminAPI(setUserList);
    }, []);

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (memberId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(memberId)) {
                // 이미 선택된 경우 제거
                return prevSelectedUsers.filter((id) => id !== memberId);
            } else {
                // 선택되지 않은 경우 추가
                return [...prevSelectedUsers, memberId];
            }
        });
    };

    const handleAccessChangeClick = () => {
        if (selectedUsers.length === 0) {
            alert('변경할 사용자를 선택해주세요.');
            return;
        }
        setShowModal(true); // 모달 열기
    };

    const handleConfirmAccessChange = async () => {
        try {
            await callChangeLimitRoleAPI(selectedUsers); // 권한 변경 API 호출
            alert('권한이 변경되었습니다.');
    
            // 데이터 갱신
            callUserListByAdminAPI(setUserList);
    
            setSelectedUsers([]); // 선택 초기화
            setShowModal(false);  // 모달 닫기
        } catch (error) {
            console.error(error);
            alert('권한 변경에 실패했습니다.');
        }
    };

    return (
        <>
            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <div className={RentalCss.searchReset}></div>
                </div>
                    {/* <div className="adminSelectButton"> */}
                    <div className={RentalCss.adminSelectButton}>
                        <button
                            onClick={() => handleTabClick('/admin/authority/user')}
                            className={`${RentalCss.button} ${activeTab === '/admin/authority/user' ? RentalCss.active : ''}`}>사용자
                        </button>
                        <button
                            onClick={() => handleTabClick('/admin/authority/owner')}
                            className={`${RentalCss.button} ${activeTab === '/admin/authority/owner' ? RentalCss.active : ''}`}>제공자
                        </button>
                        <button
                            onClick={() => handleTabClick('/admin/authority/convert')}
                            className={`${RentalCss.button} ${activeTab === '/admin/authority/convert' ? RentalCss.active : ''}`}>전환요청
                        </button>
                        <button
                            onClick={() => handleTabClick('/admin/authority/leaver')}
                            className={`${RentalCss.button} ${activeTab === '/admin/authority/leaver' ? RentalCss.active : ''}`}>탈퇴자
                        </button>
                        <button onClick={handleAccessChangeClick}>접근권한변경</button>
                    </div>  
                    <div className={RentalCss.rentalBox}>
                        <div className={RentalCss.rentalSubBox}>
                            {/* 테이블 헤더 */}
                            <div className={RentalCss.title}>
                                <div style={{ width: "3%" }}><input type="checkbox" /></div>
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
                                    <div key={userList.memberId} className={RentalCss.rentalItems}>
                                        <div style={{ width: "3%" }}>
                                            <input type="checkbox"
                                                   checked={selectedUsers.includes(user.memberId)}
                                                   onChange={() => handleCheckboxChange(user.memberId)}/></div>
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
                    <BtnModal
                    showBtnModal={showModal}
                    setShowBtnModal={setShowModal}
                    modalTitle="접근 권한 변경"
                    modalContext="선택된 사용자의 권한을 탈퇴 회원으로 변경하시겠습니까?"
                    btnText="예"
                    secondBtnText="취소"
                    onSuccess={handleConfirmAccessChange}
                    onFail={() => setShowModal(false)}
                    />
            </div>
        </>
    )
}

export default AdminUser;