import api from "./Apis";
import { REVIEW_USER } from "../redux/modules/MemberModule";

// 마이 페이지에서 리뷰 데이터 불러오기
export const callAllReviewByMypageAPI = (memberId, page = 1, size = 3) => async (dispatch) => {
    if (!memberId) {
        console.error('Invalid memberId');
        return;
    }
    console.log('memberId 잘 넘어왔나 : ', memberId);
    console.log('page 잘 넘어왔나 : ', page);
    try {
        const response = await api.get(
            `http://localhost:8080/api/v1/review/member/${memberId}?page=${page}&size=${size}`
        );
        console.log('사용자 마이 페이지 전체 리뷰조회 서버에 잘 다녀 왔나 response : ', response);

        // 데이터를 저장
        dispatch({ type: REVIEW_USER, payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        throw error;
    }
};