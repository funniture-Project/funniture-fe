import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callInquiryByProductNoAPI, callInquiryRegistByProductNoAPI } from "../../apis/InquiryAPI";
import InquiryCss from './inquiryProduct.module.css';
import InquiryDiv from '../../pages/admin/rental.module.css';
import BtnModal from "../../component/BtnModal";

function Inquiry({ productInfo }) {
    const member = useSelector((state) => state.member);
    const dispatch = useDispatch();
    const [inquiries, setInquiries] = useState([]);
    const [showBtnModal, setShowBtnModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // 문의 등록 완료 모달 상태
    
    console.log('문의 컴포넌트 productInfo : ' , productInfo);

    const [formData, setFormData] = useState({
        qnaType: "",
        inquiryContent: "",
        userName: "",
        phoneNumber: "",
        showStatus: false,
    });
    

    // 문의 데이터 가져오기
    const fetchInquiries = async () => {
        try {
            const response = await dispatch(callInquiryByProductNoAPI(productInfo.productNo));
            console.log("문의 데이터:", response);

            if (response.results?.map) {
                // 문의 리스트 설정
                setInquiries(response.results.map);
            }
        } catch (error) {
            console.error("문의 데이터 가져오기 실패:", error);
        }
    };

    useEffect(() => {
        if (!productInfo?.productNo) return;
        fetchInquiries();
    }, [dispatch, productInfo]);

    // qnaType에 따른 카테고리 텍스트 변환 함수
    const getCategoryText = (qnaType) => {
        switch (qnaType) {
            case 1: return "기간 문의";
            case 2: return "가격 문의";
            case 3: return "기타 문의";
            default: return "알 수 없음";
        }
    };

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // 문의 등록 API 호출 핸들러
    const handleInquirySubmit = async () => {
        try {
            console.log("등록할 데이터:", formData);

            // 서버로 전달할 데이터 생성
            const dataToSend = { 
                ...formData, 
                productNo: productInfo.productNo,
                showStatus: formData.showStatus ? 0 : 1 // 비공개 여부 처리
            };

            await dispatch(callInquiryRegistByProductNoAPI(dataToSend, member.user.memberId));
            
            // 성공 모달창 띄우기
            setShowSuccessModal(true);

            // 문의 리스트 다시 가져오기
            fetchInquiries();

            // 폼 초기화 및 모달 닫기
            setFormData({
                qnaType: "",
                inquiryContent: "",
                userName: "",
                phoneNumber: "",
                showStatus: false,
            });
            setShowBtnModal(false);
        } catch (error) {
            console.error("문의 등록 실패:", error);
        }
    };

    // 이미지 URL 결정 함수
    const getImageLink = (imageLink) => {
        if (!imageLink || imageLink === "default.jpg" || imageLink === "a.jpg") {
            return "/static/media/default.f2f7b9633b83b275df5d.jpg"; // 기본 이미지 경로
        }
        return imageLink;
    };

    return (
        <div className={InquiryDiv.adminRentalContent}>
            <div className={InquiryCss.inquiryBox}>
                <button className={InquiryCss.inquiryWriteButton}
                    onClick={() => setShowBtnModal(true)}>문의 작성</button>

                <h3>상품 문의 <span style={{ color: 'blue' }}>({inquiries.length})</span></h3>

                {/* 문의 리스트 */}
                <div className={InquiryCss.inquiryList}>
                    {inquiries.length === 0 ? (
                        <p>문의 내역이 없습니다.</p>
                    ) : (
                        inquiries.map((inquiry) => (
                            <div key={inquiry.inquiryNo} className={InquiryCss.inquiryItem}>
                                <div className={InquiryCss.inquiryHeader}>
                                    {inquiry.showStatus === 0 ? (
                                        <span>🔒 비밀글입니다.</span>
                                    ) : (
                                        <span>{inquiry.inquiryContent}</span>
                                    )}
                                </div>
                                <div className={InquiryCss.inquiryMeta}>
                                    <span>
                                        {getCategoryText(inquiry.qnaType)} | 
                                        {inquiry.userName ? inquiry.userName : '익명'} | 
                                        {new Date(inquiry.qnaWriteTime).toLocaleString()} {/* 시, 분, 초까지 표시 */}
                                    </span>
                                    <span className={InquiryCss.answerCount}>답변 {inquiry.answerCount || 0}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 대여 문의 작성 모달 */}
            <BtnModal
                showBtnModal={showBtnModal}
                setShowBtnModal={setShowBtnModal}
                btnText="등록"
                secondBtnText="취소"
                modalTitle="대여 문의 작성"
                modalSize="lg"
                modalContext={
                    <>
                        {/* 상품 정보 */}
                        <div className={InquiryCss.productInfo}>
                            <img
                                src={getImageLink(productInfo.ownerInfo?.productImageLink)}
                                alt="상품 이미지"
                                className={InquiryCss.productImage}
                            />
                            <p style={{marginLeft:'3%'}}>{productInfo.productName || "상품 이름이 없습니다."}</p>
                        </div>

                        {/* Q&A 유형 */}
                        <div className={InquiryCss.formGroup}>
                       <br/><label>Q&A 유형</label>
                            <select
                                name="qnaType"
                                value={formData.qnaType}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Q&A 유형을 선택하세요.</option>
                                <option value="1">기간 문의</option>
                                <option value="2">가격 문의</option>
                                <option value="3">기타 문의</option>
                            </select>
                        </div>

                        {/* Q&A 내용 */}
                        <div className={InquiryCss.formGroup}>
                        <br/><label>Q&A 내용</label>
                            <textarea
                                name="inquiryContent"
                                value={formData.inquiryContent}
                                onChange={handleInputChange}
                                placeholder="개인 정보 유출이 우려되니 주소를 남기지 말아 주세요."
                                maxLength="1000"
                                className="form-control"
                            />
                            <small>{formData.inquiryContent.length}/1000</small>
                        </div>

                        {/* 이름 */}
                        <div className={InquiryCss.formGroup}>
                            <label>이 름</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                placeholder="Q&A 작성하시는 분의 이름을 적어 주세요."
                                className="form-control"
                            />
                        </div>

                        {/* 휴대전화 */}
                        <div className={InquiryCss.formGroup}>
                            <label>휴대전화</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="답변 알림을 받으실 전화번호를 적어 주세요."
                                className="form-control"
                            />
                        </div>

                        {/* 비공개 여부 */}
                        <div className={InquiryCss.checkBox}>
                            <input 
                                type="checkbox" 
                                name="showStatus" 
                                checked={formData.showStatus} 
                                onChange={handleInputChange} 
                            />
                            <label> 비공개</label>
                        </div>
                    </>
                }
                onSuccess={() => handleInquirySubmit()}
                onFail={() => setShowBtnModal(false)}
            />

            {/* 문의 등록 완료 모달 */}
            {showSuccessModal && (
                <BtnModal
                    showBtnModal={showSuccessModal}
                    setShowBtnModal={setShowSuccessModal}
                    btnText="확인"
                    modalTitle="문의 등록 완료"
                    modalSize="sm"
                    modalContext={<p>문의가 성공적으로 등록되었습니다!</p>}
                    onSuccess={() => setShowSuccessModal(false)}
                />
            )}
        </div>
    );
}

export default Inquiry;
