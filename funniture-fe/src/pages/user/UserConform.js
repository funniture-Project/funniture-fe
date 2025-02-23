import OrdersCss from './orders.module.css';
import './editInfo.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callLoginAPI } from '../../apis/MemberAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import { callConfirmPassword } from '../../apis/MemberAPI';

function UserConform () {

    const member = useSelector(state => state.member);
    console.log('member : ', member);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password , setPassword] = useState({
        password: ''
    });

    // 25-02-21 // 주말동안 여기 해야 함. 일단 store에 id 저장했으니 서버에 이거로 요청
    // 근데 스토어에 다 저장해 놨으니까 그냥 꺼내서 쓰면 될 듯....?
    const onChangeHandler = (e) => {
        setPassword({
        [e.target.name] : e.target.value});
    }

    const onClickHandler = async () => {
        const memberId = member.user.memberId;
        const enteredPassword = password.password;
    
        console.log('enteredPassword : ', enteredPassword);
    
        // 비밀번호 검증 API 호출
        const isAuthenticated = await dispatch(callConfirmPassword(memberId, enteredPassword));
    
        if (isAuthenticated) {
            // 인증 성공 시 페이지 이동
            alert('인증 성공!');
            navigate("/edits");
        } else {
            // 인증 실패 시 경고 메시지 표시
            alert('비밀번호를 확인해 주세요.');
        }
    };
    
    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            onClickHandler(); // 엔터 키가 눌리면 버튼 클릭 핸들러 호출
        }
    };
    

    return (
        <>
            <div className={OrdersCss.ordersContainer}>
                <div className={OrdersCss.orderPageTitle}>회원정보 관리</div>    
                <div className="notice">
                    <span>고객님의 소중한 개인정보를 보호하고 있습니다.</span>
                    <span>회원님의 동의 없이 회원 정보를 제 3자에게 제공하지 않습니다.</span>
                </div>
                <hr style={{border:"1px solid #A5A3A3" , width:'100%'}}/>
                <div className='notice2'>
                    <span>고객님의 개인 정보 보호를 위해 비밀번호 확인 후, 이용 가능합니다.</span>
                </div>
                <div className='inputPassDiv'>
                    <div className="passwordInput">
                        <input
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        />
                        <button onClick={onClickHandler}>회원 확인</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserConform;