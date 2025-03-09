import { createActions, handleActions } from 'redux-actions';

// 초기값 설정
const initialState = {
    ownerInfo: {},
    inquiries: []
};


// 액션 정의 (문의 데이터 가져오기)
export const INQUIRY_SELECT = 'owner/INQUIRY_SELECT';
export const GET_OWNERINFO = 'owner/GET_OWNERINFO';

const actions = createActions({
    [INQUIRY_SELECT]: () => { },
    [GET_OWNERINFO]: () => { },
});

const ownerReducer = handleActions({
    [INQUIRY_SELECT]: (state, { payload }) => ({
        ...state,
        inquiries: payload.results,  // 문의 리스트
        pageInfo: payload.results.result.pageInfo   // 페이지 정보 추가
    }),
    [GET_OWNERINFO]: (state, { payload }) => ({
        ...state,
        ownerInfo: payload.ownerInfo
    })
}, initialState);




export default ownerReducer;