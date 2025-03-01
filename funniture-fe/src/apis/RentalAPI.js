import api from "./Apis";

const baseRentalUrl = 'http://localhost:8080/api/v1/rental'

// ---------------------------------------------------- 관리자 -------------------------------------------------------------

export async function getAdminRentalList(searchRental, pageNum) {
    
    console.log('searchRental',searchRental )

    const url = '/rental'
    const params = new URLSearchParams();

    if (searchRental.rentalState) {
        params.append('rentalState', searchRental.rentalState);
    }
    if (searchRental.storeName) {
        params.append('storeName', searchRental.storeName);
    }
    if (searchRental.categoryName) {
        params.append('categoryName', searchRental.categoryName);
    }
    if (searchRental.searchDate) {
        params.append('searchDate', searchRental.searchDate);
    }
    if (searchRental.rentalNo) {
        params.append('rentalNo', searchRental.rentalNo);
    }
    if (pageNum) {
        params.append("offset", pageNum)
    }

    const response = await getData(url, params);

    return response
}

// export async function getAdminRentalListWithCriteria(criteria, pageNum) {

//     const url = '/rental';
//     const params = new URLSearchParams();

    
//     if(pageNum) {
//         params.append('offset', pageNum)
//     }

//     const response = await getData(url, params)

//     return response
// }

export async function getStoreList() {
    return await fetch('http://localhost:8080/api/v1/product/ownerlist?categoryCode=1&categoryCode=2').then(res => res.json());
}

// ---------------------------------------------------- 사용자 -------------------------------------------------------------

export async function getUserOrderList(memberId, period, pageNum) {
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
    if (pageNum) {
        params.append("offset", pageNum)
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

export const getOwnerRentalList = async (ownerNo, period, rentalTab, pageNum) => {
    const url = `/rental/owner`
    const params = new URLSearchParams()

    console.log("API에서도 pageNum 잘나오니?", pageNum)
   
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
    if (pageNum) {
        params.append("offset", pageNum)
    }

    const response = await getData(url, params)
    console.log("API 응답 데이터:", response);
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