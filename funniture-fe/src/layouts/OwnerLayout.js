import './ownerlayout.css'
import { Outlet } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import profileImg from '../assets/images/profiletest.jpg'

function OwnerLayout() {

    const actstyle = {
        backgroundColor: "#7F5539",
        color: "#ffffff"
    }

    return (
        <div className="owner">
            <div className="ownerMenuBar">
                <div className='ownerInfo'>
                    <img src={profileImg} alt="프로필 이미지" />
                    <div className='name'>이은미 님</div>
                    <div className='email'>testEmail@gmail.com</div>
                </div>

                <div className="menus">
                    <NavLink to="/owner" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
                        <div>메뉴</div>
                    </NavLink>

                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>

                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>

                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>

                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>
                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>
                    <NavLink to="/" style={({ isActive }) => isActive ? actstyle : undefined}>
                        <div>메뉴</div>
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default OwnerLayout