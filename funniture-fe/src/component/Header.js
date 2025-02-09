import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../../src/assets/images/mainLogo.png';
import searchIcon from '../assets/icon/search-icon.svg'

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const actStyle = {

    }

    return (
        <header>
            <div>
                <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/?furniture')} />
                <div className='switchBtns'>
                    <input type="radio" id='furniture' name='bigCategory' checked />
                    <label htmlFor="furniture">
                        <div>가구</div>
                    </label>
                    <input type="radio" id='electronics' name='bigCategory' />
                    <label htmlFor="electronics">
                        <div>가전</div>
                    </label>
                </div>
                <div className='searchBox'>
                    <input type="text" placeholder='검색어를 입력하세요' />
                    <img src={searchIcon} alt="검색 아이콘" />
                </div>
                <div className='loginBtn'>
                    <div>
                        로그인
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;