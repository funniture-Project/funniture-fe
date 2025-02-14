import './login.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';

function Login () {

    const navigate = useNavigate();

    const onChangeHandler = () => {};

    const onClickLoginHandler = () => {};

    return (
        <>  
        <div>
            <div className="loginLayout">
                <div className="loginContainer">
                    <div className="loginMainLogo">
                        <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/')} />
                    </div>
                        <div className="loginForm">
                            <label style={{ fontWeight: 'bold' }}> 환영합니다 고객님! </label>
                            
                            <div className="loginInput">
                                <input
                                    type="text"
                                    placeholder='아이디 (이메일)'
                                    name="email"
                                    onChange={onChangeHandler}
                                    />
                                <input
                                    type="password"
                                    placeholder='비밀번호 입력'
                                    name="password"
                                    onChange={onChangeHandler}
                                    />
                            </div>
                            
                            <div className="loginBtn">
                                <button
                                    onClick={onClickLoginHandler}
                                >로그인
                                </button>
                            </div>
                        </div>
                            <div onClick={() => navigate('/signup')}>이메일로 회원가입</div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;