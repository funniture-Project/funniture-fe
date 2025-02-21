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

    // 근데 비밀번호가 맞는 사람만 들어갈 수 있어야 함.
    const onClickHandler = () => {
        const memberId = member.user.memberId;
        console.log('스토어에 꺼낸 memberId : ', memberId);
        console.log('password : ', password);
        // 아이디와 입력한 비밀번호를 보내야겠지?
        dispatch(callConfirmPassword(memberId, password));

        navigate("/edits");
    }

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
                        />
                        <button onClick={onClickHandler}>회원 확인</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserConform;