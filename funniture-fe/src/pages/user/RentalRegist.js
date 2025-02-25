import RentalRegistCss from './rentalRegist.module.css'
import { useLocation } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { getDefaultDeliveryAddressList } from '../../apis/DeliveryAddressAPI';
import { getDeliveryAddressListData } from '../../apis/DeliveryAddressAPI';
import { getCurrentPoint } from '../../apis/PointAPI';
import BtnModal from '../../component/BtnModal';
import DeliveryAddressModal from './DeliveryAddressModal';

function RentalRegist () {

    const location = useLocation();
   
    const {selectRentalOption} = location.state  // 렌탈 조건 정보
    const {productInfo} = location.state         // 상품 정보
    const {rentalNum} = location.state           // 렌탈 갯수

    const [deliveryAddressList, setDeliveryAddressList] = useState([]); // 변경버튼 누를 시 -> 배송지 전체 조회(모달창)
    const [currentPoint, setCurrentPoint] = useState({});   // 보유 포인트 조회
    const [showBtnModal, setShowBtnModal] = useState(false); // 배송지 모달창
    const [defaultAddress, setDefaultAddress] = useState([]);   // 기본배송지 조회
    const [selectedAddress, setSelectedAddress] = useState(null); // 선택 된 배송지 상태 

    // 기본 배송지 불러오기
    async function getDefaultAddressData(memberId) {
        try {
            const data = await getDefaultDeliveryAddressList(memberId);
            setDefaultAddress(data.results.defaultAddressList[0]);
            
        } catch (error) {
            console.error('기본배송지를 불러오는 데 실패 : ', error);
        }
    }

    // 보유 포인트 불러오기 
    async function getCurrentPointData(memberId) {
        try {
            const data = await getCurrentPoint(memberId);
            setCurrentPoint(data.results);
            console.log('data', data);
        } catch (error) {
            console.error('보유 포인트를 불러오는 데 실패 : ', error);
        }
    }

    // 배송지 선택 모달 열기 핸들러
    // 모달 열기 핸들러
    const onClickHandler = async () => {
        const data = await getDeliveryAddressListData("MEM011");  // 모달이 열릴 때 API 호출
        setDeliveryAddressList(data.results.addressList);
        setShowBtnModal(true);
    };
    
    useEffect(() => {
        getDefaultAddressData("MEM011");
    }, []);

    useEffect(() => {
        getCurrentPointData("MEM011");
    }, [])

    // 배송지 선택 후, 상태 갱신
    const handleAddressSelect = (address) => {
        setSelectedAddress(address);  // 선택된 주소 상태로 설정
        setDefaultAddress(address);   // 기본 배송지로 반영
    };
 

    // 계산 되는 것 변수 처리
    const totalRentalPrice = selectRentalOption.rentalPrice * rentalNum; // 총 렌탈 가격
    const discountAmount = totalRentalPrice * 0.1; // 할인 금액 (10%) => 나중에 할인쿠폰 하면 0.1 도 할인쿠폰마다 달라져야함
    const finalPriceThisMonth = totalRentalPrice - discountAmount; // 이번 달 결제 금액
    const pointEarned = totalRentalPrice * 0.01; // 구매 적립 포인트

    // 숫자를 1,000 형식으로 변환
    const formatNumber = (num) => {
        if (typeof num !== "number" || isNaN(num)) {
            return "0";  // 값이 없거나 숫자가 아니면 기본값 0 반환
        }
        return num.toLocaleString();
    };

    return(
        <>
            <div>
                {/* 전체를 감싸는 컨테이너 */}
                <div className={RentalRegistCss.container}>
                    {/* 렌탈 정보 컨테이너 (왼쪽) */}
                    <div className={RentalRegistCss.rentalInfoContainer}>
                        <h3>배송지</h3>
                        <div className={RentalRegistCss.deliverySection}>
                            <div>
                                <div>{defaultAddress ? defaultAddress.receiver : '배송지 없음'}</div>
                                <div className={RentalRegistCss.deliveryChangeBtn} onClick={onClickHandler}>변경</div>
                            </div>
                            <div>{defaultAddress ? defaultAddress.destinationPhone : ''}</div>
                            <div>{defaultAddress ? defaultAddress.destinationAddress : ''}</div>
                            <select>
                                <option value="">배송 메모를 선택해주세요.</option>
                            </select>
                        </div>

                        <h3>주문상품</h3>
                        <div className={RentalRegistCss.orderItemSection}>
                            <div>{productInfo.ownerInfo.storeName}</div>
                            <div className={RentalRegistCss.rentalInfoSubSection}>
                                <img className={RentalRegistCss.rentalProductImg} src={require(`../../assets/images/testImg.JPG`)} alt="상품 이미지" />
                                <div>
                                    <div>상품명 : {productInfo.productName}</div>
                                    <div>약정기간 : {selectRentalOption.rentalTerm}개월</div>
                                    <div>A/S횟수 : {selectRentalOption.asNumber}회</div>
                                </div>
                            </div>
                            <div>
                                <div>수량</div>
                                <div>{rentalNum}개</div>
                            </div>
                        </div>

                        <div className={RentalRegistCss.discountSection}>
                            <div>
                                <div>
                                    <div>할인/쿠폰</div>
                                    <div>사용</div>
                                </div>
                                <div>- {formatNumber(discountAmount)} <span>원</span></div>
                            </div>
                            <hr className={RentalRegistCss.rentalRegistHr}/>
                            <div>
                                <div>이번달 결제금액</div>
                                <div>
                                    <div>{formatNumber(totalRentalPrice)} 원</div>
                                    <div>{formatNumber(finalPriceThisMonth)} <span>원</span></div>
                                </div>
                            </div>
                        </div>

                        <h3>포인트</h3>
                        <div className={RentalRegistCss.pointSection}>
                            <div>
                                <div>보유포인트</div>
                                <div>{formatNumber(currentPoint.availablePoints)} <span>원</span></div>
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
                                    <div>{formatNumber(discountAmount)} <span>원</span></div>
                                </div>
                                <div>
                                    <div>포인트 사용</div>
                                    <div>{formatNumber(finalPriceThisMonth)} <span>원</span></div>
                                </div>
                                <div>
                                    <div>렌탈가</div>
                                    <div>{formatNumber(selectRentalOption.rentalPrice)} <span>원</span> {"*"} {rentalNum} <span>개</span></div>
                                </div>
                                <hr className={RentalRegistCss.rentalRegistHr}/>
                                <div>
                                    <div>이번달 결제금액</div>
                                    <div>{formatNumber(finalPriceThisMonth)} <span>원</span></div>
                                </div>
                                <div>
                                    <div>다음달 결제금액</div>
                                    <div>{formatNumber(totalRentalPrice)} <span>원</span></div>
                                </div>
                            </div>

                            <h3>포인트 혜택</h3>
                            <div className={RentalRegistCss.pointAddSection}>
                                <div>
                                    <div>구매적립</div>
                                    <div>{pointEarned} <span>원</span></div>
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

            {/* 모달 */}
            {showBtnModal && (
                <BtnModal
                showBtnModal={showBtnModal}
                setShowBtnModal={setShowBtnModal}
                // btnText="확인"
                modalContext="로그인 후 이용 가능합니다."
                modalSize="lg"
                childContent={<DeliveryAddressModal deliveryAddressList={deliveryAddressList} onAddressSelect={handleAddressSelect}/>}
                />
            )}
        </>
    );
}

export default RentalRegist