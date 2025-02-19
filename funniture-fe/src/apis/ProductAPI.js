import { GET_CATEGORY_LIST } from '../redux/modules/CategoryModuls'

const baseProductUrl = 'http://localhost:8080/api/v1/product'

// 카테고리 조회 (store에 저장)
export function getCategory(refCategory) {

    const categoryUrl = refCategory
        ? baseProductUrl + `/category?refCategoryCode=${refCategory}`
        : baseProductUrl + `/category`;

    if (refCategory) {
        return async (dispatch, getState) => {

            try {
                const categoryListRes = await fetch(categoryUrl).then(res => res.json())

                dispatch({
                    type: GET_CATEGORY_LIST, payload: {
                        categoryList: categoryListRes.results?.result ?? [],
                    },
                    refCategory
                })
            } catch (error) {
                console.error("카테고리 및 회사 정보 호출 에러 : ", error)
            }

        }
    } else {
        return getData(categoryUrl)
    }
}

// 검색 조건에 상응하는 데이터 조회
export async function getProductList(conditions, refCategoryCode) {

    console.log("검색 조건 : ", conditions)

    const url = new URL(baseProductUrl)
    const params = new URLSearchParams()

    if (conditions) {
        if (conditions.categoryCodeList?.length > 0) {
            conditions.categoryCodeList.map(categoryCode => {
                params.append('categoryCode', categoryCode);
            })
        } else {
            if (refCategoryCode) {
                params.append('categoryCode', refCategoryCode);
            }
        }

        if (conditions.ownerNo.length > 0) {
            conditions.ownerNo.map(owner => {
                params.append('ownerNo', owner);
            })
        }

        if (conditions.productStatus?.trim() != '' && conditions.productStatus) {
            params.append("productStatus", conditions.productStatus?.toString())
        }

        if (conditions.searchText?.trim() != '') {
            params.append("searchText", conditions.searchText?.toString())
        }

        url.search = params.toString()
    }

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

// 전체 제공자 목록 조회
export async function getOwnerAllList() {

    const url = new URL(baseProductUrl + '/ownerlist')

    const response = await getData(url)

    return response
}

// 상품 상태 정보 수정
export async function changeProductStatus(productNoList, changeStatueValue) {
    const url = baseProductUrl + '/changestatus'

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productList: productNoList,
            changeStatus: changeStatueValue
        })
    }).then(res => res.json())

    return response
}

// 제공자 별 상품 리스트 조회
export async function getProductListByOwnerNo(ownerNo) {
    console.log("ownerNo : ", ownerNo)

    const url = new URL(baseProductUrl + `/owner?ownerNo=${ownerNo}`)

    const response = await getData(url)

    return response
}

// 공용
const getData = async (url) => {
    const response = await fetch(url)
        .then(res => res.json())

    return response
}
