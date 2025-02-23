import { useSelector } from "react-redux";
import { POST_REGISTER, POST_LOGIN, GET_MEMBER, GET_EMAIL, GET_ADDRESS } from "../redux/modules/MemberModule";
import api from "./Apis";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

// 회원 가입
export const callSignupAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/api/v1/auth/signup`;

    return async (dispatch, getState) => {
        console.log('MemberAPI의 dispatch : ', dispatch);
        console.log('MemberAPI의 getState : ', getState);
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

        console.log('회원 가입 데이터 서버에 보내고 리턴된 result : ', result);
        alert(result.message);
        if (result.status == 200) {
            console.log('result.status : ', result.status);
            dispatch({ type: POST_REGISTER, payload: result });
        }
    };
};

// 로그인 할 때 서버에 데이터를 보내고, 토큰 정보를 리턴 받음
export const callLoginAPI = ({ form }) => {
    const loginURL = `http://localhost:8080/api/v1/auth/login`;
    console.log('form', form);

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

            console.log('로그인 시도 후 반환 받은 데이터 result : ', result);

            if (result.status === 200) {
                console.log('로그인 성공 result.status : ', result.status);
                window.localStorage.setItem('accessToken', result.userInfo.accessToken);
                dispatch({ type: POST_LOGIN, payload: result });

                // 로그인 성공 시 true 반환
                return { success: true, message: result.message };
            } else {
                console.log('로그인 실패 : ', result.status);
                console.log('result.failType : ', result.failType);

                // 로그인 실패 시 false 반환
                return { success: false, message: result.failType };
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
        console.log('callGetMemberAPI 로그인한 회원 정보 resposne : ', result);

        dispatch({ type: GET_MEMBER, payload: result.data });
    };
};

// 회원 가입 시, 이메일 인증번호 보내는 구문
export const callSendEmailAPI = ({ form }) => {
    return async (dispatch) => {
        const result = await api.post(`/email/${form.email}`, {
            email: form.email
        });
        alert('인증 번호 발송이 완료되었습니다.');
        console.log('인증번호가 서버에 잘 다녀 왔나 result : ', result);

        dispatch({ type: GET_EMAIL, payload: result.data });
    };
};

export const callCertificationAPI = ({ email, verification }) => {
    return async (dispatch) => {
        try {
            const response = await api.post('/email/verify', { email, verification });
            if (response.data.success) {
                alert('인증 성공!');
                dispatch({ type: 'CERTIFICATION_SUCCESS' });
            } else {
                alert('인증 실패. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('인증 요청 중 오류 발생:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };
};

// 로그인 페이지에서 비밀번호 변경 로직
export const callChangePassAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/api/v1/member/findPass`

    return async (dispatch, getState) => {
        console.log('비빌번호 변경 요청 서버에 잘 갔나.');
        const result = api.post(requestURL, {
            email: form.email,
            password: form.password
        })
        console.log('서버에 잘 다녀왔나 result : ', result);
        alert('비밀번호 변경이 완료되었습니다.');
    }

}

// 사용자 개인 정보 변경 전, 비밀번호 검증 로직
export const callConfirmPassword = (memberId, password) => {
    const requestURL = `http://localhost:8080/api/v1/member/conform`;

    return async (dispatch, getState) => {
        console.log('서버에 보낼 memberId:', memberId);
        console.log('서버에 보낼 password:', password);

        try {
            const response = await api.post(requestURL, { memberId, password });

            // 응답 데이터 확인
            console.log('서버 응답:', response.data);

            // 응답 데이터의 status 값을 기반으로 성공/실패 판단
            if (response.data.httpStatusCode === 200) {
                console.log('인증 성공');
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
export const callChangePhoneAPI = ({memberId,phoneNumber}) => {
    const requestURL = `http://localhost:8080/api/v1/member/modify/phone`;

    return async (dispatch, getState) => {
        const response = await api.put(requestURL, {
            memberId : memberId,
            phoneNumber : phoneNumber});

        console.log('서버에 잘 다녀왔나 response : ' , response);

        if (response.data.httpStatusCode === 201) {
            console.log('전화번호 변경 성공');
            alert('전화번호가 변경되었습니다.')
        } else if (response.data.httpStatusCode === 404) {
            console.log('전화번호 변경 실패');
            alert('전화번호를 변경하지 못하였습니다.')
        }
    };
};

export const callChangePasswordAPI = ({memberId , password}) => {
    const requestURL = `http://localhost:8080/api/v1/member/modify/password`;

    return async (dispatch, getState) => {
        const response = await api.put(requestURL, {
            memberId : memberId,
            password : password
        })
        console.log('마이페이지 비번 변경 서버 잘 다녀왔나 : ', response)

        if (response.data.httpStatusCode === 201) {
            console.log('비밀번호 변경 성공');
            return;
        } else if (response.data.httpStatusCode === 404) {
            console.log('전화번호 변경 실패');
            return;
        }
    }
}

// 얘 왜 안 될까????????????? 프론트, 서버 다 안 찍힌다. 
export const callBasicAddressAPI = ({memberId}) => {
    const requestURL = `http://localhost:8080/api/v1/deliveryaddress?memberId=${memberId}`;
    return async (dispatch, getState) => {
        const response = await api.get(requestURL)
        console.log('기본 배송지 주소 조회, 서버 잘 다녀왔나 : ', response)

        if (response.data.status === 200) {
            console.log('배송지 내역 조회 성공');
            dispatch({ type: GET_ADDRESS, payload: response.data.address });
        } else if (response.data.status === 204) {
            console.log('배송지 내역 없음');
            dispatch({ type: GET_ADDRESS, payload: '' });
        } else {
            console.log('토큰 유효하지 않음');
        }
    }
}

// 회원가입은 굳이 토큰을 안 보내도 돼서 axios 쓰지 않아도 됨. 근데 작성해봄.
// export const callSignupAPI =
// ({form}) =>
//     async (dispatch) => {
//         try {
//           console.log('실행')
//           console.log("api : ", api)
//         const response = await api.post('/auth/signup', {
//           email : form.email,
//           userName : form.userName,
//           password : form.password,
//         });
//         if (response.status !== 200) throw new Error(response.error);
//         dispatch({type : POST_REGISTER, payload : response});
//         alert('회원가입을 완료하였습니다. ');
//       }
//        catch (error) {
//         // dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
//         console.log('test', error);
//         //   alert('회원가입에 실패하였습니다.');
//       }
//     };

// export const callGetMemberAPI = ({memberId}) => {
//     const memberRequestURL = `http://localhost:8080/api/v1/member/${memberId}`;

//     return async (dispatch, getState) => {
//         const result = await fetch(memberRequestURL,{
//             method : 'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 Accept: '*/*',
//                 Authorization : 'Bearer' + window.localStorage.getItem('accessToken'),
//             },
//         }).then((res) => res.json());

//         console.log('callGetMemberAPI result : ', result);

//         dispatch({type: GET_MEMBER, payload:result});
//     }
// }