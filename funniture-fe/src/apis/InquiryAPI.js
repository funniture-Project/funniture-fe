import api from "./Apis";

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
export const callInquiryByOwnerNoAPI = async (ownerNo) => {
    if (!ownerNo) {
        console.error('Invalid ownerNo');
        return;
    }
    console.log('ownerNo 잘 넘어 오는지 ', ownerNo);
    const requestURL = `http://localhost:8080/api/v1/inquiry/owner/${ownerNo}`;

    try {
        const response = await api.get(requestURL);
        console.log('ownerNo로 제공자 페이지 문의 조회 서버에 잘 다녀 왔나 response : ', response);
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

