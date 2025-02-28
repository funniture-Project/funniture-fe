import { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import BtnModal from '../../component/BtnModal'; // 모달 컴포넌트 가져오기
import RentalCss from './rental.module.css';
import { callConvertByAdminAPI, callConvertAppAPI} from '../../apis/AdminAPI';
import { useSelector } from 'react-redux';

function AdminConvert() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const [activeTab, setActiveTab] = useState(location.pathname); // 기본 활성화 탭 설정

    // 회원 정보 리스트를 저장할 상태
    const [convertList, setConvertList] = useState([]); // 여러 제공자 정보를 저장하는 배열
    const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태
    const [selectedData, setSelectedData] = useState(null); // 선택된 데이터

    const ownerData = useSelector(state => state.member.owner); // Redux에서 owner 데이터 가져오기
    console.log('ownerData', ownerData);

    useEffect(() => {
        setActiveTab(location.pathname); // URL 변경 시 activeTab 동기화
    }, [location.pathname]);

    const handleTabClick = (path) => {
        navigate(path); // 경로 이동
    };
    
    useEffect(() => {
        console.log('관리자 페이지, 제공자 전환 요청 목록 가져오기');
        callConvertByAdminAPI(setConvertList);
    }, []);

    // 모달에 띄울 거 이거부터 하기 25-02-28
    // useEffect(() => {
    //     console.log('callOwnerListByAdminAPI 동작');
    //     callConvertAppAPI();
    // });

    // 모달 열기 핸들러
    const handleOpenModal = () => {
        setSelectedData(ownerData); // 선택된 데이터를 저장 (Redux에서 가져온 데이터)
        setShowModal(true); // 모달 열기
    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedData(null); // 선택 데이터 초기화
    };


    return (
        <>
            <div className={RentalCss.adminRentalContent}>
                <div className={RentalCss.rentalSearchBox}>
                    <div className={RentalCss.searchReset}></div>
                </div>
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
                        <button style={{display:'none'}}>접근권한변경</button>
                    </div>  
                <div className={RentalCss.rentalBox}>
                    <div className={RentalCss.rentalSubBox}>
                        {/* 테이블 헤더 */}
                        <div className={RentalCss.title}>
                            <div style={{ width: "15%" }}><p>회원번호</p></div>
                            <div style={{ width: "10%" }}><p>이름</p></div>
                            <div style={{ width: "23%" }}><p>전화번호</p></div>
                            <div style={{ width: "18%" }}><p>이메일</p></div>
                            <div style={{ width: "30%" }}><p>회원가입일</p></div>
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
                                <div
                                    key={convert.memberId}
                                    className={RentalCss.rentalItems}
                                    onClick={() => handleOpenModal(convert)} // 클릭 시 모달 열기
                                >
                                    <div style={{ width: '15%' }}><p>{convert.memberId}</p></div>
                                    <div style={{ width: '10%' }}><p>{convert.userName}</p></div>
                                    <div style={{ width: '23%' }}><p>{convert.phoneNumber}</p></div>
                                    <div style={{ width: '18%' }}><p>{convert.email}</p></div>
                                    <div style={{ width: '30%' }}><p>{convert.signupDate}</p></div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 페이지네이션 컴포넌트 */}
                    {/* Pagination 컴포넌트를 유지 */}
                </div>

                {/* 모달 컴포넌트 */}
                {showModal && selectedData && (
                    <BtnModal
                        showBtnModal={showModal}
                        setShowBtnModal={setShowModal}
                        modalTitle="제공자 전환 요청"
                        modalContext={
                            <>
                                <p><strong>회원 번호:</strong> {selectedData.memberId}</p>
                                <p><strong>작성자:</strong> {selectedData.userName}</p>
                                <p><strong>전화번호:</strong> {selectedData.phoneNumber}</p>
                                <p><strong>이메일:</strong> {selectedData.email}</p>
                                <p><strong>회원가입일:</strong> {selectedData.signupDate}</p>
                                {/* 첨부파일 링크 */}
                                {selectedData.attachmentLink && (
                                    <>
                                        <strong>첨부파일:</strong>{' '}
                                        <a href={selectedData.attachmentLink} target="_blank" rel="noopener noreferrer">
                                            첨부파일 보기
                                        </a>
                                    </>
                                )}
                            </>
                        }
                        btnText="승인"
                        secondBtnText="반려"
                        onSuccess={() => {
                            console.log('승인 처리:', selectedData);
                            handleCloseModal();
                        }}
                        onFail={() => {
                            console.log('반려 처리:', selectedData);
                            handleCloseModal();
                        }}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    );
}

export default AdminConvert;
