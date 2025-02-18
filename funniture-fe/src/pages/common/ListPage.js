import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductList } from "../../apis/ProductAPI";
import './listpage.css'
import { useSelector } from "react-redux";

function ListPage({ selectCategory, selectCompany }) {

    const { refCategoryCode } = useSelector(state => state.category)
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

    // 검색 조건 설정
    useEffect(() => {
        // 처음 페이지 넘어올 때 설정
        if (searchKey) {
            setConditions(prevState => ({
                ...prevState,
                [searchKey]: searchKey == 'searchText' ? searchValue : [searchValue],
                categoryCodeList: selectCategory,
                ownerNo: selectCompany
            }));
        } else {
            setConditions(prevState => ({
                ...prevState,
                categoryCodeList: selectCategory,
                ownerNo: selectCompany
            }));
        }
    }, [location.state, selectCategory, selectCompany])

    // 검색 결과 데이터 가져오기
    async function getData(conditions) {
        const productResponse = await getProductList(conditions, refCategoryCode)

        if (productResponse.results?.result) {
            setProductList(productResponse.results.result)
            setError('')
        } else {
            setError(productResponse.message)
            setProductList([])
        }
    }

    useEffect(() => {
        getData(conditions)
    }, [conditions, refCategoryCode])

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
                    (<div key={error.length} className="errorMsg">
                        <div>{error}</div>
                    </div>) :
                    (<div className="productListBox">
                        {productList.map(product => (
                            <div className="productItem" data-product-no={product.productNo}>
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