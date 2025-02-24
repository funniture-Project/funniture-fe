import './signup.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MemberAPI, {
  callSignupAPI,
  callSendEmailAPI,
  callCertificationAPI,
} from '../../apis/MemberAPI';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedCode = useSelector((state) => state.member.verificationCode);

  const [form, setForm] = useState({
    email: '',
    userName: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사
  const [emailSent, setEmailSent] = useState(false); // 이메일 발송 여부
  const [isCodeReady, setIsCodeReady] = useState(false); // 인증번호가 정확히 입력되었는지 여부
  const [codeVerified, setCodeVerified] = useState(false); // 인증 성공 여부
  const [isSignupEnabled, setIsSignupEnabled] = useState(false); // 회원가입 버튼 활성화 여부

  // 비밀번호 유효성 검사 함수
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호와 확인 일치 여부 확인 함수
  const isPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // 입력값 변경 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === 'email') {
      setEmailValid(value.includes('@') && value.includes('.')); // 이메일 유효성 검사
    }

    if (name === 'verificationCode') {
      setIsCodeReady(value.trim().length === 6); // 인증번호가 정확히 입력되었는지 확인
    }
  };

  // 회원가입 버튼 활성화 여부 확인 함수
  const checkSignupEnabled = () => {
    const { userName, password, confirmPassword } = form;
    if (
      userName.trim() !== '' && // 이름 입력 여부
      isPasswordValid(password) && // 비밀번호 유효성 검사
      isPasswordMatch(password, confirmPassword) // 비밀번호와 확인 일치 여부
    ) {
      setIsSignupEnabled(true);
    } else {
      setIsSignupEnabled(false);
    }
  };

  // form 상태 변경 시 회원가입 버튼 활성화 여부 확인
  useEffect(() => {
    checkSignupEnabled();
  }, [form]);

  // 인증번호 발송 핸들러
  const sendEmailHandler = () => {
    dispatch(callSendEmailAPI({ form }));
    setEmailSent(true); // 이메일 발송 후 인증하기 버튼 표시
  };

  // 인증번호 확인 핸들러
  const certificationHandler = () => {
    const enteredCode = form.verificationCode;

    if (enteredCode === storedCode) {
      alert('인증 성공!');
      setCodeVerified(true); // 인증 성공 시 다음 단계로 진행
    } else {
      alert('인증 실패. 올바른 인증번호를 입력해주세요.');
      setCodeVerified(false);
    }
  };

  // 회원가입 핸들러
  const signUpHandler = () => {
    dispatch(callSignupAPI({ form })).then(() => navigate('/login'));
  };

  // 조건부 렌더링: 인증하기 버튼
  let renderVerificationButton;
  if (emailSent) {
    renderVerificationButton = (
      <div className="verification">
        <button 
          onClick={certificationHandler} 
          disabled={!isCodeReady}
        >
          인증하기
        </button>
      </div>
    );
  }

  // 조건부 렌더링: 이름 및 비밀번호 입력 필드
  let renderUserInputs;
  if (codeVerified) {
    renderUserInputs = (
      <div className="loginInput">
        <input
          type="text"
          name="userName"
          onChange={onChangeHandler}
          placeholder="이름을 입력해 주세요."
        />
        <input
          type="password"
          name="password"
          onChange={onChangeHandler}
          placeholder="영문 + 숫자 + 특수문자 포함하여 8자 이상 입력"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={onChangeHandler}
          placeholder="비밀번호를 동일하게 입력해 주세요."
        />
      </div>
    );
  }

  // 조건부 렌더링: 회원가입 버튼
  let renderSignupButton;
  if (codeVerified) {
    renderSignupButton = (
      <button 
        className="signupBtn" 
        onClick={signUpHandler} 
        disabled={!isSignupEnabled}
      >
        회원가입
      </button>
    );
  }

  return (
     <div>
        <div className="loginLayout">
          <div className="loginContainer">
            <div className="loginMainLogo">
              <img src={mainLogo} alt="메인 로고" onClick={() => navigate('/')} />
            </div>
            <div className="loginForm">
              <label style={{ fontWeight: 'bold' }}>회원가입</label>

              {/* 이메일 입력 */}
              <div className="loginInput">
                <input
                  type="email"
                  name="email"
                  onChange={onChangeHandler}
                  placeholder="이메일을 입력해 주세요."
                />
              </div>

              {/* 인증번호 입력 및 발송 버튼 */}
              <div className="verificationInput">
                <input
                  type="text"
                  name="verificationCode"
                  onChange={onChangeHandler}
                  placeholder="인증번호 입력"
                />
                <button onClick={sendEmailHandler} disabled={!emailValid}>
                  인증번호 발송
                </button>
              </div>

              {/* 인증하기 버튼 */}
              {renderVerificationButton}

              {/* 이름 및 비밀번호 입력 */}
              {renderUserInputs}

              {/* 회원가입 버튼 */}
              {renderSignupButton}
            </div>
            <div style={{marginLeft:'450px', marginTop:'270px'}} onClick={() => {navigate('/login')}}>돌아 가기</div>
          </div>
        </div>
     </div>
   );
}

export default Signup;
