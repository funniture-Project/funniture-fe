import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../../src/assets/images/mainLogo.png';
import searchIcon from '../assets/icon/search-icon.svg'
import { getCategory } from "../apis/ProductAPI"
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import headerCss from './headerfooter.module.css'
import decodeJwt from '../utils/tokenUtils';

function Header({ setSelectCategory }) {

    const isLogin = window.localStorage.getItem('accessToken');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [refCategory, setRefCategory] = useState(1)

    const searchText = useRef(null)

    async function setCategoryData(refCategory) {
        dispatch(getCategory(refCategory))
    }

    useEffect(() => {
        setCategoryData(refCategory)
    }, [])

    useEffect(() => {
        setCategoryData(refCategory)
        setSelectCategory([refCategory])
    }, [refCategory])

    function onChangeHandler(e) {
        setRefCategory(Number(e.target.value)); // 상태 업데이트
    }

    const changeHandler = (e) => {
        searchText.current = e.target.value
    }

    const searchFunction = () => {
        navigate('/list', { state: { searchText: searchText.current }, replace: true })
    }

    const enterFunction = (e) => {
        if (e.key == 'Enter') {
            searchFunction()
        }
    }

    function BeforeLogin() { // | 는 시각적으로 버튼 구분
        return(
            <div>
                <NavLink to="/login">로그인</NavLink> | <NavLink to="/register">회원가입</NavLink>
            </div>
        );
    }
    function AfterLogin() {
        return(
            <div>
                <NavLink to="/">로그아웃</NavLink>
            </div>
        );
    }
    const onClickLogoutHandler = () => {
        
    }

    return (
        <header>
            <div>
                <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/')} />
                <div className={headerCss.switchBtns}>
                    <input type="radio" id='electronics' value={1} name='bigCategory' checked={refCategory == 1} onChange={onChangeHandler} />
                    <label htmlFor="electronics">
                        <div>가전</div>
                    </label>
                    <input type="radio" id='furniture' value={2} name='bigCategory' checked={refCategory == 2} onChange={onChangeHandler} />
                    <label htmlFor="furniture">
                        <div>가구</div>
                    </label>
                </div>
                <div className={headerCss.searchBox}>
                    <input id='headerSearchText' type="text" ref={searchText} placeholder='검색어를 입력하세요' onChange={changeHandler} onKeyUp={enterFunction} />
                    <img src={searchIcon} alt="검색 아이콘" onClick={searchFunction} />
                </div>
                <div className={headerCss.loginBtn} onClick={() => navigate('/login')}>
                    <div>
                    {(isLogin == null || isLogin === undefined) ? <BeforeLogin /> : <AfterLogin />}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;