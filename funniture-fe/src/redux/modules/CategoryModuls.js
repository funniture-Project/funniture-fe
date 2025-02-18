import { createActions, handleActions } from 'redux-actions';

// 초기값 
let initialState = {
    refCategoryCode: 1,
    categoryList: []
}

// 액션 타입입
export const GET_CATEGORY_LIST = 'category/GET_CATEGORY_LIST';

// 액션 함수
const actions = createActions({
    [GET_CATEGORY_LIST]: () => { },
    [GET_CATEGORY_LIST]: () => { },
    [GET_CATEGORY_LIST]: () => { },
    [GET_CATEGORY_LIST]: () => { },
    [GET_CATEGORY_LIST]: () => { },
    [GET_CATEGORY_LIST]: () => { },
});

// 리듀서
const categoryReducer = handleActions({
    [GET_CATEGORY_LIST]: (state, { payload, refCategory }) => (
        // console.log("payload : ", payload),
        // console.log("refCategory : ", refCategory), 
        {
            refCategoryCode: refCategory,
            categoryList: payload
        })
}, initialState)

export default categoryReducer;