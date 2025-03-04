import DeliveryCss from "./deliveryAddress.module.css";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { getDeliveryAddressListData, putDefaultAddress, putAddressDelete } from '../../apis/DeliveryAddressAPI';
import BtnModal from '../../component/BtnModal';  

function DeliveryAddress() {

    // 사용자 꺼내오기
    const { user } = useSelector(state => state.member)
    const { memberId } = user

    // 드롭다운
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);  // 신규 배송지 드롭다운 상태
    const [updateDropdownVisible, setUpdateDropdownVisible] = useState({});  // 배송지 수정 드롭다운

    // 데이터
    const [deliveryAddressList, setDeliveryAddressList] = useState([]); // 전체 배송지리스트 조회

    // 모달
    const [showAddressDeleteModal, setAddressDeleteModal] = useState(false);  // 배송지 삭제 모달
    const [showDefaultAddressChangeModal, setDefaultAddressChangeModal] = useState(false);  // 배송지 삭제 모달

    // 데이터 호출 함수
    async function getData(memberId) {
            try {
                const data = await getDeliveryAddressListData(memberId);
                setDeliveryAddressList(data.results.addressList);
    
            } catch (error) {
                console.error('배송지를 찾을 수 없음', error);
            }
        }

    // 기본배송지로 수정 핸들러
    const handleDefaultAddressChange = async(destinationNo) => {
        await putDefaultAddress(destinationNo);
        getData(memberId);
        setDefaultAddressChangeModal(true);
    }

    // 배송지 삭제 핸들러
    const handleAddressDelete =  async(destinationNo) => {
        await putAddressDelete(destinationNo);
        getData(memberId);
        setAddressDeleteModal(true);
    }

    useEffect(() => {
        getData(memberId);
    }, [memberId]);
    
    // 토글 상태 변경해주기 
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // 배송지 수정 드롭다운 토글
    const updateToggleDropdown = (destinationNo) => {
        setUpdateDropdownVisible(prevState => ({
            ...prevState,
            [destinationNo]: !prevState[destinationNo]  // 해당 배송지의 드롭다운만 토글
        }));
    };


    return(
        <div className={DeliveryCss.deliveryContainer}>
            <div className={DeliveryCss.modalContainer}>
            <div className={DeliveryCss.modalHeader}>
                <h3>배송지 변경</h3>
            </div>

            {/* registerBtnContainer 영역을 눌렀을 때 드롭다운 되게 하기 */}
            <div className={DeliveryCss.registerBtnContainer}
                id="openModal"
                onClick={toggleDropdown}>

                {/* 배송지 신규입력을 누른 유무로 +, - 변환하기 */}
                <div
                    className={
                        isDropdownVisible
                            ? DeliveryCss.minusIcon
                            : DeliveryCss.plusIcon
                    }
                >
                    {isDropdownVisible ? '-' : '+'}
                </div>
                <div className={DeliveryCss.registerBtn}>배송지 신규입력</div>

            </div>
            {/* Dropdown 내용 */}
            {isDropdownVisible && (
                <div className={DeliveryCss.dropdownContent}>
                    <div>
                        <div>배송지 이름 : <input type="text"/></div>
                        <div>등록</div>
                    </div>
                    <div>
                        <div>받는 분 : <input type="text"/></div>
                    </div>
                    <div>
                        <div>전화번호 : <input type="text"/></div>
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
                    <div className={DeliveryCss.addressInfoContainer} key={address.destinationNo}>
                        <div className={DeliveryCss.addressTitle}>
                            
                            <div>
                                <div>
                                    <div>{address.receiver} ({address.destinationName})</div>
                                    {/* isDefault 가 true(1)라면 기본배송지 div 보여주기 */}
                                    {address.isDefault === 1 && <div>기본배송지</div>}
                                </div>
                                <div>
                                {address.isDefault === 0 &&
                                    <img 
                                        onClick={() => handleDefaultAddressChange(address.destinationNo)} 
                                        className={DeliveryCss.otherAddress}
                                        src={require(`../../assets/icon/circle-check-solid.svg`).default}
                                        alt="기본 배송지로 선택" />
                                        
                                }
                                {address.isDefault === 1 &&
                                    <img 
                                        onClick={() => handleDefaultAddressChange(address.destinationNo)} 
                                        className={DeliveryCss.otherAddress}
                                        src={require(`../../assets/icon/circle-check-solid-brown.svg`).default}
                                        alt="기본 배송지" />
                                }
                                </div>
                            </div>                           
                        </div>

                        <div className={DeliveryCss.addressInfo}>
                            <div>{address.destinationPhone}</div>
                            <div>{address.destinationAddress}</div>
                            <div>
                                <div onClick={() => updateToggleDropdown(address.destinationNo)}>수정</div>
                                <div onClick={() => handleAddressDelete(address.destinationNo)}>삭제</div>
                            </div>
                        </div>

                        <hr className={DeliveryCss.addressHr} />

                        {updateDropdownVisible[address.destinationNo] && (
                            <div className={DeliveryCss.dropdownContent}>
                                <div>
                                    <div>배송지 이름 : <input type="text"/></div>
                                    <div>등록</div>
                                </div>
                                <div>
                                    <div>받는 분 : <input type="text" /></div>
                                </div>
                                <div>
                                    <div>전화번호 : <input type="text"/></div>
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
            
                    </div>
                ))

                
            ) : (
                <div>배송지가 없습니다.</div>
            )}
            
        </div>

        {/* 배송지 삭제 확인 모달 */}
        <BtnModal
                showBtnModal={showAddressDeleteModal}
                setShowBtnModal={setAddressDeleteModal}
                btnText="확인"
                modalContext="배송지가 삭제되었습니다."
                modalSize="sm"
        />
        {/* 기본배송지 등록 확인 모달 */}
        <BtnModal
                showBtnModal={showDefaultAddressChangeModal}
                setShowBtnModal={setDefaultAddressChangeModal}
                btnText="확인"
                modalContext="기본 배송지로 선택되었습니다."
                modalSize="sm"
        />
    </div>
);
}

export default DeliveryAddress;