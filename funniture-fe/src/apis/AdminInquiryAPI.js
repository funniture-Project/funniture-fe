import api from "./Apis"

export async function getConsultingList() {
    const url = `/adinquiry/list`

    const response = await getData(url)

    if (response) {
        return response
    }
}

export async function getUSerInquiryList({ memberId }) {
    const url = `/adinquiry/${memberId}`

    const response = await getData(url)

    if (response) {
        return response
    }
}

export async function sendChat({ newChat }) {
    const url = `/adinquiry/sendChat`

    await api.post(url, newChat)
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
