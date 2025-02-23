import './login.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/images/mainLogo.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callLoginAPI } from '../../apis/MemberAPI';
import decodeJwt from '../../utils/tokenUtils';
import BtnModal from '../../component/BtnModal';

function Login() {
    const loginMember = useSelector(state => state.member);

    const [showBtnModal, setShowBtnModal] = useState(false); // 모달 표시 
    const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 메시지
    const [isLoginSuccess, setIsLoginSuccess] = useState(false); // 로그인 성공 여부

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickLoginHandler = async () => {
        const response = await dispatch(callLoginAPI({ form })); // response는 { success, message } 형태
        if (response.success) {
            const token = decodeJwt(window.localStorage.getItem("accessToken"));
            if (token) {
                console.log("로그인 성공! 유효한 토큰:", token);
                setModalMessage(response.message || '로그인 성공!');
                setIsLoginSuccess(true); // 로그인 성공 상태 설정
                setShowBtnModal(true); // 모달 표시
            } else {
                setModalMessage('유효하지 않은 토큰입니다.');
                setShowBtnModal(true); // 모달 표시
            }
        } else {
            setModalMessage(response.message || '로그인 실패!');
            setShowBtnModal(true); // 모달 표시
        }
    };

    // 모달 닫기 및 페이지 이동 처리
    const handleCloseModal = () => {
        setShowBtnModal(false); // 모달 닫기
        console.log('모달 닫기 핸들러 동작했는지');
        
        // 로그인 성공일 경우에만 페이지 이동
        if (isLoginSuccess) {
            console.log('로그인 성공 - "/" 페이지로 이동');
            navigate("/"); // '/'로 이동
        } else {
            console.log('로그인 실패 - 페이지 이동 없음');
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

                            <div>
                                <button 
                                    onClick={onClickLoginHandler} 
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

            {/* 모달 */}
            {showBtnModal && (
                <BtnModal
                    showBtnModal={showBtnModal}
                    setShowBtnModal={setShowBtnModal}
                    btnText="확인"
                    modalContext={modalMessage}
                    modalSize="sm"
                    onClose={handleCloseModal} // 모달 닫기 시 호출될 함수 전달
                />
            )}
        </>
    );
}

export default Login;
