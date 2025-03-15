import { useSelector } from "react-redux";
import { POST_REGISTER, POST_LOGIN, GET_MEMBER, GET_EMAIL, RESET_MEMBER, POST_OWNERDATA, CHANGE_ISCONSULTING } from "../redux/modules/MemberModule";
import api from "./Apis";
import imageApi from "./Apis";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GET_OWNERINFO } from "../redux/modules/OwnerModule";

// 회원 가입
export const callSignupAPI = ({ form }) => {
    // const requestURL = `http://localhost:8080/api/v1/auth/signup`;
    const requestURL = `http://localhost:8887/api/v1/auth/signup`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                email: form.email,
                userName: form.userName,
                password: form.password
            }),
        }).then(res => res.json());

        if (result.status === 200) {
            dispatch({ type: POST_REGISTER, payload: result });
        }
        return result; // 결과를 반환합니다.
    };
};


// 최초 회원 가입 할 때 이메일 입력 시, 중복된 이메일인지 체크하는 API
export const callGetMemberEmailAPI = async (email) => {
    // const requestURL = `http://localhost:8080/api/v1/auth/validation/${email}`;
    const requestURL = `http://localhost:8887/api/v1/auth/validation/${email}`;

    try {
        const response = await api.get(requestURL); // 서버에서 이메일 중복 여부 확인
        const isDuplicate = response.data.results.response; // 서버에서 반환된 값 (true/false)

        return isDuplicate; // true: 중복 이메일 존재, false: 중복 이메일 없음
    } catch (error) {
        console.error('Error checking email:', error);
        return true; // 에러 발생 시 기본적으로 중복 처리 (보수적으로 처리)
    }
};

export async function updateCount(role) {
    const url = "/member/updateCount"

    await api.post(url, { role })
}

// 로그인 할 때 서버에 데이터를 보내고, 토큰 정보를 리턴 받음
export const callLoginAPI = ({ form }) => {
    // const loginURL = `http://localhost:8080/api/v1/auth/login`;
    const loginURL = `http://localhost:8887/api/v1/auth/login`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            }).then((res) => res.json());

            if (result.status === 200) {
                window.localStorage.setItem('accessToken', result.userInfo.accessToken);
                dispatch({ type: POST_LOGIN, payload: result });

                dispatch(callGetMemberAPI(result.userInfo))

                updateCount(result.userInfo.memberRole)

                // 로그인 성공 시 true 반환
                return { success: true, message: result.message };
            } else {

                // 로그인 실패 시 false 반환
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            return { success: false, message: '네트워크 오류' };
        }
    };
};


// 로그인 한 회원의 대한 정보를 불러오는 구문
export const callGetMemberAPI = ({ memberId }) => {
    return async (dispatch) => {
        const result = await api.get(`/member/${memberId}`)

        dispatch({ type: GET_MEMBER, payload: result.data });
    };
};

// 회원 가입 시, 이메일 인증번호 보내는 구문
export const callSendEmailAPI = ({ form }) => {
    return async (dispatch) => {
        const result = await api.post(`/email/${form.email}`, {
            email: form.email
        });

        dispatch({ type: GET_EMAIL, payload: result.data });
        return;
    };
};

