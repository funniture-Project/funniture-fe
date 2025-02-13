import AdminTop from '../../component/adminpage/AdminTop';
import './rental.css'

function Rental() {
    return (
        <>
            <AdminTop title={'예약 정보'} />

            <div className='adminRentalContent'>
                <div className='searchBox'>
                    <select name="rentalState">
                        <option value="" selected>진행상태 선택</option>
                        <option value="예약대기">예약대기</option>
                        <option value="예약완료">예약완료</option>
                        <option value="예약취소">예약취소</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                        <option value="반납요청">반납요청</option>
                        <option value="수거중">수거중</option>
                        <option value="반납완료">반납완료</option>
                    </select>
                    <select name="storeName">
                        <option>회사선택</option>
                    </select>
                    <select name="categoryName">
                        <option value="" selected>분류 선택</option>
                        <option value="가전">가전</option>
                        <option value="가구">가구</option>
                    </select>
                    <input type="date"/>
                    <input type="text"/>
                </div>

                <div className="rentalBox">
                    <table className="rentalTable">
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>회사명</th>
                                <th>진행상태</th>
                                <th>분류명</th>
                                <th>제품명</th>
                                <th>사용시작일/종료일</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>202501191</td>
                                <td>LG홈트</td>
                                <td>예약확정</td>
                                <td>가전</td>
                                <td>입식용 승강형 정기렌탈 세트형 상품</td>
                                <td>2024.12.20 ~ 2026.12.20</td>
                                <td>1개</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <div className="pagination">
                        <span className='arrow'>&lt;&lt;</span>
                        <span className='arrow'>&lt;</span>
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                        <span className='arrow'>&gt;</span>
                        <span className='arrow'>&gt;&gt;</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rental;