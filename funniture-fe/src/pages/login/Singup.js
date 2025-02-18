import './signup.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import MemberAPI, { callSignupAPI } from '../../apis/MemberAPI';

function Signup () {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const selector = useSelector(state => state.memberReducer);

    const [form , setForm] = useState({
        email:'',
        userName:'',
        verification:'',
        password:'',
        confirmPassword:''
    });

    useEffect(() => {
        
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    
    const signUpHandler = () => {
        dispatch(callSignupAPI({
            form:form
        })).then(()=>{navigate("/login")});

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
                            <label style={{ fontWeight: 'bold' }}> 회원가입 </label>

                            <div className="loginInput">
                                <input type="text" name="email" onChange={onChangeHandler}
                                    placeholder='이메일을 입력해 주세요.'/>
                            </div>

                            <div className='verification'>
                                <input type="text" name="verification" onChange={onChangeHandler}
                                    placeholder='인증번호 입력'/>
                                <button>인증번호 발송</button>
                            </div>
                            
                            <div className='loginInput'>
                                <input type="text" name="userName" onChange={onChangeHandler}
                                    placeholder="이름을 입력해 주세요."/>

                                <input type="password" name="password" onChange={onChangeHandler}
                                    placeholder="비밀번호 입력"/>

                                <input type="password" name="confirmPassword" onChange={onChangeHandler}
                                    placeholder="비밀번호 확인" />
                            </div>
                        </div>
                        <button className="signupBtn"
                                onClick={signUpHandler}
                                >회원가입</button>
                </div>
            </div>
        </div>   
        </>
    );

}

export default Signup;