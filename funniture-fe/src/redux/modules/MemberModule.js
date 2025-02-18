import { createActions , handleActions } from 'redux-actions';

// 초기값 설정
const initialState = [];

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const SET_MEMBER_LIST = 'member/SET_MEMBER_LIST';

const actions = createActions({
    [POST_REGISTER] : () => {},
    [POST_LOGIN] : () => {},
    [SET_MEMBER_LIST] : () => {}
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
    },
    [SET_MEMBER_LIST] : (state, {payload}) => {
        console.log('memberReducer SET_MEMBER_LIST state : ', state);
        console.log('memberReducer SET_MEMBER_LIST {payload} : ', payload);
    }
}, initialState);

export default memberReducer;