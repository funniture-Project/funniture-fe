import './signup.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';

function Signup () {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [form , setForm] = useState();

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
                                <input type="text" name="memberId"
                                    placeholder='이메일을 입력해 주세요.'/>
                            </div>

                            <div className='verification'>
                                <input type="text" name="member"
                                    placeholder='인증번호 입력'/>
                                <button>인증번호 발송</button>
                            </div>
                            
                            <div className='loginInput'>
                                <input type="text" name="name"
                                    placeholder="이름을 입력해 주세요."/>

                                <input type="password" name="password"
                                    placeholder="비밀번호 입력"/>

                                <input type="password" name="confirmPassword"
                                    placeholder="비밀번호 확인" />
                            </div>
                        </div>
                        <button className="signupBtn"
                                >회원가입</button>
                </div>
            </div>
        </div>   
        </>
    );

}

export default Signup;