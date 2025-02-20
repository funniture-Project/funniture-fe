import './signup.css'
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import MemberAPI, { callSignupAPI , callSendEmailAPI , callCertificationAPI } from '../../apis/MemberAPI';

function Signup () {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const selector = useSelector(state => state.member);
    const storedCode = useSelector((state) => state.member.verificationCode);

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const isPasswordMach = (password , confirmPassword) => {
        return password === confirmPassword;
    }

    const [form , setForm] = useState({
        email:'',
        userName:'',
        verificationCode:'',
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
    };
    
    const signUpHandler = () => {
        const {password , confirmPassword} = form;

        if(!isPasswordValid(password)){
            alert('비밀번호는 최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.')
            return;
        }

        if(!isPasswordMach(password, confirmPassword)){
            alert('비밀번호가 일치하지 않습니다.')
            return;
        }

        dispatch(callSignupAPI({
            form:form
        })).then(()=>{navigate("/login")});

    };

    const sendEmailHandler = () => {
        dispatch(callSendEmailAPI({
            form: form
        }));
    };

    const certificationHandler = () => {
        const enteredCode = form.verificationCode; // 사용자가 입력한 인증번호
        console.log('사용자가 입력한 인증번호 : ' , enteredCode);
        const storedCode2 = storedCode; // Redux에 저장된 인증번호
        console.log('Redux에 저장된 인증번호 : ' , storedCode2);

        if (enteredCode === storedCode2) {
            alert('인증 성공!');
            // 다음 단계 작성해야 함
        } else {
            alert('인증 실패. 올바른 인증번호를 입력해주세요.');
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
                            <label style={{ fontWeight: 'bold' }}> 회원가입 </label>

                            <div className="loginInput">
                                <input type="email" name="email" onChange={onChangeHandler}
                                    placeholder='이메일을 입력해 주세요.'/>
                            </div>

                            <div className='verification'>
                                <input type="text" name="verificationCode" onChange={onChangeHandler}
                                    placeholder='인증번호 입력'/>
                                <button onClick={sendEmailHandler}>인증번호 발송</button>
                            </div>
                            
                            <div className='loginInput'>
                                <button onClick={certificationHandler}>인증하기</button>
                                
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