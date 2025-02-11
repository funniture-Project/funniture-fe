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