import OwnerInquiryCSS from './ownerInquiry.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { callInquiryByOwnerNoAPI , callInquiryAnswerByOwnerPageAPI } from '../../apis/InquiryAPI';
import BtnModal from '../../component/BtnModal';
import Pagination from '../../component/Pagination';

function OwnerInquiry() {
    const { user } = useSelector(state => state.member);
    const ownerInquiry = useSelector(state => state.owner?.inquiries?.result || []);
    const pageInfo = useSelector(state => state.owner?.pageInfo || null);  // pageInfo 가져오기
    console.log('pageInfo' , pageInfo);
    console.log('ownerInquiry',ownerInquiry);
    const dispatch = useDispatch();

    // 모달 상태 관리
    const [showModal, setShowModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [answerContent, setAnswerContent] = useState(''); // 답변 내용 상태 관리

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리

    const [selectedTab, setSelectedTab] = useState('all'); // 초기값은 'all'

    useEffect(() => {
        if (user && user.memberId) {
            fetchInquiries(currentPage); // 초기 데이터 로드
        }
    }, [user, currentPage]);

    // 서버에서 데이터를 불러오는 함수
    const fetchInquiries = async (page) => {
        setIsLoading(true);
        try {
            await dispatch(callInquiryByOwnerNoAPI(user.memberId, page));  // Redux에 저장됨
            setCurrentPage(page);
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        console.log("Updated pageInfo:", pageInfo);
    }, [pageInfo]);
    

    // "답변 하기" 버튼 클릭 핸들러
    const answerInquiryHandler = (inquiry) => {
        setSelectedInquiry(inquiry); // 선택된 문의 데이터 저장
        setAnswerContent(''); // 답변 내용 초기화
        setShowModal(true); // 모달 열기
    };

    // 등록 버튼 클릭 핸들러
    const handleRegisterAnswer = async () => {
        // if (!answerContent.trim()) {
        //     alert('답변 내용을 입력해주세요.');
        //     return;
        // }

        // try {
        //     const response = await callInquiryAnswerByOwnerPageAPI();

        //     alert('답변이 성공적으로 등록되었습니다.');
        //     setShowModal(false); // 모달 닫기

        //     // 데이터를 다시 불러와 테이블 갱신
        //     fetchInquiries(currentPage);
        // } catch (error) {
        //     console.error('답변 등록 실패:', error);
        //     alert('답변 등록 중 오류가 발생했습니다.');
        // }
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    

    return (
        <div className={OwnerInquiryCSS.wholeContainer}>
            
            <div className={OwnerInquiryCSS.title}>고객문의 관리</div>

            {/* 필터 버튼 */}
            <div className={OwnerInquiryCSS.filterButtons}>
                <button
                    className={`${OwnerInquiryCSS.filterButton} ${selectedTab === 'waiting' ? OwnerInquiryCSS.active : ''}`}
                    onClick={() => handleTabClick('waiting')}
                >
                    대기
                </button>
                <button
                    className={`${OwnerInquiryCSS.filterButton} ${selectedTab === 'complete' ? OwnerInquiryCSS.active : ''}`}
                    onClick={() => handleTabClick('complete')}
                >
                    완료
                </button>
                <button
                    className={`${OwnerInquiryCSS.filterButton} ${selectedTab === 'all' ? OwnerInquiryCSS.active : ''}`}
                    onClick={() => handleTabClick('all')}
                >
                    전체
                </button>
            </div>

            {/* 테이블 */}
            <table className={OwnerInquiryCSS.table}>
                <thead>
                    <tr>
                        <th><input type="checkbox" className={OwnerInquiryCSS.checkbox} /></th>
                        <th>접수일</th>
                        <th>고객명</th>
                        <th>고객번호</th>
                        <th>문의 번호</th>
                        <th>상품 번호</th>
                        <th>상품명</th>
                        <th>문의 내용</th>
                        <th>답변 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerInquiry.data && ownerInquiry.data.length > 0 ? (
                        ownerInquiry.data.filter((inquiry) => {
                            if (selectedTab === 'waiting') {
                                return inquiry.answerStatus !== 'complete';
                            } else if (selectedTab === 'complete') {
                                return inquiry.answerStatus === 'complete';
                            } else { // 'all'
                                return true;
                            }
                        }).length > 0 ? (
                            ownerInquiry.data.filter((inquiry) => {
                                if (selectedTab === 'waiting') {
                                    return inquiry.answerStatus !== 'complete';
                                } else if (selectedTab === 'complete') {
                                    return inquiry.answerStatus === 'complete';
                                } else { // 'all'
                                    return true;
                                }
                            }).map((inquiry, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" className={OwnerInquiryCSS.checkbox} /></td>
                                    <td>{inquiry.qnaWriteTime}</td>
                                    <td>{inquiry.userName}</td>
                                    <td>{inquiry.memberId}</td>
                                    <td>{inquiry.inquiryNo}</td>
                                    <td>{inquiry.productNo}</td>
                                    <td>{inquiry.productName}</td>
                                    <td>{inquiry.inquiryContent}</td>
                                    {/* 답변 여부 버튼 */}
                                    <td>
                                        {inquiry.answerStatus === 'complete' ? (
                                            <button className={`${OwnerInquiryCSS.answerButton} ${OwnerInquiryCSS.complete}`}>
                                                답변 완료
                                            </button>
                                        ) : (
                                            <button
                                                className={OwnerInquiryCSS.answerButton}
                                                onClick={() => answerInquiryHandler(inquiry)}
                                            >
                                                답변 하기
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>
                                    데이터가 없습니다.
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination 컴포넌트 사용 */}
            {pageInfo && (
                <Pagination style={{marginLeft:'35% !important'}}
                    pageInfo={pageInfo} 
                    onPageChange={(pageNum) => {
                        setCurrentPage(pageNum); // 현재 페이지 상태 업데이트
                        fetchInquiries(pageNum); // 데이터 로드
                    }} 
                />
            )}

            {/* 모달 컴포넌트 */}
            {showModal && selectedInquiry && (
                <BtnModal
                    showBtnModal={showModal}
                    setShowBtnModal={setShowModal}
                    modalTitle="문의의 답변하기"
                    modalSize="md"
                    btnText="등록"
                    secondBtnText="취소"
                    childContent={
                        <>
                            {/* 모달 내부 데이터 표시 */}
                            <div><strong>상품명:</strong> {selectedInquiry.productName}</div>
                            <div><strong>회원 번호:</strong> {selectedInquiry.memberId}</div>
                            <div><strong>작성자:</strong> {selectedInquiry.userName}</div>
                            <div><strong>휴대전화:</strong> {selectedInquiry.phoneNumber}</div>
                            <div><strong>등록일:</strong> {selectedInquiry.qnaWriteTime}</div>

                            {/* Q&A 유형 표시 */}
                            <div><strong>Q&A 유형:</strong> 
                                {selectedInquiry.qnaType === 1 ? '기간 문의' :
                                 selectedInquiry.qnaType === 2 ? '가격 문의' :
                                 '기타 문의'}
                            </div>

                            {/* 답변 입력 필드 */}
                            <textarea
                                placeholder="여기에 답변을 입력하세요."
                                value={answerContent}
                                onChange={(e) => setAnswerContent(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    marginTop: '10px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                }}
                            />
                        </>
                    }
                    onSuccess={handleRegisterAnswer} // 등록 버튼 클릭 시 실행
                    onFail={() => {
                        console.log("답변 등록 취소");
                        setShowModal(false); // 모달 닫기
                    }}
                />
            )}
        </div>
    );
}

export default OwnerInquiry;
