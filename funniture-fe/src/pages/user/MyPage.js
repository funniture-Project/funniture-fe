import './mypage.css'
import profileImg from '../../assets/images/profiletest.jpg'
import { Outlet } from "react-router-dom"
import sackDollarIcon from "../../assets/icon/sack-dollar-solid.svg";
import clockRotateIcon from "../../assets/icon/clock-rotate-left-solid.svg";
import truckIcon from "../../assets/icon/truck-solid.svg";
import checkIcon from "../../assets/icon/check-solid.svg";
import { Link } from "react-router-dom";
import { useState } from 'react';

function MyPage() {

    const [activeTab, setActiveTab] = useState('orders');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                        <div 
                            onClick={() => handleTabClick('orders')}
                            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>주문/배송</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('return')}
                            className={`tab ${activeTab === 'return' ? 'active' : ''}`}>
                            <Link to={`/mypage/returns`} className='link'>사용상품/반납</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('inquiries')}
                            className={`tab ${activeTab === 'inquiries' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>문의내역</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('reviews')}
                            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>리뷰</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('favorites')}
                            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>관심상품</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('recent')}
                            className={`tab ${activeTab === 'recent' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>최근본상품</Link>
                        </div>
                    </div>

                    <div className='tapTitle'>정보 관리</div>
                    <div className='myPageSubTapTitle'>
                        <div 
                            onClick={() => handleTabClick('info')}
                            className={`tab ${activeTab === 'info' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>회원정보수정</Link>
                        </div>
                        <div 
                            onClick={() => handleTabClick('address')}
                            className={`tab ${activeTab === 'address' ? 'active' : ''}`}>
                            <Link to={`/mypage`} className='link'>배송지관리</Link>
                        </div>
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