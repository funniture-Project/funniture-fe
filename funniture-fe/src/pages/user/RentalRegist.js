import RentalRegistCss from './rentalRegist.module.css'
import { useLocation } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { getDefaultDeliveryAddressList, getDeliveryAddressListData } from '../../apis/DeliveryAddressAPI';
import { getCurrentPoint } from '../../apis/PointAPI';
import BtnModal from '../../component/BtnModal';
import DeliveryAddressModal from './DeliveryAddressModal';
import { postRentalReservation } from '../../apis/RentalAPI'; 

function RentalRegist () {

    const location = useLocation();
    
    // 상품 상세페이지에서 넘어오는 데이터
    const {selectRentalOption} = location.state  // 렌탈 조건 정보
    const {productInfo} = location.state         // 상품 정보
    const {rentalNum} = location.state           // 렌탈 갯수

    // 예약 등록 페이지 조회 데이터
    const [defaultAddress, setDefaultAddress] = useState([]);   // 기본배송지 조회
    const [currentPoint, setCurrentPoint] = useState({});   // 보유 포인트 조회

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

    useEffect(() => {
        getDefaultAddressData("MEM011");
    }, []);

    useEffect(() => {
        getCurrentPointData("MEM011");
    }, [])

    // 렌탈 등록 !!
    const handlePaymentClick = async () => {
        try {
            // 필요한 데이터 준비
            const rentalData = {
                memberId: "MEM011", // 실제 로그인된 memberId로 대체
                productNo: productInfo.productNo,
                rentalNumber: rentalNum,
                rentalInfoNo: selectRentalOption.rentalInfoNo,
                destinationNo: defaultAddress.destinationNo
            };
        
            // API 호출
            const response = await postRentalReservation(rentalData);
        
            // 성공 시 처리할 로직
            console.log('예약 등록 성공:', response);
            // 예: 예약 성공 후 페이지 이동, 모달 열기 등
        
        } catch (error) {
            console.error('예약 등록 실패:', error);
            // 실패 시 처리할 로직
        }
        };
    
// ------------------------------------------------ 배송지 변경 ------------------------------------------------

const [deliveryAddressList, setDeliveryAddressList] = useState([]); // 전체 배송지리스트 조회(모달창)
const [showBtnModal, setShowBtnModal] = useState(false); // 배송지 변경 모달창 상태
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // 변경 완료 모달 상태

    // 배송지 선택 모달 열기 핸들러
    // 모달 열기 핸들러
    const onClickHandler = async () => {
        const data = await getDeliveryAddressListData("MEM011");  // 모달이 열릴 때 API 호출
        setDeliveryAddressList(data.results.addressList);
        setShowBtnModal(true);
    };

    // 배송지 선택 후, 상태 갱신
    const handleAddressSelect = (address) => {
        setDefaultAddress(address);   // 기본 배송지 변경
        setShowBtnModal(false);       // 배송지 변경 모달 닫기
        setShowConfirmationModal(true); // 변경 완료 모달 띄우기
    };

    // 계산 되는 것 변수 처리(할인가격, 렌탈 가격, 구매 적립 포인트)
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
                                <div>{defaultAddress ? defaultAddress.receiver : '배송지 없음'} ({defaultAddress.destinationName})</div>
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
                                    <div>{formatNumber(finalPriceThisMonth)}</div>
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
                <div className={RentalRegistCss.buttonContainer} onClick={handlePaymentClick}>
                    <div>결제하기</div>
                </div>
            </div>

            {/* 배송지 변경 모달 */}
            {showBtnModal && (
                <BtnModal
                showBtnModal={showBtnModal}
                setShowBtnModal={setShowBtnModal}
                // btnText="확인"
                modalContext="로그인 후 이용 가능합니다."
                modalSize="lg"
                childContent={<DeliveryAddressModal 
                    deliveryAddressList={deliveryAddressList} // 전체 배송지 리스트
                    onAddressSelect={handleAddressSelect} // ✔ 선택됨이 업데이트되기위한 핸들러
                    defaultAddress={defaultAddress} // 기본 배송지 전달
                    />
                    }
                />
            )}

            {/* 변경 완료 모달 */}
            {showConfirmationModal && (
                <BtnModal
                    showBtnModal={showConfirmationModal}
                    setShowBtnModal={setShowConfirmationModal}
                    modalContext="배송지가 변경되었습니다."
                    modalSize="sm"
                    btnText="확인"
                    onClose={() => setShowConfirmationModal(false)} // 확인 후 모달 닫기
                />
            )}

            
        </>
    );
}

export default RentalRegist