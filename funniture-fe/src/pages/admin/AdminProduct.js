import AdminTop from "../../component/adminpage/AdminTop";
import AdProductCss from './adminProduct.module.css'
import { ReactComponent as SearchIcon } from '../../assets/icon/search-icon.svg'
import Pagination from "../../component/Pagination";
import { useEffect } from "react";
import { getOwnerListByCategory } from "../../apis/ProductAPI";
import { useDispatch } from "react-redux";

function AdminProduct() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function getOwnerList() {
            const res = await getOwnerListByCategory([1, 2], 1)
            console.log("res : ", res)
        }

        getOwnerList();
    }, [])

    return (
        <>
            <AdminTop title={'제품 관리'} />

            <div className={AdProductCss.wholeContainer}>
                {/* 제품 검색 조건 박스 */}
                <div className={AdProductCss.searchBox}>
                    <label htmlFor="storeOption">업체 :</label>
                    <select name="store" id="storeOption">
                        <option value="">선택</option>
                        <option value="memberNo">업체 명</option>
                        <option value="memberNo">업체 명</option>
                    </select>

                    <label htmlFor="categoryOption">카테고리 :</label>
                    <select name="category" id="categoryOption">
                        <option value="">선택</option>
                        <option value="categoryNo">카테고리 명</option>
                    </select>

                    <label htmlFor="statusOption">판매상태 :</label>
                    <select name="status" id="statusOption">
                        <option value="">선택</option>
                        <option value="statusText">판매상태</option>
                    </select>

                    <label htmlFor="searchTextOption">검색 :</label>
                    <input type="text" name="searchText" id="searchTextOption" />

                    <button>
                        <SearchIcon fill="currentColor" className={AdProductCss.searchIcon} />
                    </button>
                </div>

                {/* 검색 결과 박스 */}
                <div className={AdProductCss.resultContainer}>
                    <div className={AdProductCss.btns}>
                        <button>완전 삭제하기</button>
                        <button>판매 불가로 변경</button>
                        <button>판매 가능으로 변경</button>
                    </div>

                    <div className={AdProductCss.resultBox}>
                        <div>
                            <div className={`${AdProductCss.productItem} ${AdProductCss.productListTitle}`}>
                                <div className={AdProductCss.check}></div>
                                <div className={AdProductCss.productNo} id="productNo">상품 번호</div>
                                <div className={AdProductCss.storeName} id="storeName">회사명</div>
                                <div className={AdProductCss.category} id="category">카테고리</div>
                                <div className={AdProductCss.productName} id="productName">제품명</div>
                                <div className={AdProductCss.createAt} id="createAt">등록일</div>
                                <div className={AdProductCss.productStatus} id="productStatus">판매상태</div>
                            </div>

                            <div className={AdProductCss.productItemListBox}>
                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기asdfffffffffffffffffff sdfsdcpm,dsp sdf 밥솥 새프런 옐로우</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥 새프런 옐로우</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>

                                <div className={AdProductCss.productItem}>
                                    <div className={AdProductCss.check}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={AdProductCss.productNo} id="productNo">RPD001</div>
                                    <div className={AdProductCss.storeName} id="storeName">LG 생활가구</div>
                                    <div className={AdProductCss.category} id="category">밥솥</div>
                                    <div className={AdProductCss.productName} id="productName">딤채쿡 6인용 전기밥솥</div>
                                    <div className={AdProductCss.createAt} id="createAt">2025.02.25</div>
                                    <div className={AdProductCss.productStatus} id="productStatus">판매불가</div>
                                </div>
                            </div>

                        </div>

                        <div className={AdProductCss.paginationDiv}>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct;