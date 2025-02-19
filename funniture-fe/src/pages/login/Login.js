import './login.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { callLoginAPI} from '../../apis/MemberAPI';
import decodeJwt from '../../utils/tokenUtils';

function Login() {

    const loginMember = useSelector(state => state.member);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if(loginMember.state === 200){
            console.log('useEffect의 loginMember : ', loginMember);
        }
    }, [loginMember]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // const onClickLoginHandler = async () => {
    //     const isLoginSuccess = await dispatch(callLoginAPI({ form }));
    //     if (isLoginSuccess) {
    //         console.log('isLoginSuccess : ', isLoginSuccess);
    //         // 로그인 하고 decoding 해야 함.
    //         const token = decodeJwt(window.localStorage.getItem("accessToken"));
    //         console.log('token : ', token);
    //         console.log('token.sub : ', token.sub);
    //         if(token){
    //         dispatch(callGetMemberAPI({memberId : token.sub}));
    //         navigate("/");
    //         } else {
    //             console.error("유효하지 않은 토큰!!");
    //         }
    //     }
    // }

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