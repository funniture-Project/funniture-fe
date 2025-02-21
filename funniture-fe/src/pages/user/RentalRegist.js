import RentalRegistCss from './rentalRegist.module.css'

function RentalRegist () {

    return(
        <div>
            {/* 전체를 감싸는 컨테이너 */}
            <div className={RentalRegistCss.container}>
                {/* 렌탈 정보 컨테이너 (왼쪽) */}
                <div className={RentalRegistCss.rentalInfoContainer}>
                    <h3>배송지</h3>
                    <div className={RentalRegistCss.deliverySection}>
                        <div>
                            <div>정은미(은미네)</div>
                            <div>변경</div>
                        </div>
                        <div>010-4125-3938</div>
                        <div>서울 서대문구 연세로 8-1 버티고타워 7층</div>
                        <select>
                            <option value="">배송 메모를 선택해주세요.</option>
                        </select>
                    </div>

                    <h3>주문상품</h3>
                    <div className={RentalRegistCss.orderItemSection}>
                        <div>LG헬로🏡</div>
                        <div className={RentalRegistCss.rentalInfoSubSection}>
                            <img className={RentalRegistCss.rentalProductImg} src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지" />
                            <div>
                                <div>상품명 : 쿠쿠_전기밥솥_10인용</div>
                                <div>약정기간 : 36개월</div>
                                <div>A/S횟수 : 2</div>
                            </div>
                        </div>
                        <div>
                            <div>수량</div>
                            <div>1 개</div>
                        </div>
                    </div>

                    <div className={RentalRegistCss.discountSection}>
                        <div>
                            <div>
                                <div>할인/쿠폰</div>
                                <div>사용</div>
                            </div>
                            <div>- 2,900 원</div>
                        </div>
                        <hr className={RentalRegistCss.rentalRegistHr}/>
                        <div>
                            <div>이번달 결제금액</div>
                            <div>
                                <div>29,000 원</div>
                                <div>26,100 원</div>
                            </div>
                        </div>
                    </div>

                    <h3>포인트</h3>
                    <div className={RentalRegistCss.pointSection}>
                        <div>
                            <div>보유포인트</div>
                            <div>5,000 원</div>
                        </div>
                        <div className={RentalRegistCss.pointSubSection}>
                            <div>
                                <div>사용</div>
                                <div>1,000</div>
                                <div>X</div>
                            </div>
                            <div>
                                <div>전액사용</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 결제 정보 컨테이너 (오른쪽) */}
                <div className={RentalRegistCss.payInfoContainer}>
                        <h3>결제상세</h3>
                        <div className={RentalRegistCss.payInfoSection}>
                            <div>
                                <div>할인쿠폰 사용</div>
                                <div>2,900 원</div>
                            </div>
                            <div>
                                <div>포인트 사용</div>
                                <div>1,000 원</div>
                            </div>
                            <div>
                                <div>렌탈가</div>
                                <div>29,000 원</div>
                            </div>
                            <hr className={RentalRegistCss.rentalRegistHr}/>
                            <div>
                                <div>이번달 결제금액</div>
                                <div>25,100 원</div>
                            </div>
                            <div>
                                <div>다음달 결제금액</div>
                                <div>29,000 원</div>
                            </div>
                        </div>

                        <h3>포인트 혜택</h3>
                        <div className={RentalRegistCss.pointAddSection}>
                            <div>
                                <div>구매적립</div>
                                <div>2,510 <span>원</span></div>
                            </div>
                            <div>
                                <div>리뷰적립</div>
                                <div><span>최대</span> 150 <span>원</span></div>
                            </div>
                            <p> &#40;동일상품의 상품/한달리뷰 적립은 각 1회로 제한&#41; </p>
                        </div>
                </div>
                
            </div>
            <div className={RentalRegistCss.buttonContainer}>
                <div>결제하기</div>
            </div>
        </div>
    );
}

export default RentalRegist