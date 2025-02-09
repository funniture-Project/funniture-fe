import './adminlayout.css'
import textLogoWhite from '../assets/images/text_logo-white.png'
import imgLogoWhite from '../assets/images/logo-image-white.png'
import { NavLink } from 'react-router-dom';

function AdminLayout() {

    const actstyle = {
        backgroundColor: "#FCF4EE",
        color: "#7F5539"
    }

    return (
        <div className="adminPage">
            <div className="adminMenuBar">
                <img className='chairImg' src={imgLogoWhite} alt="로고이미지" />
                <img src={textLogoWhite} alt="로고이미지" />

                <div className="menus">
                    <NavLink to="/admin" className={({ isActive }) => (isActive ? "selectedMenu" : "")}>
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
        </div>
    )
}

export default AdminLayout