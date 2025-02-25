import { createActions, handleActions } from 'redux-actions';

// 초기값 설정
const initialState = {

    user: {
        memberId: '',
        memberRole: '',
        email: '',
        userName:'',
        phoneNumber:'',
        signupDate:'',
        isConsulting: '',
        hasImage: '',
        imageId: '',
        imageLink: '',
        address: ''
    },
    verificationCode: ''
};

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_MEMBER = 'member/GET_MEMBER';
export const GET_EMAIL = 'member/GET_EMAIL';
export const RESET_MEMBER = 'member/RESET_MEMBER';

export const resetMember = () => ({
    type:RESET_MEMBER
});

const actions = createActions({
    [POST_REGISTER]: () => { },
    [POST_LOGIN]: () => { },
    [GET_MEMBER]: () => { },
    [GET_EMAIL]: () => { },
});

const memberReducer = handleActions({
    [POST_REGISTER]: (state, { payload }) => ({
        user: { email: payload.results.result.email }
    }),
    [POST_LOGIN]: (state, { payload }) => (
        { token: payload.token }
    ),
    [GET_MEMBER]: (state, { payload }) => (
        {
            ...state,
            user: {
                memberId: payload.results.result.memberId,
                memberRole: payload.results.result.memberRole,
                email: payload.results.result.email,
                userName: payload.results.result.username,
                phoneNumber: payload.results.result.phoneNumber,
                signupDate: payload.results.result.signupDate,
                isConsulting: payload.results.result.isConsulting,
                hasImage: payload.results.result.hasImage,
                imageId: payload.results.result.imageId,
                imageLink: payload.results.result.imageLink,
                address: payload.results.result.address
            }
        }
    ),
    [GET_EMAIL]: (state, { payload }) => ({
        ...state,
        verificationCode: payload.results.result
    }),
    [RESET_MEMBER]: () => initialState // 상태를 초기값으로 리셋
}, initialState);


export default memberReducer;