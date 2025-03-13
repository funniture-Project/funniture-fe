import api from "./Apis"

export async function getAllNoticeList() {
    const url = '/notice/list'

    const response = await getData(url)

    if (response?.httpStatusCode == 200) {
        return response.results.result
    }

}

export async function registerNotice({ newNotice }) {
    const url = '/notice/register'

    const response = await api.post(url, newNotice)

    if (response) {
        return response.data?.message
    }
}

export async function deleteNotice({ noticeNo }) {
    const url = `/notice/delete?noticeNo=${noticeNo}`

    const response = await api.delete(url)

    if (response) {
        return response.data?.message
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
