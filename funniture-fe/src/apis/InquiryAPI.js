import api from "./Apis";

// 상세 페이지 문의 불러오기
export const callInquiryByProductNoAPI = (productNo) => {
    const requestURL = `http://localhost:8080/api/v1/inquiry/product/${productNo}`;

    return async (dispatch) => {
        const response = await api.get(requestURL);
        console.log('productNo로 문의 조회 서버에 잘 다녀 왔나 response : ', response);
        return response;
    };
};

export const callInquiryInsertByProductNoAPI = (productNo) => {
    const requestURL = `http://localhost:8080/api/v1/inquiry/product/${productNo}`;

    return async (dispatch) => {
        const response = await api.get(requestURL);
        console.log('productNo로 문의 조회 서버에 잘 다녀 왔나 response : ', response);
        return response;
    };
};
