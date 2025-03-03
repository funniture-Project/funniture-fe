import { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import BtnModal from '../../component/BtnModal'; // 모달 컴포넌트 가져오기
import RentalCss from './rental.module.css';
import { callConvertByAdminAPI, callConvertDetailAPI , callConvertApproveAPI , callConvertRejectAPI } from '../../apis/AdminAPI';
import { useSelector } from 'react-redux';
import AdminModal from './adminModal.module.css';

function AdminConvert() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const [activeTab, setActiveTab] = useState(location.pathname); // 기본 활성화 탭 설정

    // 회원 정보 리스트를 저장할 상태
    const [convertList, setConvertList] = useState([]); // 여러 제공자 정보를 저장하는 배열
    const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태
    const [selectedData, setSelectedData] = useState(null); // 선택된 데이터
    const [showSuccessModal, setShowSuccessModal] = useState(false); // 승인 모달

    const [showRejectModal, setShowRejectModal] = useState(false); // 반려 모달
    const [rejectReason, setRejectReason] = useState('');       // 반려 사유 모달
    const [showRejectCompleteModal, setShowRejectCompleteModal] = useState(false); // 반려사유 적고 저장하는 모달

    const ownerData = useSelector(state => state.member.owner); // Redux에서 owner 데이터 가져오기
    // console.log('ownerData', ownerData);

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


    // 모달 열기 핸들러
    const handleOpenModal = async (convert) => {
        try {
            console.log('모달 열기 시도:', convert.memberId);
            const detailData = await callConvertDetailAPI(convert.memberId);
            console.log('받은 상세 데이터:', detailData);
            if (detailData) {
                setSelectedData(detailData);
                setShowModal(true);
            } else {
                throw new Error('상세 데이터가 없습니다.');
            }
        } catch (error) {
            console.error("상세 정보 로딩 실패:", error);
            alert("상세 정보를 불러오는데 실패했습니다.");
        }
    };
    
    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setShowModal(false);
        setShowRejectModal(false);
        setSelectedData(null);
      };

    // 승인 눌렀을 때 제공자 전환 로직
    const handleSuccess = async () => {
        try {
            await callConvertApproveAPI(selectedData.memberId);
            setShowSuccessModal(true);
            handleCloseModal();
            // 승인 후 즉시 목록 갱신
            await callConvertByAdminAPI(setConvertList);
        } catch (error) {
            console.error('승인 처리 중 오류 발생:', error);
            alert('승인 처리 중 오류가 발생했습니다.');
        }
    };
    
    const handleReject = async () => {
        setShowRejectModal(true);
    };
    

    // 반려 사유 적고 저장 눌렀을 때 동작 
    const handleRejectSubmit = async () => {
        try {
            
            await callConvertRejectAPI(selectedData.memberId, rejectReason);
            setShowRejectModal(false);
            setShowRejectCompleteModal(true);
            handleCloseModal();
            // 반려 후 즉시 목록 갱신
            await callConvertByAdminAPI(setConvertList);
        } catch (error) {
            console.error('반려 처리 중 오류 발생:', error);
            alert('반려 처리 중 오류가 발생했습니다.');
        }
    };
    


    const renderConvertModal = () => ({
        left: (
            <div>
                <h3>◎ 첨부 파일 (사업자 등록증)</h3><br/>
                {selectedData?.ownerInfoDTO?.attechmentLink && (
                <div>
                    <embed 
                        src={selectedData.ownerInfoDTO.attechmentLink} 
                        type="application/pdf" 
                        width="100%" 
                        height="500px" 
                    />
                    <br />
                    {/* PDF 파일 클릭 시 새 창에서 열기 */}
                    <a 
                        href={selectedData.ownerInfoDTO.attechmentLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline', marginTop: '10px', display: 'inline-block' }}
                    >
                        (첨부 파일 새 창에서 보기)
                    </a>
                </div>
            )}
            </div>
        ),
        right: (
            <div>
                {selectedData?.ownerInfoDTO && (
                    <>
                        <h3>◎ 제공자 전환 정보</h3><br/>
                        <div className={AdminModal.ownerDiv}>
                        {selectedData.ownerInfoDTO.storeImage && (
                            <div>
                                <strong>▷ 대표 이미지   :</strong><br/>
                                <img src={selectedData.ownerInfoDTO.storeImage} alt="업체 이미지" style={{maxWidth: '100%', height: 'auto'}} />
                            </div>
                        )}
                        
                        <p><strong>▷ 사업자등록번호   :</strong> {selectedData.ownerInfoDTO.storeNo}</p>
                        <p><strong>▷ 업체 이름   :</strong> {selectedData.ownerInfoDTO.storeName}</p>
                        <p><strong>▷ 업체 주소   :</strong> {selectedData.ownerInfoDTO.storeAddress}</p>
                        <p><strong>▷ 계좌 번호   :</strong> {selectedData.ownerInfoDTO.account}</p>
                        <p><strong>▷ 은행 정보   :</strong> {selectedData.ownerInfoDTO.bank}</p>
                        <p><strong>▷ 업체 전화번호   :</strong> {selectedData.ownerInfoDTO.storePhone}</p>
                        </div><br/>
                    </>
                )}
                <h3>◎ 회원 정보</h3><br/>
                <div className={AdminModal.ownerDiv}>
                <p><strong>▷ 회원 번호   :</strong> {selectedData?.memberId}</p>
                <p><strong>▷ 이름   :</strong> {selectedData?.userName}</p>
                <p><strong>▷ 전화번호   :</strong> {selectedData?.phoneNumber}</p>
                <p><strong>▷ 이메일   :</strong> {selectedData?.email}</p>
                <p><strong>▷ 회원가입일   :</strong> {selectedData?.signupDate}</p>
                </div>
            </div>
        )
    });
    

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
                            modalTitle="▶ 제공자 전환 요청"
                            modalContext={renderConvertModal()}
                            btnText="승인"
                            secondBtnText="반려"
                            onSuccess={() => {
                                console.log('승인 처리:', selectedData);
                                handleSuccess();
                            }}
                            onFail={handleReject}
                            onClose={handleCloseModal}
                            modalSize="lg"
                        />
                    )}


                    {showSuccessModal && (
                        <BtnModal
                            showBtnModal={showSuccessModal}
                            setShowBtnModal={setShowSuccessModal}
                            onClose={handleCloseModal}
                            modalTitle="승인 완료"
                            modalContext={
                                <p>제공자 전환이 완료되었습니다.</p>
                            }
                            btnText="확인"
                            onSuccess={() => {
                                setShowSuccessModal(false);
                                // 필요한 경우 여기에 추가 로직 (예: 목록 새로고침)
                            }}
                        />
                    )}

                    {showRejectModal && (
                        <BtnModal
                            showBtnModal={showRejectModal}
                            setShowBtnModal={setShowRejectModal}
                            onClose={handleCloseModal}
                            modalTitle="반려 사유 입력"
                            modalContext={
                                <div>
                                    <p>반려 사유를 입력해주세요:</p>
                                    <textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        style={{ width: '100%', height: '100px' }}
                                    />
                                </div>
                            }
                            btnText="저장"
                            secondBtnText="취소"
                            onSuccess={handleRejectSubmit}
                            onFail={() => setShowRejectModal(false)}
                        />
                    )}


                    {showRejectCompleteModal && (
                        <BtnModal
                            showBtnModal={showRejectCompleteModal}
                            setShowBtnModal={setShowRejectCompleteModal}
                            modalTitle="반려 완료"
                            modalContext={
                                <p>반려 처리가 완료되었습니다.</p>
                            }
                            btnText="확인"
                            onSuccess={() => {
                                setShowRejectCompleteModal(false);
                                // 필요한 경우 여기에 추가 로직
                            }}
                        />
                    )}

            </div>
        </>
    );
}

export default AdminConvert;
