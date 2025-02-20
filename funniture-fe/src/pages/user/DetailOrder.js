import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailOrderCss from "./detailorder.module.css";
import {getOrderDetail} from "../../apis/RentalAPI"

function DetailOrder() {

    const { id } = useParams(); // URL에서 주문번호를 가져옴
    const [order, setOrder] = useState([]);
    const [deliveryMemo, setDeliveryMemo] = useState(""); // 배송 메모 상태
    const deliveryOptions = [
        "문 앞에 놓아주세요",
        "조심히 다뤄주세요",
        "경비실에 맡겨주세요",
        "부재시 연락주세요"
    ];

    // 주문
    useEffect(() => {
        async function fetchData() {
            const data = await getOrderDetail(id);
            setOrder(data.results.rentalDetail[0]);
            console.log('data', data.results.rentalDetail)
        }
        
        fetchData();
    }, []);

    return (
        <div className={DetailOrderCss.orderContainer}>
            {/* 주문번호 및 날짜 */}
            <div className={DetailOrderCss.orderHeader}>
                <div>{order.orderDate}</div>
                <div>
                    <div>주문번호</div>
                    <div>{order.rentalNo}</div>
                </div>
            </div>

            {/* 주문 상품 정보 */}
            <h3>주문상품</h3>
            <div className={DetailOrderCss.productContainer}>
                <div className={DetailOrderCss.productInfo}>
                    <div>
                        <div>{order.storeName}</div>
                        <div>문의하기</div>
                    </div>
                    <div>
                        <div>예약취소</div>
                    </div>
                </div>
                <hr className={DetailOrderCss.orderHr} />
                <div className={DetailOrderCss.orderInfoContainer}>
                    <div>{order.rentalState}</div>
                    <div>
                        <img className={DetailOrderCss.orderImg} src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지" />
                        <div className={DetailOrderCss.orderInfo}>
                            <div>상품명 : {order.productName}</div>
                            <div>대여 기간 : {order.rentalTerm} 개월</div>
                            <div>대여 가격 : {order.rentalPrice} 원</div>
                        </div>
                    </div>
                    <div>
                        <div>수량</div>
                        <div>{order.rentalNumber}개</div>
                    </div>
                </div>
            </div>

            {/* 배송 정보 */}
            <h3>배송지</h3>
            <div className={DetailOrderCss.deliveryContainer}>
                <div>
                    <div><strong>{order.receiver} ({order.destinationName})</strong></div>
                    <div>배송지변경</div>
                </div>
                <div>{order.destinationPhone}</div>
                <div>{order.destinationAddress}</div>
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

            {/* 결제 정보 */}
            <h3>결제정보</h3>
            <div className={DetailOrderCss.paymentContainer}>
                <div>
                    <div>주문금액</div>
                    <div>{order.rentalPrice} 원</div>
                </div>
                <div>
                    <div>
                        <div>상품금액</div>
                        <div>{order.rentalPrice} 원</div>
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
                <hr className={DetailOrderCss.orderHr} />
                <div>
                    <div>포인트 결제</div>
                    <div>{order.rentalPrice} 원</div>
                </div>
            </div>

            {/* 포인트 혜택 */}
            <h3>포인트혜택</h3>
            <div className={DetailOrderCss.pointContainer}>
                <div>
                    <div>
                        <div>구매적립</div>
                        <div>{(order.rentalPrice * 0.1)} 원</div>
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