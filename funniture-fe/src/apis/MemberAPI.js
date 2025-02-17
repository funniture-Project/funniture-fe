
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

        console.log('회원 가입 데이터 서버에 보내기 result : ', result);

        if (result.status == 201) {
            dispatch({type : POST_REGISTER, payload : result});
        }
    };
};
