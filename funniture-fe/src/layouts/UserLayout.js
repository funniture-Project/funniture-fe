import { Outlet, useLocation } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"
import './userLayout.css'
import banner1 from '../assets/images/banner(1).png'

function UserLayout() {

    const location = useLocation();

    return (
        <div className="layout">
            <Header />
            {location.pathname == '/' ? (
                <div>
                    < img className='bannerImg' src={banner1} alt="배너 사진 1" />
                    <div className="categoryBtns">
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                        <div>카테고리</div>
                    </div>
                </div>
            ) : null}
            <div className="mainContent" style={location.pathname != '/' ? { "marginTop": "2.5%" } : null}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout