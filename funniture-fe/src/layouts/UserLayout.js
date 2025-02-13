import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"
import './userLayout.css'
import banner1 from '../assets/images/banner(3).jpg'
import washing_machine from '../assets/images/washing_machine.png'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

function UserLayout({ selectCategory, setSelectCategory }) {

    const location = useLocation();
    const navigate = useNavigate();

    if (location.state?.categoryCodeList) {
        if (!selectCategory.includes(parseInt(location.state?.categoryCodeList))) {
            setSelectCategory([parseInt(location.state.categoryCodeList)])
        }
        console.log("location.state : ", location.state)
    }

    const { categoryList, refCategoryCode } = useSelector(state => state.category);

    // 메인페이지에서 이동할 때  
    function moveListPage(categoryCode) {
        if (categoryCode != 1 && categoryCode != 2) {
            setSelectCategory([categoryCode]);
        }

        navigate('/list')
    }

    useEffect(() => {
        console.log("selectCategory : ", selectCategory)

    }, [selectCategory])

    function addSelectCategory(categoryCode) {
        if (selectCategory.includes(categoryCode)) {
            setSelectCategory(prev => prev.filter(item => item !== categoryCode))
        } else {
            setSelectCategory(prev => [...prev, categoryCode])
        }
    }

    return (
        <div className="layout">
            <Header />

            {/* 사이트 메인페이지 배너 때문에 생성 */}
            {location.pathname == '/' ? (
                <div>
                    < img className='bannerImg' src={banner1} alt="배너 사진 1" />
                    <div className="categoryBtns">
                        <div onClick={() => moveListPage(refCategoryCode)}>
                            <div className="allProduct" >전체보기</div>
                        </div>

                        {categoryList.map(category => {
                            return (
                                <div key={category.categoryCode} onClick={() => moveListPage(category.categoryCode)}>
                                    <div>{category.categoryName}</div>
                                    <img src={require(`../assets/images/${category.categoryImage}`)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : null}

            {/* 리스트 페이지 검색 조건 때문에 생성 */}
            {location.pathname == '/list' ? (
                <div className="searchConditionBox">
                    <div className="companyItem">회사 목록</div>
                    <hr />
                    <div className="categoryList">
                        {categoryList.map(category => {
                            return (
                                <div key={category.categoryCode} data-category-code={category.categoryCode}
                                    className={`categoryItem ${selectCategory?.includes(category.categoryCode) ? 'selectedCategory' : null}`}
                                    onClick={() => addSelectCategory(category.categoryCode)}>
                                    <div>{category.categoryName}</div>
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