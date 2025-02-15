import { GET_CATEGORY_LIST } from '../redux/modules/CategoryModuls'

const baseProductUrl = 'http://localhost:8080/api/v1/product'

// 카테고리 조회
export function getCategory(refCategory) {
    return async (dispatch, getState) => {

        const categoryUrl = baseProductUrl + `/category?refCategoryCode=${refCategory}`

        try {
            const categoryListRes = await fetch(categoryUrl).then(res => res.json())

            dispatch({
                type: GET_CATEGORY_LIST, payload: {
                    categoryList: categoryListRes.results?.result ?? [],
                },
                refCategory
            })
        } catch (error) {
            console.error("카테고리및 회사 정보 호출 에러 : ", error)
        }

    }
}

// 검색 조건에 상응하는 데이터 조회
export async function getProductList(conditions, refCategoryCode) {

    console.log("검색 조건 : ", conditions)

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

    console.log("검색 조건 결과 요청 url : ", url)

    const response = getData(url)

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

    const response = await getData(url)

    return response
}

// 공용
const getData = async (url) => {
    const response = await fetch(url)
        .then(res => res.json())

    return response
}
