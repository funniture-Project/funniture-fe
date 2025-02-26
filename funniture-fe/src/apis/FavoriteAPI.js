import api from "./Apis"

export async function getFavoriteList(memberId) {

    const url = `/favorite?memberId=${memberId}`

    const response = await getData(url)

    console.log(response)

    if (response.httpStatusCode == 200) {
        return response?.results
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