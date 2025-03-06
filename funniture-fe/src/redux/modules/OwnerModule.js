import { createActions, handleActions } from 'redux-actions';

// 초기값 설정
const initialState = {
    inquiries: []
};


// 액션 정의 (문의 데이터 가져오기)
export const INQUIRY_SELECT = 'owner/INQUIRY_SELECT';

const actions = createActions({
    [INQUIRY_SELECT]: () => { }
});

const ownerReducer = handleActions({
    [INQUIRY_SELECT]: (state, { payload }) => ({
        ...state,
        inquiries: payload.results
    })
}, initialState);



export default ownerReducer;