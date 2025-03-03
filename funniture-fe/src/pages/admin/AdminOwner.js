import AdminTop from '../../component/adminpage/AdminTop';
import RentalCss from './rental.module.css';
import { useState, useEffect } from 'react';
import Pagination from '../../component/Pagination';
import { callOwnerListByAdminAPI , callOwnerDetailAPI} from '../../apis/AdminAPI';
import { useNavigate , useLocation } from 'react-router-dom';
import BtnModal from '../../component/BtnModal';
import AdminModal from './adminModal.module.css';

function AdminOwner() {

    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기
    const [activeTab, setActiveTab] = useState(location.pathname); // 기본 활성화 탭 설정

    const [showOwnerModal, setShowOwnerModal] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);

    useEffect(() => {
        setActiveTab(location.pathname); // URL 변경 시 activeTab 동기화
    }, [location.pathname]);

    const handleTabClick = (path) => {
        navigate(path); // 경로 이동
    };


    // 회원 정보 리스트를 저장할 상태
    const [ownerList, setOwnerList] = useState([]); // 여러 제공자 정보를 저장하는 배열

    useEffect(() => {
        console.log('관리자 페이지, 제공자 useEffect 실행');
        callOwnerListByAdminAPI(setOwnerList);
    }, []);

    const handleOwnerClick = async (owner) => {
        try {
            const detailData = await callOwnerDetailAPI(owner.memberId);
            setSelectedOwner({
                ...owner,
                ownerInfoDTO: {
                    ...owner.ownerInfoDTO,
                    storeImage: detailData.ownerInfoDTO?.storeImage,
                    attechmentLink: detailData.ownerInfoDTO?.attechmentLink,
                    account: detailData.ownerInfoDTO?.account,
                    bank: detailData.ownerInfoDTO?.bank
                }
            });
            setShowOwnerModal(true);
        } catch (error) {
            console.error("상세 정보 로딩 실패:", error);
            alert("상세 정보를 불러오는데 실패했습니다.");
        }
    };
    
    // const renderOwnerModal = () => (
    //     <div>
    //         <h3>◎ 회원 정보</h3>
    //         <p><strong>- 회원 ID:</strong> {selectedOwner?.memberId}</p>
    //         <p><strong>- 이름:</strong> {selectedOwner?.userName}</p>
    //         <p><strong>- 대표 전화번호:</strong> {selectedOwner?.storePhone}</p>
    //         <p><strong>- 이메일:</strong> {selectedOwner?.email}</p>
    //         <p><strong>- 회원가입일:</strong> {selectedOwner?.signupDate}</p>
            
    //         <h3>◎ 업체 정보</h3>
    //         <p><strong>- 상호명:</strong> {selectedOwner?.storeName}</p>
    //         <p><strong>- 사업자등록번호:</strong> {selectedOwner?.storeNo}</p>
            
    //         {selectedOwner?.ownerInfoDTO?.storeImage && (
    //             <div>
    //                 <strong>- 대표 이미지:</strong><br/>
    //                 <img src={selectedOwner.ownerInfoDTO.storeImage} alt="업체 이미지" style={{maxWidth: '100%', height: 'auto'}} />
    //             </div>
    //         )}
            
    //         {selectedOwner?.ownerInfoDTO?.attechmentLink && (
    //             <div>
    //                 <strong>- 첨부 파일:</strong><br/>
    //                 <embed src={selectedOwner.ownerInfoDTO.attechmentLink} type="application/pdf" width="100%" height="500px" />
    //             </div>
    //         )}
    //     </div>
    // );
    
    const renderOwnerModal = () => ({
        left: (
            <div>
                <h3>◎ 첨부 파일 (사업자 등록증)</h3><br/>
                {selectedOwner?.ownerInfoDTO?.attechmentLink && (
                    <div>
                        <embed 
                            src={selectedOwner.ownerInfoDTO.attechmentLink} 
                            type="application/pdf" 
                            width="100%" 
                            height="500px" 
                        />
                        <br />
                        {/* PDF 파일 클릭 시 새 창에서 열기 */}
                        <a 
                            href={selectedOwner.ownerInfoDTO.attechmentLink} 
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
                <h3>◎ 제공자 업체 정보</h3><br/>
                {selectedOwner?.ownerInfoDTO?.storeImage && (
                    <div className={AdminModal.ownerDiv}>
                        <strong>▷ 대표 이미지   :</strong><br/>
                        <img src={selectedOwner.ownerInfoDTO.storeImage} alt="업체 이미지" style={{maxWidth: '100%', height: 'auto'}} /><br/>
                    </div>
                )}
                <div className={AdminModal.ownerDiv}>
                    <p><strong>▷ 상호명   :</strong> {selectedOwner?.storeName}</p>
                    <p><strong>▷ 사업자등록번호   :</strong> {selectedOwner?.storeNo}</p>
                    <p><strong>▷ 대표 전화번호   :</strong> {selectedOwner?.storePhone}</p>
                    <p><strong>▷ 계좌 번호   :</strong> {selectedOwner?.ownerInfoDTO.account}</p>
                    <p><strong>▷ 은행   :</strong> {selectedOwner?.ownerInfoDTO.bank}</p>
                </div><br/>
                <h3>◎ 회원 정보</h3><br/>
                <div className={AdminModal.ownerDiv}>
                    <p><strong>▷ 회원 ID   :</strong> {selectedOwner?.memberId}</p>
                    <p><strong>▷ 이름   :</strong> {selectedOwner?.userName}</p>
                    <p><strong>▷ 이메일   :</strong> {selectedOwner?.email}</p>
                    <p><strong>▷ 회원가입일   :</strong> {selectedOwner?.signupDate}</p>
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
                                <div style={{ width: "20%" }}><p>대표 전화번호</p></div>
                                <div style={{ width: "15%" }}><p>이메일</p></div>
                                <div style={{ width: "27%" }}><p>회원가입일</p></div>
                                <div style={{ width: "13%" }}><p>상호명</p></div>
                                <div style={{ width: "13%" }}><p>사업자등록번호</p></div>
                            </div>

                            {/* 테이블 데이터 */}
                            {ownerList.length === 0 ? (
                                // 데이터가 없을 경우 표시할 메시지
                                <div className={RentalCss.noResultsMessage}>
                                    <p>검색 조건에 맞는 회원 정보가 없습니다.</p>
                                </div>
                            ) : (
                                // 데이터가 있을 경우 렌더링
                                ownerList.map((owner) => (
                                    <div key={owner.memberId} className={RentalCss.rentalItems} onClick={() => handleOwnerClick(owner)}>
                                        <div style={{ width: '15%' }}><p>{owner.memberId}</p></div>
                                        <div style={{ width: '10%' }}><p>{owner.userName}</p></div>
                                        <div style={{ width: '20%' }}><p>{owner.storePhone}</p></div>
                                        <div style={{ width: '15%' }}><p>{owner.email}</p></div>
                                        <div style={{ width: '27%' }}><p>{owner.signupDate}</p></div>
                                        <div style={{ width: '13%' }}><p>{owner.storeName}</p></div>
                                        <div style={{ width: '13%' }}><p>{owner.storeNo}</p></div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 페이지네이션 컴포넌트 */}
                        <Pagination />
                    </div>
                    {/* <BtnModal
                    showBtnModal={showOwnerModal}
                    setShowBtnModal={setShowOwnerModal}
                    modalTitle="제공자 정보"
                    modalContext={renderOwnerModal()}
                    btnText="확인"
                    onSuccess={() => setShowOwnerModal(false)}
                    /> */}

                    {/* 모달 왼쪽 / 오른쪽 나누기 */}
                    <BtnModal
                    showBtnModal={showOwnerModal}
                    setShowBtnModal={setShowOwnerModal}
                    modalTitle="▶ 제공자 정보"
                    modalContext={renderOwnerModal()}
                    btnText="확인"
                    onSuccess={() => setShowOwnerModal(false)}
                    modalSize="lg"
                    />
            </div>
        </>
    )
}

export default AdminOwner;