import Pagination from "../../component/Pagination";
import myPageReview from "./mypagereview.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callWritableReviewsAPI, callWrittenReviewsAPI } from "../../apis/ReviewAPI";
import defaultImage from "../../assets/images/default.jpg";

function UserReview() {
    const user = useSelector((state) => state.member.user);
    const writableReviews = useSelector((state) => state.member.writableReviews?.result?.data || []);
    console.log('UserReview 컴포넌트 writableReviews : ', writableReviews);
    const writtenReviews = useSelector((state) => state.member.writtenReviews?.result?.data || []);
    console.log('UserReview 컴포넌트 : writtenReviews', writtenReviews);
    const writablePageInfo = useSelector((state) => state.member?.writablePageInfo);
    console.log('UserReview 컴포넌트 : writablePageInfo', writablePageInfo);
    const writtenPageInfo = useSelector((state) => state.member?.writtenPageInfo);
    console.log('UserReview 컴포넌트 : writtenPageInfo', writtenPageInfo);

    const dispatch = useDispatch();
    const [currentWritablePage, setCurrentWritablePage] = useState(1);
    const [currentWrittenPage, setCurrentWrittenPage] = useState(1);
    const [activeTab, setActiveTab] = useState("writable"); // "writable" or "written"

    // 작성 가능한 리뷰 데이터 로드
    useEffect(() => {
        if (user?.memberId && currentWritablePage > 0) {
            dispatch(callWritableReviewsAPI(user.memberId, currentWritablePage));
        }
    }, [user?.memberId, currentWritablePage]);

    // 작성한 리뷰 데이터 로드
    useEffect(() => {
        if (user?.memberId && currentWrittenPage > 0) {
            dispatch(callWrittenReviewsAPI(user.memberId, currentWrittenPage));
        }
    }, [user?.memberId, currentWrittenPage]);

    // 페이지 변경 핸들러
    const onWritablePageChange = (pageNum) => setCurrentWritablePage(pageNum);
    const onWrittenPageChange = (pageNum) => setCurrentWrittenPage(pageNum);

    return (
        <>
            <div className={myPageReview.activeContainer}>
                {/* 제목 */}
                <div className={myPageReview.activeInquiryTitle}>
                    <div>리뷰 관리</div>
                </div>

                {/* 탭 버튼 */}
                <div className={myPageReview.tabContainer}>
                    <button
                        className={`${myPageReview.tabButton} ${activeTab === "writable" ? myPageReview.activeTab : ""}`}
                        onClick={() => setActiveTab("writable")}
                    >
                        작성 가능한 리뷰 ({writableReviews?.length || 0})
                    </button>
                    <button
                        className={`${myPageReview.tabButton} ${activeTab === "written" ? myPageReview.activeTab : ""}`}
                        onClick={() => setActiveTab("written")}
                    >
                        작성한 리뷰 ({writtenReviews?.length || 0})
                    </button>
                </div>

                {/* 탭 내용 */}
                <div className={myPageReview.reviewListContainer}>
                    {activeTab === "writable" && writableReviews?.length > 0 ? (
                        writableReviews.map((review, index) => (
                            <div key={index} className={myPageReview.reviewCard}>
                                <img
                                    src={
                                        review.productImageLink?.includes("cloudinary.com")
                                            ? review.productImageLink
                                            : defaultImage
                                    }
                                    alt="상품 이미지"
                                    className={myPageReview.productImage}
                                />
                                <div className={myPageReview.reviewContent}>
                                    <p>{new Date(review.orderDate).toLocaleDateString()} 결제</p>
                                    <h3>{review.productName}</h3>
                                    <p>{review.rentalTerm}개월</p>
                                    <p>{review.rentalPrice}원</p>
                                </div>
                                <div className={myPageReview.actionButtons}>
                                    <button className={myPageReview.writeButton}>리뷰작성</button>
                                    <button className={myPageReview.repurchaseButton}>재구매</button>
                                    <button className={myPageReview.deleteButton}>삭제</button>
                                </div>
                            </div>
                        ))
                    ) : activeTab === "writable" ? (
                        <p>작성 가능한 리뷰가 없습니다.</p>
                    ) : writtenReviews?.length > 0 ? (
                        writtenReviews.map((review, index) => (
                            <div key={index} className={myPageReview.reviewCard}>
                                <img
                                    src={
                                        review.productImageLink?.includes("cloudinary.com")
                                            ? review.productImageLink
                                            : defaultImage
                                    }
                                    alt="상품 이미지"
                                    className={myPageReview.productImage}
                                />
                                <div className={myPageReview.reviewContent}>
                                    <h3>{review.productName}</h3>
                                    <div className={myPageReview.reviewScore}>
                                        {"★".repeat(Math.round(review.score))}{" "}
                                        {review.score.toFixed(1)}
                                    </div>
                                    <p>{review.reviewContent}</p>
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
                {activeTab === "writable" && writablePageInfo && (
                    <Pagination pageInfo={writablePageInfo} onPageChange={onWritablePageChange} />
                )}
                {activeTab === "written" && writtenPageInfo && (
                    <Pagination pageInfo={writtenPageInfo} onPageChange={onWrittenPageChange} />
                )}
            </div>
        </>
    );
}

export default UserReview;
