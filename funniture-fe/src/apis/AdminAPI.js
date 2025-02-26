import api from "./Apis";

// 관리자 페이지의 회원정보 - 사용자 정보 들고오는 애
export const callUserListByAdminAPI = async (setUserList) => {
    const requestURL = `http://localhost:8080/api/v1/admin/userList`;
    try {
        const response = await api.get(requestURL);

        console.log('관리자 페이지 전체 회원정보 요청 서버에 잘 다녀왔나? response : ', response);

        // 서버에서 받은 데이터를 userList 상태에 저장
        if (response.data) {
            setUserList(response.data.results.result);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};

export const callOwnerListByAdminAPI = async (setOwnerList) => {
    const requestURL = `http://localhost:8080/api/v1/admin/ownerList`;
    try {
        const response = await api.get(requestURL);

        console.log('관리자 페이지 전체 오너 정보 요청 서버에 잘 다녀왔나? response : ', response);

        // 서버에서 받은 데이터를 userList 상태에 저장
        if (response.data) {
            setOwnerList(response.data.results.result);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};

export const callLeaverUserByAdminAPI = () => {

}

export const callConvertByAdminAPI = () => {
    
}

