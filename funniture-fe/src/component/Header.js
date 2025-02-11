import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../../src/assets/images/mainLogo.png';
import searchIcon from '../assets/icon/search-icon.svg'
import { getCategory } from "../apis/ProductAPI"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoryList = useSelector(state => state.category)
    const [refCategory, setRefCategory] = useState(1)

    async function setCategoryData(refCategory) {
        dispatch(getCategory(refCategory))
    }

    useEffect(() => {
        setCategoryData(refCategory)
    }, [])

    useEffect(() => {
        setCategoryData(refCategory)
    }, [refCategory])

    function onChangeHandler(e) {
        console.log(e.target.value); // 클릭한 라디오 버튼의 value를 출력
        setRefCategory(Number(e.target.value)); // 상태 업데이트
    }

    return (
        <header>
            <div>
                <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/')} />
                <div className='switchBtns'>
                    <input type="radio" id='electronics' value={1} name='bigCategory' checked={refCategory == 1} onChange={onChangeHandler} />
                    <label htmlFor="electronics">
                        <div>가전</div>
                    </label>
                    <input type="radio" id='furniture' value={2} name='bigCategory' checked={refCategory == 2} onChange={onChangeHandler} />
                    <label htmlFor="furniture">
                        <div>가구</div>
                    </label>
                </div>
                <div className='searchBox'>
                    <input type="text" placeholder='검색어를 입력하세요' />
                    <img src={searchIcon} alt="검색 아이콘" />
                </div>
                <div className='loginBtn' onClick={() => navigate('/mypage')}>
                    <div>
                        로그인
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;