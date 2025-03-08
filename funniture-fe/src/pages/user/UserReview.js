import Pagination from "../../component/Pagination";
import myPageReview from "./mypagereview.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAllReviewByMypageAPI } from "../../apis/ReviewAPI";
import defaultImage from "../../assets/images/default.jpg";

function UserReview() {
    const user = useSelector((state) => state.member);
    const reviews = useSelector((state) => state.member.reviews);
    console.log('reviews : ' , reviews);
    const pageInfo = useSelector((state) => state.member.pageInfo);
    console.log('pageInfo : ' , pageInfo);

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // 서버에서 데이터를 불러오는 함수
    const fetchReviews = async (page) => {
        try {
            await dispatch(callAllReviewByMypageAPI(user?.user?.memberId, page));
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
        }
    };

    // 초기 데이터 로드 및 페이지 변경 시 데이터 로드
    useEffect(() => {
        if (user.user.memberId && currentPage > 0) {
            fetchReviews(currentPage);
        }
    }, [user.user.memberId, currentPage]);

    // 페이지 변경 핸들러
    const onPageChange = (pageNum) => {
        if (pageNum !== currentPage) {
            setCurrentPage(pageNum);
        }
    };

    return (
        <>
            <div className={myPageReview.activeContainer}>
                <div className={myPageReview.activeInquiryTitle}>
                    <div>리뷰 관리</div>
                </div>

                <div className={myPageReview.reviewListContainer}>
                    {reviews?.result?.data && reviews.result.data.length > 0 ? (
                        reviews.result.data.map((review, index) => (
                            <div key={index} className={myPageReview.reviewCard}>
                                <img
                                    src={
                                        review.productImageLink?.includes("cloudinary.com")
                                            ? review.productImageLink
                                            : defaultImage // import한 기본 이미지 사용
                                    }
                                    alt="상품 이미지"
                                    className={myPageReview.productImage}
                                />
                                <div className={myPageReview.reviewContent}>
                                    <h3 className={myPageReview.productName}>
                                        {review.productName}
                                    </h3>
                                    <div className={myPageReview.reviewScore}>
                                        {"★".repeat(Math.round(review.score))}{" "}
                                        {review.score.toFixed(1)}
                                    </div>
                                    <p className={myPageReview.reviewText}>
                                        {review.reviewContent}
                                    </p>
                                </div>
                                <div className={myPageReview.actionButtons}>
                                    <button className={myPageReview.repurchaseButton}>재구매</button>
                                    <button className={myPageReview.deleteButton}>삭제</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>작성된 리뷰가 없습니다.</p>
                    )}
                </div>


                {/* Pagination Component */}
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

export default UserReview;
