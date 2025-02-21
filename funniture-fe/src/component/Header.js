import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../../src/assets/images/mainLogo.png';
import searchIcon from '../assets/icon/search-icon.svg'
import { getCategory } from "../apis/ProductAPI"
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import headerCss from './headerfooter.module.css'
import decodeJwt from '../utils/tokenUtils';
import { ReactComponent as MyPageImage } from "../assets/images/circle-user.svg"

function Header({ setSelectCategory }) {
    const { user } = useSelector(state => state.member);
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [refCategory, setRefCategory] = useState(1)

    const searchText = useRef(null)

    async function setCategoryData(refCategory) {
        dispatch(getCategory(refCategory))
    }

    useEffect(() => {
        setCategoryData(refCategory)
        if (window.localStorage.getItem('accessToken')) {
            setIsLogin(prev => !prev)
        }
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
        return (
            <div class={headerCss.loginBtn} onClick={() => navigate('/login')}>
                <div>로그인</div>
            </div>
        );
    }

    function AfterLogin() {

        return (
            <div class={headerCss.loginBtn} onClick={onClickLogoutHandler}>
                <div>로그아웃</div>
            </div>
        );
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken')
        setIsLogin(false)
        navigate('/')
    }

    const moveMyPage = () => {
        const token = decodeJwt(window.localStorage.getItem('accessToken'));
        console.log('token', token);
        console.log(token.memberRole);
        if (token.memberRole == 'USER') {
            navigate('/mypage')
        } else if (token.memberRole == 'OWNER') {
            navigate('/owner')
        } else if (token.memberRole == 'ADMIN') {
            navigate('/admin')
        } else {
            console.log('얜 뭐냐.');
        }
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
                <MyPageImage style={{ fill: "#B08968", width: "2.5%" }} onClick={moveMyPage} />
                {isLogin ? <AfterLogin /> : <BeforeLogin />}
            </div>
        </header>
    )
}

export default Header;