import DeliveryAddressCss from "./deliveryAddressModal.module.css";
import { useState } from "react";

function DeliveryAddressModal({deliveryAddressList, onAddressSelect}) {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleAddressClick = (address) => {
        onAddressSelect(address);  // 선택된 배송지 업데이트
    };

    return(
        <div className={DeliveryAddressCss.modalContainer}>
            <div className={DeliveryAddressCss.modalHeader}>
                <h3>배송지 변경</h3>
            </div>

            <div className={DeliveryAddressCss.registerBtnContainer}
                 id="openModal"
                 onClick={toggleDropdown}>
                
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
            {/* Dropdown content */}
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
                                    {address.isDefault === 1 && <div>기본배송지</div>}
                                </div>
                                <div>
                                {address.isDefault === 1 
                                    ? <div className={DeliveryAddressCss.defaultAddress}><span>✔</span> 선택됨</div>
                                    : <div className={DeliveryAddressCss.otherAddress}>선택</div>
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