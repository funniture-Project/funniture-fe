import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductList } from "../../apis/ProductAPI";
// import { useDispatch, useSelector } from "react-redux";

function ListPage({ selectCategory }) {

    const location = useLocation();

    // location.state
    const searchKey = Object.keys(location.state)[0]
    const searchValue = location.state?.[searchKey]

    // 검색 조건
    const [conditions, setConditions] = useState({
        categoryCodeList: [],
        ownerNo: [],
        searchText: ''
    })

    // 상품 검색 결과
    const [productList, setProductList] = useState([])

    useEffect(() => {

        // 처음 페이지 넘어올 때 설정
        setConditions(prevState => ({
            ...prevState,
            [searchKey]: searchKey == 'searchText' ? searchValue : [searchValue]
        }));
    }, [location.state])

    async function getData(conditions) {
        const response = await getProductList(conditions)

        console.log("응답으로 받은 response : ", response)
    }

    useEffect(() => {
        getData(conditions)
    }, [conditions])

    return (
        <div>
            {/* 검색 결과 위치 */}
            <div>
                <div>검색 결과</div>
            </div>

        </div>
    )

}

export default ListPage;