import { GET_CHAT_QA_LIST } from "../redux/modules/ChatModule"
import api from "./Apis"

export function getChatQaList({ refNum, levelNum } = {}) {
    return async (dispatch) => {
        try {

            let url = ''

            if (!refNum && !levelNum) {
                url = `/chat/list`
            } else {
                if (refNum) {
                    url = `/chat/list?refNum=${refNum}`
                } else if (levelNum) {
                    url = `/chat/list?qaLevel=${levelNum}`
                }
            }

            const chatQaList = await getData(url)


            if (chatQaList) {
                dispatch({
                    type: GET_CHAT_QA_LIST,
                    payload: {
                        chatQaList: chatQaList.results?.result,
                        refList: chatQaList.results?.refResult
                    }
                })
            }
        } catch (error) {
            console.log("챗봇 질문 catch 내부 : ", error)
        }
    }
}

export async function updateChatQaList({ updateList }) {

    const url = `/chat/modify`

    const result = await api.put(url, updateList)

    return result?.data.message
}

export async function deleteChatItemAPI({ chatNo }) {

    const url = `/chat/delete?chatNo=${chatNo}`

    const result = await api.delete(url)

    return result?.data.message
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