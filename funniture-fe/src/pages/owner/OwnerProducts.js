import OwProductCss from './ownerProduct.module.css'
import Pagination from '../../component/Pagination'

function OwnerProducts() {

    return (
        <div className={OwProductCss.wholeContainer}>
            <div className={OwProductCss.title}>등록상품</div>

            <div className={OwProductCss.productBox}>
                <div className={OwProductCss.Btns}>
                    <div className={OwProductCss.StatusBtn}>
                        <select name="status" id="status">
                            <option value="판매중">판매중</option>
                            <option value="품절">품절</option>
                            <option value="삭제요청">삭제</option>
                        </select>
                        <button>상태변경</button>
                    </div>
                    <button>등록하기</button>
                </div>
                <div className={OwProductCss.productList}>
                    <div className={OwProductCss.productItemBox}>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>cdscsd sd cas ssddasdv s sdscsdvd 쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠 asdfd s sadaaasd</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                        <div className={OwProductCss.productItem}>
                            <input type="checkbox" value="PRD001" />
                            <div className={OwProductCss.imgBox}>
                                <img src={require('../../assets/images/a.jpg')} alt="상품 이미지" />
                            </div>
                            <div>PRD001</div>
                            <div className={OwProductCss.productInfo}>
                                <div className={OwProductCss.productName}>쿠쿠</div>
                                <div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                    <div className={OwProductCss.productRentalInfo}>
                                        <div>1개월</div>
                                        <div>19,000 원</div>
                                    </div>
                                </div>
                            </div>
                            <div className={OwProductCss.productStatus}>판매중</div>
                            <div>재고 2개</div>
                            <div className={OwProductCss.editBtns}>
                                <button>수정하기</button>
                                <button>삭제하기</button>
                            </div>
                        </div>
                    </div>

                    <div className={OwProductCss.pagination}>
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default OwnerProducts