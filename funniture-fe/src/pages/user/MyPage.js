import './mypage.css'
import profileImg from '../../assets/images/profiletest.jpg'
import { Outlet } from "react-router-dom"

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
            </div>
            <div className='mypageContent'>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <h1>내용</h1>
                <Outlet />
            </div>
        </div>
    )

}

export default MyPage