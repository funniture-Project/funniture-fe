import { useSelector } from "react-redux";
import { POST_REGISTER , POST_LOGIN , GET_MEMBER, GET_EMAIL} from "../redux/modules/MemberModule";
import api from "./Apis";

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
    const loginURL = `http://localhost:8080/api/v1/auth/login`
    console.log('form', form);
    return async (dispatch, getState) => {
        const result = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*', // 모든 도멘인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            }),
        }).then(res => res.json());

        console.log('로그인 시도 후 반환 받은 데이터 result : ', result);
        if (result.status == 200) {
            console.log('로그인 성공 result.status : ', result.status);
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
            alert(result.message);
            return true;
        } else {
            console.log('로그인 실패 : ', result.status);
            console.log('result.failType : ', result.failType);
            alert(result.failType);
            return false;
        }
    }
}

// 로그인 한 회원의 대한 정보를 불러오는 구문
export const callGetMemberAPI = ({ memberId }) => {
    return async (dispatch) => {
        const result = await api.get(`/member/${memberId}`)
         console.log('callGetMemberAPI 로그인한 회원 정보 resposne : ', result);

        dispatch({ type: GET_MEMBER, payload: result.data });
    };
};

 // 회원 가입 시, 이메일 인증번호 보내는 구문
export const callSendEmailAPI = ({form}) => {
    return async (dispatch) => {
        const result = await api.post(`/email/${form.email}`,{
            email : form.email
        });
        alert('인증 번호 발송이 완료되었습니다.');
        console.log('인증번호가 서버에 잘 다녀 왔나 result : ' , result);

        dispatch({type: GET_EMAIL, payload: result.data});
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

export const callChangePassAPI = ({form}) => {
    const requestURL = `http://localhost:8080/api/v1/member/findPass`

    return async (dispatch,getState) => {
        console.log('비빌번호 변경 요청 서버에 잘 갔나.');
        const result = api.post(requestURL, {
            email : form.email,
            password : form.password
        })
        console.log('서버에 잘 다녀왔나 result : ' , result);
        alert('비밀번호 변경이 완료되었습니다.');
    }

}

// 개인 정보 변경 전, 비밀번호 검증 로직
export const callConfirmPassword = (memberId, password) => {
    const requestURL = `http://localhost:8080/api/v1/member/conform`

    return async (dispatch, getState) => {
        console.log('서버에 보낼 memberId :' , memberId);
        console.log('서버에 보낼 password :' , password);
        const result = api.post({
            memberId: memberId,
            password: password
        });
        console.log('개인정보 변경 전 비번 확인 : ', result);

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