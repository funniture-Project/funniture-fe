import { createActions, handleActions } from 'redux-actions';

// 초기값 설정
const initialState = {

    user: {
        memberId: '',
        memberRole: '',
        email: '',
        userName: '',
        phoneNumber: '',
        signupDate: '',
        isConsulting: '',
        hasImage: '',
        imageId: '',
        imageLink: '',
        address: ''
    },
    verificationCode: '',
    owner: {
        account: '',
        attechmentLink: '',
        bank: '',
        isRejected: '',
        memberId: '',
        storeAddress: '',
        storeImage: '',
        storeName: '',
        storeNo: '',
        storePhone: ''
    },
    inquiries: []
};

// 액션 정의
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_MEMBER = 'member/GET_MEMBER';
export const GET_EMAIL = 'member/GET_EMAIL';
export const RESET_MEMBER = 'member/RESET_MEMBER';
export const POST_OWNERDATA = 'member/POST_OWNERDATA'; // 재공자 신청 , 재신청 했을 때 데이터 저장하는 액션!
export const INQUIRY_USER = 'member/INQUIRY_USER'; // 사용자 마이페이지 문의

// 상담 여부 업데이트
export const CHANGE_ISCONSULTING = 'member/CHANGE_ISCONSULTING'

export const resetMember = () => ({
    type: RESET_MEMBER
});

const actions = createActions({
    [POST_REGISTER]: () => { },
    [POST_LOGIN]: () => { },
    [GET_MEMBER]: () => { },
    [GET_EMAIL]: () => { },
    [POST_OWNERDATA]: () => { },
    [CHANGE_ISCONSULTING]: () => { },
    [INQUIRY_USER]: () => { },
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
    [POST_OWNERDATA]: (state, { payload }) => ({
        ...state,
        owner: {
            account: payload.account,
            attachmentFile: payload.attechmentLink,
            bank: payload.bank,
            isRejected: payload.isRejected,
            memberId: payload.memberId,
            storeAddress: payload.storeAddress,
            storeImage: payload.storeImage,
            storeName: payload.storeName,
            storeNo: payload.storeNo,
            storePhone: payload.storePhone
        }
    }),
    [RESET_MEMBER]: () => initialState, // 상태를 초기값으로 리셋
    [CHANGE_ISCONSULTING]: (state, { payload }) => ({
        ...state,
        user: {
            ...state.user,
            isConsulting: payload.isConsulting
        }
    }),

    [INQUIRY_USER]: (state, { payload }) => ({
        ...state,
        inquiries: payload.results,  // 문의 리스트
        pageInfo: payload.results.result.pageInfo   // 페이지 정보 추가
    })
}, initialState);


export default memberReducer;