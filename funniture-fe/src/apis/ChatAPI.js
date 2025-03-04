import { GET_CHAT_QA_LIST } from "../redux/modules/ChatModule"
import api from "./Apis"

export function getChatQaList({ refNum, levelNum } = {}) {
    console.log("refNum : ", refNum, " levelNum : ", levelNum)
    return async (dispatch) => {
        console.log("챗봇 질문 리스트 호출")
        try {
            console.log("챗봇 질문 try 내부")

            let url = ''

            if (!refNum && !levelNum) {
                url = `/chat/list`
            } else {
                if (refNum) {
                    console.log("전달 받은 상위 번호 : ", refNum)
                    url = `/chat/list?refNum=${refNum}`
                } else if (levelNum) {
                    console.log("전달 받은 단계 : ", levelNum)
                    url = `/chat/list?levelNum=${levelNum}`
                }
            }

            const chatQaList = await getData(url)

            console.log("chatQaList : ", chatQaList)

            if (chatQaList) {
                dispatch({
                    type: GET_CHAT_QA_LIST,
                    payload: {
                        chatQaList: chatQaList.results?.result
                    }
                })
            }
        } catch (error) {
            console.log("챗봇 질문 catch 내부 : ", error)
        }
    }
}

// 공용
const getData = async (url, query) => {
    let response

    if (!query) {
        response = await api.get(url)
    } else {
        response = await api.get(url, { params: query })
    }

    return response?.data
}