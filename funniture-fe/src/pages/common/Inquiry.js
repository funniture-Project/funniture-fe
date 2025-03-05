import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callInquiryByProductNoAPI } from "../../apis/InquiryAPI";
import InquiryCss from './inquiryProduct.module.css';
import InquiryDiv from '../../pages/admin/rental.module.css'

function Inquiry({ productInfo }) {
    const dispatch = useDispatch();
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        if (!productInfo?.productNo) return;

        const fetchData = async () => {
            try {
                const response = await dispatch(callInquiryByProductNoAPI(productInfo.productNo));
                console.log("문의 데이터:", response);

                if (response.data?.results?.map) {
                    setInquiries(response.data.results.map);
                }
            } catch (error) {
                console.error("문의 데이터 가져오기 실패:", error);
            }
        };

        fetchData();
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

    const inquiryWriteHandler = () => {
        // callInquiryInsertByProductNoAPI();
    }

    return (
        <div className={InquiryDiv.adminRentalContent}>
            <div className={InquiryCss.inquiryBox}>
                <button className={InquiryCss.inquiryWriteButton}
                    onClick={inquiryWriteHandler}>문의 작성</button>

                <h3>상품 문의 <span style={{color:'blue'}}>({inquiries.length})</span></h3> 
                
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
                                        {new Date(inquiry.qnaWriteTime).toLocaleDateString()}
                                    </span>
                                    <span className={InquiryCss.answerCount}>답변 {inquiry.answerCount || 0}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Inquiry;
