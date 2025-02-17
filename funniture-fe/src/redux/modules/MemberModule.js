import { createActions , handleActions } from 'redux-actions';

// 초기값 설정
const initialState = [];

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';

const actions = createActions({
    [POST_REGISTER] : () => {}
});

const memberReducer = handleActions({
    [POST_REGISTER] : (state, {payload}) => {
        console.log('memberReducer POST_REGISTER의 state : ', state);
        console.log('memberReducer POST_REGISTER의 {payload} : ', payload);
        return payload;
    }
}, initialState);

export default memberReducer;