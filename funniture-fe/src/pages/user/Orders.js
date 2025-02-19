import OrdersCss from './orders.module.css';
import { useState, useEffect } from 'react';

function Orders() {


    return(
        <div className={OrdersCss.ordersContainer}>
            <div className={OrdersCss.orderPageTitle}>주문/배송</div>        
            <div className={OrdersCss.rentalPeriodSelector}>
                <div>전체</div><div>1개월</div><div>3개월</div><div>직접선택</div>
            </div>        
            <div className={OrdersCss.orderListContainer}>
                <div className={OrdersCss.orderListItem}>
                    <div className={OrdersCss.status}>
                        <div>
                            배송중
                        </div> 
                    </div>
                    <div className={OrdersCss.statusAndProductImgBox}>
                        <div className={OrdersCss.productImg}>
                            <img src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지 입니다" />
                        </div>
                        <div className={OrdersCss.ordersInfo}>
                            <div>주문번호 202501191</div>
                            <div>2025/01/16 20:16 결제</div>
                            <div>쿠쿠_전기밥솥_10인용</div>
                            <div>29,000원</div>
                            <div>
                                <a href="#">주문상세 &gt;</a>
                            </div>
                        </div>
                        <div className={OrdersCss.inquiryButton}>
                            <div>문의하기</div>
                        </div>
                    </div>
                </div>

                <div className={OrdersCss.orderListItem}>
                    <div className={OrdersCss.status}>
                        <div>
                            배송중
                        </div> 
                    </div>
                    <div className={OrdersCss.statusAndProductImgBox}>
                        <div className={OrdersCss.productImg}>
                            <img src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지 입니다" />
                        </div>
                        <div className={OrdersCss.ordersInfo}>
                            <div>주문번호 202501191</div>
                            <div>2025/01/16 20:16 결제</div>
                            <div>쿠쿠_전기밥솥_10인용</div>
                            <div>29,000원</div>
                            <div>
                                <a href="#">주문상세</a>
                            </div>
                        </div>
                        <div className={OrdersCss.inquiryButton}>
                            <div>문의하기</div>
                        </div>
                    </div>
                </div>


                

            </div>       
        </div>
        
    );

}

export default Orders