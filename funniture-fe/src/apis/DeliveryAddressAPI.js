import api from "./Apis";

export async function getDefaultDeliveryAddressList(memberId) {
    const url = `/deliveryaddress/default/${memberId}`

    const response = await getData(url);

    return response;
}

export async function getDeliveryAddressListData(memberId) {

    const url = `/deliveryaddress/${memberId}`

    const response = await getData(url);

    return response;
}

export async function putDefaultAddress(destinationNo) {
    const url = `/deliveryaddress/${destinationNo}/setDefault`;
    await api.put(url);
}

export async function putAddressDelete(destinationNo) {
    const url = `/deliveryaddress/${destinationNo}/delete`;
    await api.put(url);
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