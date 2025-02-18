import './login.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callLoginAPI, callMemberListAPI } from '../../apis/MemberAPI';
import decodeJwt from '../../utils/tokenUtils';

function Login () {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [form , setForm] = useState({
        email : '',
        password : ''
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickLoginHandler = async () => {
        const isLoginSuccess = await dispatch(callLoginAPI({form}));
        if (isLoginSuccess){
            console.log('isLoginSuccess : ', isLoginSuccess);
            console.log('token.sub : ', token.sub);
            console.log('token : ', token);
            console.log('onClickLoginHandler, 로그인 성공!');
            dispatch(callMemberListAPI(token.sub));
            navigate("/");
        }
    }

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