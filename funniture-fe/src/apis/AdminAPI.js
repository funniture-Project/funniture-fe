import api from "./Apis";

// 관리자 페이지의 회원정보 - 사용자 정보 들고오는 애
export const callUserListByAdminAPI = async () => {
    const requestURL = `http://localhost:8080/api/v1/admin/userList`;
    try {
        const response = await api.get(requestURL);
        console.log('관리자 페이지 전체 회원정보 요청 서버에 잘 다녀왔나? response : ', response);
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};

