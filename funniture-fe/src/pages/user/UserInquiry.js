import { useEffect } from 'react';
import myPageInquiry from './mypageInquiry.module.css';
import { callAllInquiryByMypageAPI } from '../../apis/InquiryAPI';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../component/Pagination';
import { useState } from 'react';

function UserInquiry () {

    // 25-03-08 일단 사용자 마이페이지 문의 불러오고, 스토어에 저장했음!!!
    const user = useSelector(state => state.member);
    console.log('UserInquiry의 user : ' , user);
    const inquiries = useSelector(state => state.member.inquiries);
    console.log('UserInquiry의 inquiries : ' , inquiries);
    const pageInfo = useSelector(state => state.member.pageInfo);
    console.log('UserInquiry의 pageInfo : ' , pageInfo);
    
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리


    // 서버에서 데이터를 불러오는 함수
    const fetchInquiries = async (page) => {
        try {
            await dispatch(callAllInquiryByMypageAPI(user?.user?.memberId, page)); // Redux에 저장됨
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        }
    };

    // 초기 데이터 로드 및 페이지 변경 시 데이터 로드
    useEffect(() => {
        if (user.user.memberId && currentPage > 0) {
            fetchInquiries(currentPage); // 데이터 로드
        }
    }, [user.user.memberId, currentPage]); // 의존성 배열 최소화

    // 페이지 변경 핸들러
    const onPageChange = (pageNum) => {
        if (pageNum !== currentPage) { // 현재 페이지와 다른 경우에만 상태 업데이트
            setCurrentPage(pageNum);
        }
    };   

    return(
        <>
            <div className={myPageInquiry.activeContainer}>
                <div className={myPageInquiry.activeInquiryTitle}>
                    <div>문의 관리</div>
                </div>

                    <div className={myPageInquiry.activeRentalContainer}>
                    <table className={myPageInquiry.activeRentalTable}>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>문의 번호</th>
                                <th style={{ width: "23%" }}>문의 유형</th>
                                <th style={{ width: "20%" }}>등록일</th>
                                <th style={{ width: "10%" }}>상품번호</th>
                                <th style={{ width: "24%" }}>상품명</th>
                                <th style={{ width: "13%" }}>등록 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries?.result?.data?.length > 0 ? (
                                inquiries.result.data.map((inquiry) => (
                                    <tr key={inquiry.inquiryNo}>
                                        <td>{inquiry.inquiryNo}</td>
                                        <td>
                                            {inquiry.qnaType === 1
                                                ? '기간 문의'
                                                : inquiry.qnaType === 2
                                                ? '가격 문의'
                                                : '기타 문의'}
                                        </td>
                                        <td>{inquiry.qnaWriteTime}</td>
                                        <td>{inquiry.productNo}</td>
                                        <td>{inquiry.productName}</td>
                                        <td>답변 대기</td> {/* 모든 상태를 "답변 대기"로 표시 */}
                                    </tr>
                                ))
                            ) : (
                                // 데이터가 없을 경우 표시할 내용
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        등록한 문의내역이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {pageInfo && (
                    <Pagination
                        pageInfo={pageInfo}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        </>
    );
}

export default UserInquiry;