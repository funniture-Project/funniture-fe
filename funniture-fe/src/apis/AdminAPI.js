import api from "./Apis";

// 관리자 페이지의 회원정보 - 사용자 정보 들고오는 애
export const callUserListByAdminAPI = async (page = 1, size = 10) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/userList?page=${page}&size=${size}`;
    const requestURL = `http://localhost:8887/api/v1/admin/userList?page=${page}&size=${size}`;
    try {
        const response = await api.get(requestURL);
        return response.data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
};

// 관리자 페이지에서 전체 탈퇴자 회원 조회 로직
export const callLeaverUserByAdminAPI = async (page = 1, size = 10) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/leaverList?page=${page}&size=${size}`;
    const requestURL = `http://localhost:8887/api/v1/admin/leaverList?page=${page}&size=${size}`;
    try {
        const response = await api.get(requestURL);
        return response.data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error; // 에러를 던져서 호출한 쪽에서 처리할 수 있게 함
    }
}


// 관리자 페이지의 제공자 정보 들고오는 애
export const callOwnerListByAdminAPI = async (page = 1, size = 10) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/ownerList?page=${page}&size=${size}`;
    const requestURL = `http://localhost:8887/api/v1/admin/ownerList?page=${page}&size=${size}`;
    try {
        const response = await api.get(requestURL);


        return response.data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};

// 사용자 → 제공자 전환 요청 데이터 불러오는 로직
export const callConvertByAdminAPI = async (page = 1, size = 10) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/convertApp?page=${page}&size=${size}`;
    const requestURL = `http://localhost:8887/api/v1/admin/convertApp?page=${page}&size=${size}`;
    try {
        const response = await api.get(requestURL);


        // 서버에서 받은 데이터를 userList 상태에 저장
        return response.data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}

// 관리자 페이지에 사용자 → 제공자 데이터에서 클릭 시 모달에 들어갈 데이터 요청 로직
export const callConvertDetailAPI = async (memberId) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/convertApp/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/admin/convertApp/${memberId}`;
    try {
        const response = await api.get(requestURL);
        return response.data.results.result;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
}

// 관리자 페이지에 제공자 데이터에서 클릭 시 모달에 들어갈 데이터 요청 로직 (사진 , 파일)
export const callOwnerDetailAPI = async (memberId) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/ownerDetail/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/admin/ownerDetail/${memberId}`;
    try {
        const response = await api.get(requestURL);
        return response.data.results.result;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
}

// 관리자 페이지에 사용자 → 제공자 모달에서 승인 눌렀을 때 동작하는 로직
export const callConvertApproveAPI = async (memberId) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/approve/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/admin/approve/${memberId}`;
    try {
        const response = await api.put(requestURL);
        return response.data.message;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
}

// 관리자 페이지에 사용자 → 제공자 모달에서 반려 눌렀을 때 동작하는 로직
export const callConvertRejectAPI = async (memberId, rejectReason) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/reject/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/admin/reject/${memberId}`;
    try {
        const response = await api.put(requestURL, { rejectReason });
        return response.data.message;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }

}

// 관리자 페이지 탈퇴자 목록에서 접근 권한 변경을 유저로 승인 했을 때 동작
export const callChangeUserRoleAPI = async (userIds) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/reactivate`
    const requestURL = `http://localhost:8887/api/v1/admin/reactivate`
    try {
        const response = await api.post(requestURL, userIds);


    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}

// 관리자 페이지 사용자 목록에서 접근 권한 변경을 탈퇴자로 승인 했을 때 동작
export const callChangeLimitRoleAPI = async (userIds) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/deactivate`
    const requestURL = `http://localhost:8887/api/v1/admin/deactivate`
    try {
        const response = await api.post(requestURL, userIds);
        return response;

    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        return error;
    }
}

// 관리자 페이지에서 사용자 포인트 수정하는 구문
export const callUserPointUpdateAPI = async (memberId, newPoint) => {
    // const requestURL = `http://localhost:8080/api/v1/admin/updatePoint`;
    const requestURL = `http://localhost:8887/api/v1/admin/updatePoint`;
    try {
        const response = await api.post(requestURL, { memberId, newPoint });
        if (response && response.data.httpStatusCode === 201) {
            return response
        };
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
}