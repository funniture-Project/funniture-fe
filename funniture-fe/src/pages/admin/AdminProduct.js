import AdminTop from "../../component/adminpage/AdminTop";

function AdminProduct() {
    return (
        <>
            <AdminTop title={'제품 관리'} />

            <div>
                {/* 제품 검색 조건 박스 */}
                <div>
                    <label htmlFor="storeOption">업체 :</label>
                    <select name="store" id="storeOption">
                        <option value="">업체 명</option>
                        <option value="memberNo">업체 명</option>
                        <option value="memberNo">업체 명</option>
                    </select>

                    <label htmlFor="categoryOption">카테고리리 :</label>
                    <select name="category" id="categoryOption">
                        <option value="">카테고리 명</option>
                        <option value="categoryNo">카테고리 명</option>
                    </select>

                    <label htmlFor="statusOption">판매상태 :</label>
                    <select name="status" id="statusOption">
                        <option value="">판매상태</option>
                        <option value="statusText">판매상태</option>
                    </select>

                    <label htmlFor="searchTextOption">검색 :</label>
                    <input type="text" name="searchText" id="searchTextOption" />
                </div>

                {/* 검색 결과 박스 */}
                <div>
                    <div>작업버튼</div>
                    <div>결과 리스트</div>
                </div>
            </div>
        </>
    )
}

export default AdminProduct;