export const callCertificationAPI = ({ email, verification }) => {
    return async (dispatch) => {
        try {
            const response = await api.post('/email/verify', { email, verification });
            if (response.data.success) {
                dispatch({ type: 'CERTIFICATION_SUCCESS' });
            }
        } catch (error) {
            console.error('인증 요청 중 오류 발생:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };
};

// 로그인 페이지에서 비밀번호 변경 로직
export const callChangePassAPI = ({ form }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/findPass`
    const requestURL = `http://localhost:8887/api/v1/member/findPass`

    return async (dispatch, getState) => {
        const result = api.post(requestURL, {
            email: form.email,
            password: form.password
        })
        alert('비밀번호 변경이 완료되었습니다.');
    }

}

// 사용자 개인 정보 변경 전, 비밀번호 검증 로직
export const callConfirmPassword = (memberId, password) => {
    // const requestURL = `http://localhost:8080/api/v1/member/conform`;
    const requestURL = `http://localhost:8887/api/v1/member/conform`;

    return async (dispatch, getState) => {
        try {
            const response = await api.post(requestURL, { memberId, password });

            // 응답 데이터의 status 값을 기반으로 성공/실패 판단
            if (response.data.httpStatusCode === 200) {
                return true; // 인증 성공
            } else if (response.data.httpStatusCode === 404) {
                console.log('인증 실패');
                return false; // 인증 실패
            }
        } catch (error) {
            // 네트워크 오류 또는 기타 예외 처리
            console.error('비밀번호 확인 요청 중 오류 발생:', error);
            alert('서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
            return false;
        }
    };
};

// 전화번호 바꾸는 로직
export const callChangePhoneAPI = ({ memberId, phoneNumber }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/modify/phone`;
    const requestURL = `http://localhost:8887/api/v1/member/modify/phone`;

    return async (dispatch, getState) => {
        const response = await api.put(requestURL, {
            memberId: memberId,
            phoneNumber: phoneNumber
        });

        if (response.data.httpStatusCode === 201) {
        } else if (response.data.httpStatusCode === 404) {
            console.log('전화번호 변경 실패');
        }
    };
};

export const callChangePasswordAPI = ({ memberId, password }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/modify/password`;
    const requestURL = `http://localhost:8887/api/v1/member/modify/password`;

    return async (dispatch, getState) => {
        const response = await api.put(requestURL, {
            memberId: memberId,
            password: password
        })

        if (response.data.httpStatusCode === 201) {
            return;
        } else if (response.data.httpStatusCode === 404) {
            console.log('전화번호 변경 실패');
            return;
        }
    }
}

export const callChangeAddressAPI = ({ memberId, address }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/modify/address`;
    const requestURL = `http://localhost:8887/api/v1/member/modify/address`;

    return async (dispatch, getState) => {
        const response = await api.put(requestURL, {
            memberId: memberId,
            address: address
        })

        if (response.data.httpStatusCode === 201) {
            return;
        } else if (response.data.httpStatusCode === 404) {
            console.log('주소 변경 실패')
            return;
        }
    };
}

// 마이페이지에서 이미지 변경 요청
export const callChangeImageAPI = ({ memberId, imageLink }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/modify/imageLink`;
    const requestURL = `http://localhost:8887/api/v1/member/modify/imageLink`;

    return async (dispatch, getState) => {
        const formData = new FormData();

        // JSON 데이터 생성 (객체 형식으로 만들어 줘야 함!!)
        const memberData = {
            memberId: memberId, // 문자열 데이터
        };

        // FormData에 JSON 데이터 추가
        formData.append(
            "formData",
            new Blob([JSON.stringify(memberData)], { type: "application/json" })
        );

        // FormData에 파일 추가 (파일 객체 그대로 추가)
        formData.append("imageLink", imageLink);

        try {
            const response = await api.put(requestURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.httpStatusCode === 201) {
            } else if (response.data.httpStatusCode === 400) {
                console.log('프로필 사진 변경 실패');
                alert('프로필 사진 변경에 실패했습니다.');
            } else {
                console.error('예상치 못한 상태 코드:', response.data.httpStatusCode);
                alert('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('프로필 사진 변경 중 오류 발생: ', error);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }

    };
};

// 탈퇴하기 눌렀을 때 동작하는 애 
export const callWithdrawAPI = ({ memberId }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/withdraw/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/member/withdraw/${memberId}`;

    return async () => {
        const response = await api.put(requestURL)

    };
}

export const callConvertImageAPI = ({ memberId, storeImage }) => {
    // const requestURL = `http://localhost:8080/api/v1/member/modify/imageLink`;
    const requestURL = `http://localhost:8887/api/v1/member/modify/imageLink`;

    return async (dispatch, getState) => {
        const formData = new FormData();

        // JSON 데이터 생성 (객체 형식으로 만들어 줘야 함!!)
        const memberData = {
            memberId: memberId, // 문자열 데이터
        };

        // FormData에 JSON 데이터 추가
        formData.append(
            "formData",
            new Blob([JSON.stringify(memberData)], { type: "application/json" })
        );

        // FormData에 파일 추가 (파일 객체 그대로 추가)
        formData.append("storeImage", storeImage);

        try {
            const response = await api.put(requestURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (response.data.httpStatusCode === 201) {
            } else if (response.data.httpStatusCode === 400) {
                alert('프로필 사진 변경에 실패했습니다.');
            } else {
                console.error('예상치 못한 상태 코드:', response.data.httpStatusCode);
                alert('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('프로필 사진 변경 중 오류 발생: ', error);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }

    };
};

export const callRegisterOwnerAPI = ({
    memberId,
    storeName,
    bank,
    account,
    storeImage,
    storeNo,
    storeAddress,
    storePhone,
    attachmentFile
}) => {
    // const requestURL = `http://localhost:8080/api/v1/member/owner/register`;
    const requestURL = `http://localhost:8887/api/v1/member/owner/register`;

    return async (dispatch, getState) => {
        const formData = new FormData();

        // JSON 데이터 생성
        const ownerData = {
            memberId, storeName, bank, account, storeNo, storeAddress, storePhone
        };

        formData.append("ownerData", new Blob([JSON.stringify(ownerData)], { type: "application/json" }));

        if (storeImage instanceof File) {
            formData.append("storeImage", storeImage);
        }

        if (attachmentFile instanceof File) {
            formData.append("attachmentFile", attachmentFile);
        }

        try {
            const response = await api.post(requestURL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });


            if (response.data.httpStatusCode === 201) {

                dispatch({
                    type: POST_OWNERDATA,
                    payload: response.data.results.result
                });

                return response; // 이 부분을 추가
            } else {
                console.error('예상치 못한 상태 코드:', response.data.httpStatusCode);
                return { success: false, error: '제공자 신청에 실패했습니다.' };
            }
        } catch (error) {
            console.error('제공자 전환 신청 중 오류 발생:', error);
            return { success: false, error: '서버와 통신 중 오류가 발생했습니다.' };
        }
    };
};


// 재신청 시 돌아갈 구문
export const callUpdateOwnerAPI = ({
    memberId,
    storeName,
    bank,
    account,
    storeImage,
    storeNo,
    storeAddress,
    storePhone,
    attachmentFile
}) => {
    // const requestURL = `http://localhost:8080/api/v1/member/owner/update`;
    const requestURL = `http://localhost:8887/api/v1/member/owner/update`;

    return async (dispatch, getState) => {
        const formData = new FormData();

        const ownerData = {
            memberId, storeName, bank, account, storeNo, storeAddress, storePhone
        };

        formData.append("ownerData", new Blob([JSON.stringify(ownerData)], { type: "application/json" }));

        if (storeImage instanceof File) {
            formData.append("storeImage", storeImage);
        }

        if (attachmentFile instanceof File) {
            formData.append("attachmentFile", attachmentFile);
        }

        try {
            const response = await api.post(requestURL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.httpStatusCode === 201) {

                dispatch({
                    type: POST_OWNERDATA,
                    payload: response.data.results.result
                });

                return response; // 이 부분을 추가
            } else {
                console.error('예상치 못한 상태 코드:', response.data.httpStatusCode);
                return { success: false, error: '제공자 재신청에 실패했습니다.' };
            }
        } catch (error) {
            console.error('제공자 전환 재신청 중 오류 발생:', error);
            return { success: false, error: '서버와 통신 중 오류가 발생했습니다.' };
        }
    };
};


// 사용자가 제공자 전환 신청을 했는지 여부 확인을 위함
export const checkOwnerStatusAPI = async (memberId) => {
    // const requestURL = `http://localhost:8080/api/v1/member/owner/status/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/member/owner/status/${memberId}`;
    try {
        const response = await api.get(requestURL);
        return response;
    } catch (error) {
        console.error('기존 신청 여부 확인 중 오류 발생:', error);
        throw error;
    }
};

// 제공자 전환 심사 반려 됐을 때 반려 메시지 가져오기
export const getRejectedMessage = async (memberId) => {
    // const requestURL = `http://localhost:8080/api/v1/member/rejected/${memberId}`;
    const requestURL = `http://localhost:8887/api/v1/member/rejected/${memberId}`;
    try {
        const response = await api.get(requestURL);
        return response;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
}

// 제공자 정보 불러오기 (예진)
export function getOwnerInfo({ ownerNo }) {
    return async (dispatch, getState) => {

        const url = `/owner/${ownerNo}`

        const response = await api.get(url)

        if (response?.data.httpStatusCode == 200) {

            dispatch({
                type: GET_OWNERINFO,
                payload: {
                    ownerInfo: response.data.results.result
                }
            });
        }
    }
}

// 접속자 수 데이터 불러오기
export async function getConnectInfo() {
    const url = "/member/connectCount"
    const response = await api.get(url)

    return response.data
}


// 회원의 대한 정보를 불러오는 구문(은미)
export async function getMemberData(memberId) {

    const url = `/member/${memberId}`

    const response = await getData(url);

    return response;
};

// 은미
const getData = async (url, query) => {
    let response

    if (!query) {
        response = await api.get(url)
    } else {
        response = await api.get(url, { params: query })
    }

    return response?.data
}

export function changeConsultingAPI({ memberId }) {
    const url = `/member/modify/consulting?memberId=${memberId}`

    return async (dispatch, getState) => {
        const response = await api.put(url)

        if (response?.data.httpStatusCode == 204) {
            dispatch({
                type: CHANGE_ISCONSULTING,
                payload: {
                    isConsulting: response?.data.results.isConsulting
                }
            })
        }
    };
}


// 제공자 전환 심사 중복된 사업자번호인지 확인하기
export const getCheckStoreNoAPI = async (memberId, storeNo) => {
    // const requestURL = `http://localhost:8080/api/v1/member/check-store-no`;
    const requestURL = `http://localhost:8887/api/v1/member/check-store-no`;
    try {
        // 요청 파라미터를 params 객체로 전달
        const response = await api.get(requestURL, {
            params: { memberId, storeNo },
        });
        return response;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
};
