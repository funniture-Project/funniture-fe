import { GET_CATEGORY_LIST } from '../redux/modules/CategoryModuls'

const baseProductUrl = 'http://localhost:8080/api/v1/product'

// 카테고리 조회
export function getCategory(refCategory) {

    const url = baseProductUrl + `/category?refCategoryCode=${refCategory}`

    console.log(url)

    return async (dispatch, getState) => {
        const response = await fetch(url)
            .then(res => res.json())
        if (response.httpStatusCode == 200) {
            dispatch({ type: GET_CATEGORY_LIST, payload: response.results.result, refCategory })
        }
    }
}

// 검색 조건에 상응하는 데이터 조회
export async function getProductList(conditions, refCategoryCode) {

    const url = new URL(baseProductUrl)
    const params = new URLSearchParams()

    if (conditions.categoryCodeList.length > 0) {
        conditions.categoryCodeList.map(categoryCode => {
            params.append('categoryCode', categoryCode);
        })
    } else {
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

// 카테고리에 따른 제공자 목록 정보 조회
export async function getOwnerListByCategory(categoryList, refCategoryCode) {

    const url = new URL(baseProductUrl + '/ownerlist')
    const params = new URLSearchParams()

    if (categoryList?.length > 0) {
        categoryList.map(category => {
            params.append('categoryCode', category);
        })
    } else {
        params.append('categoryCode', refCategoryCode);
    }

    url.search = params.toString()

    const response = await getOwnerData(url)

    console.log("제공자 리스트 결과 : ", response)

    return response
}

const getOwnerData = async (url) => {
    const response = await fetch(url)
        .then(res => res.json())

    return response
}
