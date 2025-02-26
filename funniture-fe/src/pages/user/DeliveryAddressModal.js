import DeliveryAddressCss from "./deliveryAddressModal.module.css";
import { useState } from "react";

function DeliveryAddressModal({deliveryAddressList, onAddressSelect, defaultAddress}) {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);  // 신규 배송지 드롭다운 상태

    // 토글 상태 변경해주기 
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // 선택 된 배송지로 변경 (예약등록페이지)
    const handleAddressClick = (address) => {
        onAddressSelect(address);  // 선택된 배송지 업데이트
    };
    
    // 현재 선택된 주소가 기본 배송지인지 확인 => ✔선택됨
    const isSelected = (address) => {
        return address.destinationNo === defaultAddress?.destinationNo;
    };

    return(
        <div className={DeliveryAddressCss.modalContainer}>
            <div className={DeliveryAddressCss.modalHeader}>
                <h3>배송지 변경</h3>
            </div>

            {/* registerBtnContainer 영역을 눌렀을 때 드롭다운 되게 하기 */}
            <div className={DeliveryAddressCss.registerBtnContainer}
                 id="openModal"
                 onClick={toggleDropdown}>

                {/* 배송지 신규입력을 누른 유무로 +, - 변환하기 */}
                <div
                    className={
                        isDropdownVisible
                            ? DeliveryAddressCss.minusIcon
                            : DeliveryAddressCss.plusIcon
                    }
                >
                    {isDropdownVisible ? '-' : '+'}
                </div>
                <div className={DeliveryAddressCss.registerBtn}>배송지 신규입력</div>

            </div>
            {/* Dropdown 내용 */}
            {isDropdownVisible && (
                <div className={DeliveryAddressCss.dropdownContent}>
                    <div>
                        <div>배송지 이름 : <input type="text"/></div>
                        <div>등록</div>
                    </div>
                    <div>
                        <div>받는 분 : <input type="text"/></div>
                    </div>
                    <div>
                        <div>주소 : </div>
                        <div>주소찾기</div>
                    </div>
                    <div>
                        <div>상세주소 : <input type="text"/></div>
                    </div>
                </div>
            )}

            {deliveryAddressList.length > 0 ? (
                deliveryAddressList.map((address) => (
                    <div className={DeliveryAddressCss.addressInfoContainer} key={address.destinationNo}>
                        <div className={DeliveryAddressCss.addressTitle}>
                            
                            <div>
                                <div>
                                    <div>{address.receiver} ({address.destinationName})</div>
                                    {/* isDefault 가 true(1)라면 기본배송지 div 보여주기 */}
                                    {address.isDefault === 1 && <div>기본배송지</div>}
                                </div>
                                <div>
                                {/* address.destinationNo === defaultAddress?.destinationNo 확인하여 선택된 배송지를 구별 */}
                                {isSelected(address) 
                                    ? <div className={DeliveryAddressCss.defaultAddress}><span>✔</span> 선택됨</div>
                                    : <div onClick={() => handleAddressClick(address)} className={DeliveryAddressCss.otherAddress}>선택</div>
                                }
                                </div>
                            </div>                           
                        </div>

                        <div className={DeliveryAddressCss.addressInfo}>
                            <div>{address.destinationPhone}</div>
                            <div>{address.destinationAddress}</div>
                            <div>
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </div>

                        <hr className={DeliveryAddressCss.addressHr} />
                    </div>
                ))
            ) : (
                <div>배송지가 없습니다.</div>
            )}
            
        </div>
    );
}

export default DeliveryAddressModal;