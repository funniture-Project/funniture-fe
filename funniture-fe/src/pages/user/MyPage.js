import './mypage.css'
import profileImg from '../../assets/images/profiletest.jpg'
import { Outlet } from "react-router-dom"
import sackDollarIcon from "../../assets/icon/sack-dollar-solid.svg";
import clockRotateIcon from "../../assets/icon/clock-rotate-left-solid.svg";
import truckIcon from "../../assets/icon/truck-solid.svg";
import checkIcon from "../../assets/icon/check-solid.svg";

function MyPage() {

    return (
        <div className='mypage'>
            <div className="mypageMenu">
                <div className='userInfo'>
                    <img src={profileImg} alt="프로필 이미지" />
                    <div>
                        <div className='name'>이은미 님</div>
                        <div className='email'>testEmail@gmail.com</div>
                    </div>
                </div>

                <div className='pointCupon'>
                    <div>
                        <div>포인트</div>
                        <div>5,000 Point</div>
                    </div>
                    <div>
                        <div>쿠폰</div>
                        <div>3개</div>
                    </div>
                </div>

                <div className='rentalStatusIconBox'>
                    <div><img src={sackDollarIcon} alt="예약완료 아이콘"/></div>
                    <hr/>
                    <div><img src={clockRotateIcon} alt="배송준비중 아이콘"/></div>
                    <hr/>
                    <div><img src={truckIcon} alt="배송중 아이콘"/></div>
                    <hr/>
                    <div><img src={checkIcon} alt="배송완료 아이콘"/></div>
                </div>
                <div className='rentalStatusBox'>
                    <div>예약완료</div>
                    <div>배송준비중</div>
                    <div>배송중</div>
                    <div>배송완료</div>
                </div>
                <div className='rentalStatusNumberBox'>
                    <div>1</div>
                    <div>3</div>
                    <div>5</div>
                    <div>10</div>
                </div>
                

                <div className='userMypageTap'>
                    <div className='tapTitle'>나의 활동</div>
                    <div className='myPageSubTapTitle'>
                        <div>주문/배송</div>
                        <div>사용상품/반납</div>
                        <div>문의내역</div>
                        <div>리뷰</div>
                        <div>관심상품</div>
                        <div>최근본상품</div>
                    </div>

                    <div className='tapTitle'>정보 관리</div>
                    <div className='myPageSubTapTitle'>
                        <div>회원정보수정</div>
                        <div>배송지관리</div>
                    </div>
                </div>
            </div>
            <div className='mypageContent'>
                <Outlet />
            </div>
        </div>
    )

}

export default MyPage