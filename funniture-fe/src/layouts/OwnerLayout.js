import './ownerlayout.css'
import { Outlet, useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import profileImg from '../assets/images/profiletest.jpg'

function OwnerLayout() {
    const navigate = useNavigate();

    const actstyle = {
        backgroundColor: "#7F5539",
        color: "#ffffff"
    }

    return (
        <div className="owner">
            <div className="ownerMenuBar">

                {/* 제공자 정보 */}
                <div className='ownerInfo'>
                    <img src={profileImg} alt="프로필 이미지" onClick={() => { navigate('/owner') }} />
                    <div className='name'>이은미 님</div>
                    <div className='email'>testEmail@gmail.com</div>
                </div>

                {/* 제공자 마이페이지 메뉴 */}
                <div className="menus">
                    <NavLink to="/owner/ownerInfo" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>업체 정보</div>
                    </NavLink>

                    <NavLink to="/owner/product" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>등록 상품</div>
                    </NavLink>

                    <NavLink to="/owner/rentallist" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>예약 조회</div>
                    </NavLink>

                    <NavLink to="/owner/review" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>리뷰</div>
                    </NavLink>

                    <NavLink to="/owner/inquiry" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>문의 사항</div>
                    </NavLink>
                    <NavLink to="/owner/notice" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>공지사항</div>
                    </NavLink>
                    <NavLink to="/owner/sales" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>정산관리</div>
                    </NavLink>
                </div>
            </div>
            <div className='ownerMainContent'>
                <Outlet />
            </div>
        </div>
    )
}

export default OwnerLayout