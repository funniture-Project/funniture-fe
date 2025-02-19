import { createActions, handleActions } from 'redux-actions';

// 초기값 설정
const initialState = {

    user: {
        memberId: '',
        memberRole: '',
        email: ''
    }
};

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_MEMBER = 'member/GET_MEMBER';

const actions = createActions({
    [POST_REGISTER]: () => { },
    [POST_LOGIN]: () => { },
    [GET_MEMBER]: () => { }
});

const memberReducer = handleActions({
    [POST_REGISTER]: (state, { payload }) => {
    },
    [POST_LOGIN]: (state, { payload }) => (
        { token: payload.token }
    ),
    [GET_MEMBER]: (state, { payload }) => (
        {
            ...state,
            user: {
                memberId: payload.results.result.memberId,
                memberRole: payload.results.result.memberRole,
                email: payload.results.result.email
            }
        }
    )
}, initialState);

export default memberReducer;