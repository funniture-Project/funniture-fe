import DeliveryAddressCss from "./deliveryAddressModal.module.css";
import { useState } from "react";

function DeliveryAddressModal() {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
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
                        <div>배송지 이름 : <input type="text" placeholder="이름 입력" /></div>
                        <div>등록</div>
                    </div>
                    <div>
                        <div>받는 분 : <input type="text" placeholder="이름 입력" /></div>
                    </div>
                    <div>
                        <div>주소 : </div>
                        <div>주소찾기</div>
                    </div>
                    <div>
                        <div>상세주소 : <input type="text" placeholder="이름 입력" /></div>
                    </div>
                </div>
            )}

            <div className={DeliveryAddressCss.addressTitle}>
                <div>
                    <div>
                        <div>정은미(은미네)</div>
                        <div>기본배송지</div>
                    </div>
                    <div>
                        <div>선택</div>
                    </div>
                </div>
            </div>
            <div className={DeliveryAddressCss.addressInfo}>
                <div>010-4125-3938</div>
                <div>서울 서대문구 연세로 8-1 버티고타워 7층</div>
                <div>
                    <div>수정</div>
                    <div>삭제</div>
                </div>  
            </div>
            <hr className={DeliveryAddressCss.addressHr}/>
        </div>
    );
}

export default DeliveryAddressModal;