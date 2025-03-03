import DeliverComModalCSS from './deliverComModal.module.css';

function DeliverComModal({selectedOrder}) {
    console.log("selectedOrder", selectedOrder)

    return(
        
        <div className={DeliverComModalCSS.deliverContainer}>
            <div>
                <h3>운송장 등록</h3>
            </div>
            <hr className={DeliverComModalCSS.deliverHr}/>
            <div className={DeliverComModalCSS.rentalContext}>
                <div>예약진행상태 : {selectedOrder.rentalState}</div>
                <div>주문번호 : {selectedOrder.rentalNo} </div>
                <div>운송장 번호 : <input type="text" /></div>
                <div>
                    <div>운송 업체명 : </div>
                    <select>
                        <option>CJ 대한통운</option>
                        <option>한진택배</option>
                        <option>롯데택배</option>
                        <option>로젠택배</option>
                        <option>우체국택배</option>
                        <option>경동택배</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DeliverComModal;