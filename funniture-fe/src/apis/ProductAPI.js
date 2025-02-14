import { GET_CATEGORY_LIST } from '../redux/modules/CategoryModuls'

const baseProductUrl = 'http://localhost:8080/api/v1/product'

export function getCategory(refCategory) {

    const url = baseProductUrl + `/category?refCategoryCode=${refCategory}`

    return async (dispatch, getState) => {
        const response = await fetch(url)
            .then(res => res.json())
        if (response.httpStatusCode == 200) {
            dispatch({ type: GET_CATEGORY_LIST, payload: response.results.result, refCategory })
        }
    }
}


export async function getProductList(conditions, refCategoryCode) {
    console.log("fetch 전 conditions : ", conditions)

    const url = new URL(baseProductUrl)
    const params = new URLSearchParams()

    console.log("conditions.categoryCodeList : ", conditions.categoryCodeList.length)

    if (conditions.categoryCodeList.length > 0) {
        conditions.categoryCodeList.map(categoryCode => {
            params.append('categoryCode', categoryCode);
        })
    } else {
        console.log("실행!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        params.append('categoryCode', refCategoryCode);
    }

    if (conditions.ownerNo.length > 0) {
        conditions.ownerNo.map(owner => {
            params.append('ownerNo', owner);
        })
    }

    if (conditions.searchText.trim() != '') {
        params.append("searchText", conditions.searchText.toString())
    }

    url.search = params.toString()

    const response = getProductData(url)

    return response
}

const getProductData = async (url) => {
    const response = await fetch(url)
        .then(res => res.json())

    return response
}

