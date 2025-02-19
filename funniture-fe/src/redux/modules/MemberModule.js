import { createActions , handleActions } from 'redux-actions';

// 초기값 설정
const initialState = [];

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_MEMBER = 'member/GET_MEMBER';

const actions = createActions({
    [POST_REGISTER] : () => {},
    [POST_LOGIN] : () => {},
    [GET_MEMBER] : () => {}
});

const memberReducer = handleActions({
    [POST_REGISTER] : (state, {payload}) => {
        console.log('memberReducer POST_REGISTER의 state : ', state);
        console.log('memberReducer POST_REGISTER의 {payload} : ', payload);
        return payload;
    },
    [POST_LOGIN] : (state, {payload}) => {
        console.log('memberReducer POST_LOGIN state : ', state);
        console.log('memberReducer POST_LOGIN {payload} : ', payload);
        return payload;
    },
    [GET_MEMBER] : (state, {payload}) => {
        console.log('memberReducer SET_MEMBER_LIST state : ', state);
        console.log('memberReducer SET_MEMBER_LIST {payload} : ', payload);
        return payload;
    }
}, initialState);

export default memberReducer;