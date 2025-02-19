import OwRegisterCss from './ownerRegister.module.css'

function OwnerRegister() {

    return (
        <div className={OwRegisterCss.wholeContainer}>

            {/* 상품명 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>노출 상품명</div>
                <div className={OwRegisterCss.description}>사용자에게 노출되는 상품명 입니다.</div>
                <div className={OwRegisterCss.productNameBox}>
                    <input type="text" />
                    <div>
                        <div>0</div>
                        <div> / 100</div>
                    </div>
                </div>
            </div>

            {/* 카테고리 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>카테고리</div>
                <div className={OwRegisterCss.description}>필터링에 사용되는 카테고리 입니다.</div>
                <div className={OwRegisterCss.productCategoryBox}>
                    <select name="refCategory" id="refCategory">
                        <option value="">상위 카테고리</option>
                        <option value="1">가전</option>
                        <option value="2">가구</option>
                    </select>
                    <select name="category" id="category">
                        <option value="">상세 카테고리</option>
                        <option value="3">카테고리 1</option>
                        <option value="4">카테고리 1</option>
                    </select>
                </div>
            </div>

            {/* 대표 이미지 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>대표이미지</div>
                <div className={OwRegisterCss.description}>사용자에게 가장먼저 노출되는 상품 사진입니다.</div>
                <div className={OwRegisterCss.productImgBox}>
                    <div></div>
                    <input type="file" />
                </div>
            </div>

            {/* 정상 구매가 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>정상 구매가</div>
                <div className={OwRegisterCss.description}>일반적으로 구매했을 때의 가격을 작성해주세요</div>
                <div className={OwRegisterCss.productPriceBox}>
                    <input type="number" />
                    <div>원</div>
                </div>
            </div>

            {/* 가격 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.OptionPriceTop}>
                    <div>
                        <div className={OwRegisterCss.InfoInputTitle}>가격</div>
                        <div className={OwRegisterCss.description}>렌탈 기간에 따른 가격을 작성해주세요</div>
                    </div>
                    <button>추가하기</button>
                </div>
                <div className={OwRegisterCss.productRentalOptionBox}>
                    <div className={`${OwRegisterCss.RentalInfoItem} ${OwRegisterCss.RentalInfoItemTitle}`}>
                        <div className={OwRegisterCss.rentalTerm}>기간</div>
                        <div className={OwRegisterCss.rentalCost}>가격</div>
                        <div className={OwRegisterCss.rentalAS}>A/S 가능 횟수</div>
                        <div className={OwRegisterCss.removeBtn}></div>
                    </div>
                    <div className={`${OwRegisterCss.RentalInfoItem}`}>
                        <div className={OwRegisterCss.rentalTerm}>
                            <select name="rentalTerm" id="rentalTerm" >
                                <option value="1">1개월</option>
                                <option value="3">3개월</option>
                                <option value="9">9개월</option>
                                <option value="12">12개월</option>
                                <option value="24">24개월</option>
                                <option value="36">36개월</option>
                            </select>
                        </div>
                        <div className={OwRegisterCss.rentalCost}>
                            <input type="number" />
                            <div>원</div>
                        </div>
                        <div className={OwRegisterCss.rentalAS}>
                            <input type="number" />
                            <div>번</div>
                        </div>
                        <div className={OwRegisterCss.removeBtn}>
                            <button>-</button>
                        </div>
                    </div>
                    <div className={`${OwRegisterCss.RentalInfoItem}`}>
                        <div className={OwRegisterCss.rentalTerm}>
                            <select name="rentalTerm" id="rentalTerm" >
                                <option value="1">1개월</option>
                                <option value="3">3개월</option>
                                <option value="9">9개월</option>
                                <option value="12">12개월</option>
                                <option value="24">24개월</option>
                                <option value="36">36개월</option>
                            </select>
                        </div>
                        <div className={OwRegisterCss.rentalCost}>
                            <input type="number" />
                            <div>원</div>
                        </div>
                        <div className={OwRegisterCss.rentalAS}>
                            <input type="number" />
                            <div>번</div>
                        </div>
                        <div className={OwRegisterCss.removeBtn}>
                            <button>-</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 설명 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>상세 설명</div>
                <div className={OwRegisterCss.description}>상품에 대한 설명을 작성해주세요.</div>
                <div className={OwRegisterCss.productDescriptionBox}>
                    <textarea name="" id="">sada
                        fsdfsd
                        cccd
                    </textarea>
                </div>
            </div>

            {/* 재고 */}
            <div className={OwRegisterCss.productInfoInput}>
                <div className={OwRegisterCss.InfoInputTitle}>재고</div>
                <div className={OwRegisterCss.description}>필터링에 사용되는 카테고리 입니다.</div>
                <div className={OwRegisterCss.productCategoryBox}>
                    <div className={OwRegisterCss.stockBox}>
                        <input type="number" />
                        <div>개</div>
                    </div>
                </div>
            </div>

        </div >
    )

}

export default OwnerRegister;