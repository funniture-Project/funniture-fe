
const baseRentalUrl = 'http://localhost:8080/api/v1/rental'

export async function getAdminRentalList() {

    return await fetch(baseRentalUrl).then(res => res.json());
}

export async function getAdminRentalListWithCriteria(criteria) {

    const url = new URL(baseRentalUrl)
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

    url.search = params;

    console.log('요청 url : ', url)

    const response = await fetch(url);
    console.log('response', response)
    const data = await response.json();

    // 응답 구조 확인 후 리턴
    console.log('응답 데이터:', data);  // 응답 데이터 확인

    // 구조를 정확히 파악하고 adminRentalList를 반환
    return data;
}

export async function getStoreList() {
    return await fetch('http://localhost:8080/api/v1/product/ownerlist?categoryCode=1&categoryCode=2').then(res => res.json());
}

