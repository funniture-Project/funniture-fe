import { json } from "react-router-dom";
import { POST_REGISTER , POST_LOGIN , GET_MEMBER} from "../redux/modules/MemberModule";


export const callSignupAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/api/v1/auth/signup`;

    return async (dispatch, getState) => {
        console.log('MemberAPI의 dispatch : ', dispatch);
        console.log('MemberAPI의 getState : ', getState);
        const result = await fetch(requestURL, {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json',
            Accept: '*/*',
         },
         body: JSON.stringify({
            email : form.email,
            userName : form.userName,
            password : form.password
         }),
    }).then(res => res.json());

        console.log('회원 가입 데이터 서버에 보내고 리턴된 result : ', result);
        alert(result.message);
        if (result.status == 201) {
            console.log('result.status : ' , result.status);
            dispatch({type : POST_REGISTER, payload : result});
        }
    };
};


export const callLoginAPI = ({ form }) => {
    const loginURL = `http://localhost:8080/api/v1/auth/login`
    console.log('form', form);
    return async (dispatch, getState) => {
        const result = await fetch(loginURL,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*', // 모든 도멘인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body : JSON.stringify({
                email : form.email,
                password : form.password
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
            console.log('result.failType : '  , result.failType);
            alert(result.failType);
            return false;
        }
    }
}

export const callGetMemberAPI = ({memberId}) => {
    const memberRequestURL = `http://localhost:8080/api/v1/member/${memberId}`;

    return async (dispatch, getState) => {
        const result = await fetch(memberRequestURL,{
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                Accept: '*/*',
                Authorization : 'Bearer' + window.localStorage.getItem('accessToken'),
            },
        }).then((res) => res.json());

        console.log('callGetMemberAPI result : ', result);

        dispatch({type: GET_MEMBER, payload:result});
    }
}
