import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailOrderCss from "./detailorder.module.css";

function DetailOrder() {

    const { id } = useParams(); // URL에서 주문번호를 가져옴
    const [order, setOrder] = useState(null);
    const [deliveryMemo, setDeliveryMemo] = useState(""); // 배송 메모 상태
    const deliveryOptions = [
        "문 앞에 놓아주세요",
        "조심히 다뤄주세요",
        "경비실에 맡겨주세요",
        "부재시 연락주세요"
    ];

    return(
        <div className={DetailOrderCss.orderContainer}>
            <div className={DetailOrderCss.orderHeader}>
                <div>2025.01.19, 20:06:26</div>
                <div>
                    <div>주문번호</div> 
                    <div>202501191</div>
                </div>
            </div>

            <h3>주문상품</h3>
                <div className={DetailOrderCss.productContainer}>
                    <div className={DetailOrderCss.productInfo}>
                        <div>
                            <div>LG헬로🏡</div>
                            <div>문의하기</div>
                        </div>
                        <div>
                            <div>예약취소</div>
                        </div>
                    </div>
                    <hr className={DetailOrderCss.orderHr}/>
                    <div className={DetailOrderCss.orderInfoContainer}>                     
                        <div>예약대기</div>
                        <div>
                            <img className={DetailOrderCss.orderImg} src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지 입니다" />
                            <div className={DetailOrderCss.orderInfo}>
                                
                                <div>상품명: 쿠쿠, 전기밥솥, 10인용</div>
                                <div>약정기간: 36개월</div>
                                <div>관리주기: 20개월/1회 방문</div>
                            </div>  
                        </div>
                        <div>
                            <div>수량</div>
                            <div>1개</div>
                        </div>
                    </div>
                </div>

            <h3>배송지</h3>
                <div className={DetailOrderCss.deliveryContainer}>
                    <div>
                        <div><strong>정은미(은미네)</strong></div>
                        <div>배송지변경</div>
                    </div>
                    <div>010-4125-3938</div>
                    <div>서울 서대문구 연희로 8-1 버티그리타워 7층</div>
                    <div>            
                        <select value={deliveryMemo} onChange={(e) => setDeliveryMemo(e.target.value)}>
                            <option value="">예약 등록 시 배송메모</option>
                            {deliveryOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                        <div>수정</div>
                    </div>
                </div>

            <h3>결제정보</h3>
                <div className={DetailOrderCss.paymentContainer}>
                    
                    <div>
                        <div>주문금액</div>
                        <div>총 2,9000 원</div>
                    </div>

                    <div>
                        <div>
                            <div>상품금액</div>
                            <div>2,9000 원</div>
                        </div>
                        <div>
                            <div>쿠폰할인</div>
                            <div>- 0 원</div>
                        </div>
                        <div>
                            <div>배송비</div>
                            <div>0 원</div>
                        </div>
                    </div>
                    
                    <hr className={DetailOrderCss.orderHr}/>

                    <div>
                        <div>포인트 결제</div>
                        <div>29,000원</div>
                    </div>

                </div>

            <h3>포인트혜택</h3>
                <div className={DetailOrderCss.pointContainer}>
                    <div>
                        <div>
                            <div>구매적립</div>
                            <div>2,900 원</div>
                        </div>
                        <div>
                            <div>리뷰적립</div>
                            <div>최대 150원</div>
                        </div>
                        <p> &#40;동일상품의 상품/한달리뷰 적립은 각 1회로 제한&#41; </p>
                    </div>
                </div>
        </div>
     
    );
}


export default DetailOrder