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

// 관리자 페이지의 제공자 정보 들고오는 애
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

// 사용자 → 제공자 전환 요청 데이터 불러오는 로직
export const callConvertByAdminAPI = async (setConvertList) => {
    const requestURL = `http://localhost:8080/api/v1/admin/convertApp`;
    try {
        const response = await api.get(requestURL);

        console.log('관리자 페이지 전환 요청 데이터 요청 서버에 잘 다녀왔나? response : ', response);

        // 서버에서 받은 데이터를 userList 상태에 저장
        if (response.data) {
            setConvertList(response.data.results.result);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}

// 관리자 페이지에 모달에 들어갈 데이터 (수정해야 함)
export const callConvertAppAPI = async () => {
    const requestURL = `http://localhost:8080/api/v1/admin/convertApp/modal`;

    try {
        const response = await api.get(requestURL); // 서버에서 이메일 중복 여부 확인
        
        console.log('관리자 페이지 모달 표시될 전환 요청 데이터 요청 서버에 잘 다녀왔나? response : ', response);

    } catch (error) {
        console.error('Error checking email:', error);
        return true; // 에러 발생 시 기본적으로 중복 처리 (보수적으로 처리)
    }
};


export const callLeaverUserByAdminAPI = async (setLeaverUserList) => {
    const requestURL = `http://localhost:8080/api/v1/admin/leaverList`
    try {
        const response = await api.get(requestURL);

        console.log('관리자 페이지 전체 탈퇴자 정보 요청 서버에 잘 다녀왔나? response : ', response);

        // 서버에서 받은 데이터를 userList 상태에 저장
        if (response.data) {
            setLeaverUserList(response.data.results.result);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}

// 관리자 페이지 탈퇴자 목록에서 접근 권한 변경을 유저로 승인 했을 때 동작
export const callChangeUserRoleAPI = async (userIds) => {
    const requestURL = `http://localhost:8080/api/v1/admin/reactivate`
    try {
        const response = await api.post(requestURL, userIds );

        console.log('관리자 페이지 탈퇴자를 유저로 변경 요청 서버에 잘 다녀왔나? response : ', response);

    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
}

export const callChangeLimitRoleAPI = async (userIds) => {
    const requestURL = `http://localhost:8080/api/v1/admin/deactivate`
    try {
        const response = await api.post(requestURL, userIds );

        console.log('관리자 페이지 유저를 탈퇴자로 변경 요청 서버에 잘 다녀왔나? response : ', response);

    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }   
}
