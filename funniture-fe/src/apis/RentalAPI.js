import api from "./Apis";

const baseRentalUrl = 'http://localhost:8080/api/v1/rental'

// ---------------------------------------------------- 관리자 -------------------------------------------------------------

export async function getAdminRentalList() {

    const url = '/rental'

    const response = await getData(url);

    return response
}

export async function getAdminRentalListWithCriteria(criteria) {

    const url = '/rental';
    const params = new URLSearchParams();

    if (criteria.rentalState) {
        params.append('rentalState', criteria.rentalState);
    }
    if (criteria.storeName) {
        params.append('storeName', criteria.storeName);
    }
    if (criteria.categoryName) {
        params.append('categoryName', criteria.categoryName);
    }
    if (criteria.searchDate) {
        params.append('searchDate', criteria.searchDate);
    }
    if (criteria.rentalNo) {
        params.append('rentalNo', criteria.rentalNo);
    }

    const response = await getData(url, params)

    return response
}

export async function getStoreList() {
    return await fetch('http://localhost:8080/api/v1/product/ownerlist?categoryCode=1&categoryCode=2').then(res => res.json());
}

// ---------------------------------------------------- 사용자 -------------------------------------------------------------

export async function getUserOrderList(memberId, period) {
    
    // const url = new URL(baseRentalUrl + `/user?memberId=${memberId}`);
    const url = '/rental/user'
    const params = new URLSearchParams()


    // period 값이 존재하면 URL에 추가
    if (memberId){
        params.append("memberId", memberId)
    }
    if (period) {
        params.append("period", period);
    }

    const response = await getData(url, params)

    return response;
}

export async function getOrderDetail(id) {
    const url = `/rental/${id}`

    const response = await getData(url);

    console.log(response)

    return response
}

// 예약 등록 API 호출 함수
export const postRentalReservation = async (rentalData) => {
    try {
        const url = `/rental/regist`;  
        const response = await api.post(url, rentalData);  
        return response.data;  
    } catch (error) {
        console.error('예약 등록 API 호출 실패:', error);
        throw error; 
    }
};

// ---------------------------------------------------- 제공자 -------------------------------------------------------------

export const getOwnerRentalList = async (ownerNo, period, rentalTab) => {
    const url = `/rental/owner`
    const params = new URLSearchParams()

   
    if(ownerNo) {
        params.append("ownerNo", ownerNo)
    }
    // period 값이 존재하면 URL에 추가
    if (period) {
        params.append("period", period);
    }
    if (rentalTab) {
        params.append("rentalTab", rentalTab)
    }

    console.log("period API!", period)
    const response = await getData(url, params)

    return response;
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