import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductList } from "../../apis/ProductAPI";
import './listpage.css'

function ListPage({ selectCategory }) {

    const location = useLocation();

    // location.state
    const searchKey = location.state ? Object.keys(location.state)[0] : null
    const searchValue = location.state?.[searchKey]

    // 검색 조건
    const [conditions, setConditions] = useState({
        categoryCodeList: [],
        ownerNo: [],
        searchText: ''
    })

    // 상품 검색 결과
    const [productList, setProductList] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        // 처음 페이지 넘어올 때 설정
        if (searchKey) {
            setConditions(prevState => ({
                ...prevState,
                [searchKey]: searchKey == 'searchText' ? searchValue : [searchValue],
                categoryCodeList: selectCategory
            }));
        } else {
            setConditions(prevState => ({
                ...prevState,
                categoryCodeList: selectCategory
            }));
        }
    }, [location.state, selectCategory])

    async function getData(conditions) {
        const response = await getProductList(conditions)

        console.log("sdan : ", response.results?.result ? response.results.result : response.message)

        if (response.results?.result) {
            setProductList(response.results.result)
            setError('')
        } else {
            setError(response.message)
            setProductList([])
        }
    }

    useEffect(() => {
        getData(conditions)
    }, [conditions])

    useEffect(() => {
        console.log("productList : ", productList)
        console.log("error : ", error)
    }, [productList, error])

    return (
        <div className="wholeContentBox">
            {/* 필터링 조건 */}
            <div className="list_filterBox">
                <div>총 {productList.length}개</div>

                <div className="filter_condition">
                    <div>신상품</div>
                    <div>낮은 가격순</div>
                    <div>높은 가격순</div>
                </div>
            </div>

            {/* 결과 출력 */}
            <div className="productList_result">
                {error != '' ?
                    (<div className="errorMsg">
                        <div>{error}</div>
                    </div>) :
                    (<div className="productListBox">
                        {productList.map(product => (
                            <div className="productItem">
                                <div>
                                    <img src={require(`../../assets/images/${product.productImageLink}`)} alt="상품 사진" />
                                    <div>{product.storeName}</div>
                                    <div>{product.productName}</div>
                                    <div>
                                        <div>최저가</div>
                                        <div>월 {product.priceListAsIntegers[product.priceListAsIntegers.length - 1]}원 ~ </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>)}
            </div>
        </div>
    )

}

export default ListPage;