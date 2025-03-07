import DeliverInfoCSS from './deliveryInProgressModal.module.css'
import { useState } from 'react';

function DeliveryInProgressModal({selectedOrder, onBtnClick}) {

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [trackingNumber, setTrackingNumber] = useState(selectedOrder.deliveryNo || "");
    const [carrier, setCarrier] = useState(selectedOrder.deliverCom || "");

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // 수정 모드 토글
    };

    const handleSave = () => {
        console.log("저장된 운송장 번호:", trackingNumber);
        console.log("저장된 운송업체명:", carrier);
        setIsEditing(false); // 읽기 전용 상태로 복귀
    };

    return (
        <div className={DeliverInfoCSS.deliverContainer}>
            <div>
                <h3>배송 정보</h3>
                <div onClick={isEditing ? handleSave : handleEditToggle}>
                    {isEditing ? "저장" : "수정"}
                </div>
            </div>

            <hr className={DeliverInfoCSS.deliverHr} />
            <div className={DeliverInfoCSS.rentalContext}>
                <div>예약진행상태 : {selectedOrder.rentalState}</div>
                <div>주문번호 : {selectedOrder.rentalNo}</div>

                {/* 운송장 번호 */}
                <div>
                    운송장 번호 :{" "}
                    {isEditing ? (
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                    ) : (
                        <span>{trackingNumber}</span>
                    )}
                </div>

                {/* 운송업체명 */}
                <div>
                    운송업체명 :{" "}
                    {isEditing ? (
                        <select
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                        >
                            <option value="CJ 대한통운">CJ 대한통운</option>
                            <option value="한진택배">한진택배</option>
                            <option value="로젠택배">로젠택배</option>
                        </select>
                    ) : (
                        <span>{carrier}</span>
                    )}
                </div>

                {/* 배송메모 */}
                <div>배송메모 : {selectedOrder.deliveryMemo}</div>
            </div>

            {/* 배송완료 버튼 */}
            
            <div>
                <button onClick={() => console.log("배송완료 처리")}>
                    배송완료
                </button>
            </div>
            
        </div>
    );
}

export default DeliveryInProgressModal;
