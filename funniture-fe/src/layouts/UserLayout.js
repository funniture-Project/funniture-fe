import { Outlet, useLocation } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"
import './userLayout.css'
import banner1 from '../assets/images/banner(3).jpg'
import washing_machine from '../assets/images/washing_machine.png'
import { useSelector } from "react-redux"

function UserLayout() {

    const location = useLocation();

    const { categoryList, refCategoryCode } = useSelector(state => state.category);

    console.log("main categoryList : ", categoryList)
    console.log("main refCategoryCode : ", refCategoryCode)

    return (
        <div className="layout">
            <Header />

            {/* 사이트 메인페이지 배너 때문에 생성성 */}
            {location.pathname == '/' ? (
                <div>
                    < img className='bannerImg' src={banner1} alt="배너 사진 1" />
                    <div className="categoryBtns">
                        <div>
                            <div className="allProduct">전체보기</div>
                        </div>

                        {categoryList.map(category => {
                            return (
                                <div key={category.categoryCode}>
                                    <div>{category.categoryName}</div>
                                    <img src={require(`../assets/images/${category.categoryImage}`)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : null}

            {/* 기본 레이아웃 */}
            <div className="mainContent" style={location.pathname != '/' ? { "marginTop": "1.5%" } : null}>
                {/* 내용 변경 위친친 */}
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout