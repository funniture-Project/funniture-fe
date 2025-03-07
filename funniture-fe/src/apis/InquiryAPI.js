import api from "./Apis";
import { INQUIRY_SELECT } from "../redux/modules/OwnerModule";

// 상세 페이지 문의 불러오기
export const callInquiryByProductNoAPI = (productNo) => {
    const requestURL = `http://localhost:8080/api/v1/inquiry/product/${productNo}`;

    return async (dispatch) => {
        const response = await api.get(requestURL);
        console.log('productNo로 문의 조회 서버에 잘 다녀 왔나 response : ', response);

        // 데이터를 명시적으로 반환
        return response.data;
    };
};

// 상세 페이지 문의 불러오기
// export const callInquiryByOwnerNoAPI = (ownerNo) => async (dispatch) => {
//     if (!ownerNo) {
//         console.error('Invalid ownerNo');
//         return;
//     }
//     console.log('ownerNo 잘 넘어 오는지 ', ownerNo);
//     const requestURL = `http://localhost:8080/api/v1/inquiry/owner/${ownerNo}`;

//     try {
//         const response = await api.get(requestURL);
//         console.log('ownerNo로 제공자 페이지 문의 조회 서버에 잘 다녀 왔나 response : ', response);
//         dispatch({ type: INQUIRY_SELECT, payload: response.data });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching inquiries:', error);
//         throw error;
//     }
// };
// 상세 페이지 문의 불러오기
export const callInquiryByOwnerNoAPI = (ownerNo, page = 1, size = 10) => async (dispatch) => {
    if (!ownerNo) {
        console.error('Invalid ownerNo');
        return;
    }
    console.log('ownerNo 잘 넘어 오는지 ', ownerNo);
    console.log('page 잘 넘어 오는지 ', page);

    try {
        const response = await api.get(
            `http://localhost:8080/api/v1/inquiry/owner/${ownerNo}?page=${page}&size=${size}`
        );
        console.log('ownerNo로 제공자 페이지 문의 조회 서버에 잘 다녀 왔나 response : ', response);

        // 데이터를 저장
        dispatch({ type: INQUIRY_SELECT, payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        throw error;
    }
};


// 문의 등록
export const callInquiryRegistByProductNoAPI = (dataToSend, memberId) => {
    const requestURL = `http://localhost:8080/api/v1/inquiry/regist`;

    return async (dispatch) => {
        const response = await api.post(requestURL, { ...dataToSend, memberId });
        console.log('문의 등록 결과 서버에 잘 다녀 왔나 response : ', response);
        return response;
    };
};

// 관리자 페이지에서 문의 답변하기 
// export const callInquiryAnswerByOwnerPageAPI = (inquiryNo) => {
//     const requestURL = `http://localhost:8080/api/v1/inquiry/answer`;

//     return async (dispatch) => {
//         const response = await api.post(requestURL,  {
//             inquiryNo: inquiryNo,
//             answerContent: answerContent,
//             ownerId: memberId,
//         });
//         console.log('문의 답변 결과 서버에 잘 다녀 왔나 response : ', response);
//         return response;
//     };
// };