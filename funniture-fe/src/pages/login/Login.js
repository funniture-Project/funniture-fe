import './login.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callLoginAPI } from '../../apis/MemberAPI';
import decodeJwt from '../../utils/tokenUtils';

function Login() {
    const loginMember = useSelector(state => state.member);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // const [isLoginEnabled, setIsLoginEnabled] = useState(false); // 로그인 버튼 활성화 여부

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 비밀번호 길이에 따라 로그인 버튼 활성화 여부 업데이트
    // useEffect(() => {
    //     setIsLoginEnabled(form.password.length >= 8);
    // }, [form.password]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickLoginHandler = async () => {
        const isLoginSuccess = await dispatch(callLoginAPI({ form }));
        if (isLoginSuccess) {
            const token = decodeJwt(window.localStorage.getItem("accessToken"));
            if (token) {
                console.log("로그인 성공! 유효한 토큰:", token);
                navigate("/");
            } else {
                console.error("유효하지 않은 토큰!!");
            }
        }
    };

    return (
        <>
            <div>
                <div className="loginLayout">
                    <div className="loginContainer">
                        <div className="loginMainLogo">
                            <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/')} />
                        </div>
                        <div className="loginForm">
                            <label style={{ fontWeight: 'bold', fontSize: '18px' }}> 환영합니다 고객님! </label>

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

                            {/* <div className={`loginBtn ${isLoginEnabled ? 'enabled' : ''}`}> */}
                            <div>
                                <button 
                                    onClick={onClickLoginHandler} 
                                    // disabled={!isLoginEnabled}
                                >
                                    로그인
                                </button>
                            </div>

                            <div className="additionalOptions">
                                <span onClick={() => navigate('/find')} style={{color:'#898888'}}>비밀번호 찾기</span>
                                <span onClick={() => navigate('/signup')}>이메일로 회원가입</span>
                            </div>

                            <div className="socialLogin">
                                <label style={{color:'#898888'}}>다른 방법으로 로그인</label>
                                <div className="socialButtons">
                                    <button className="socialButton naver">N</button>
                                    <button className="socialButton google">G</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
