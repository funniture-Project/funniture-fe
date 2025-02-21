import OrdersCss from './orders.module.css';
import './editInfo.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callLoginAPI } from '../../apis/MemberAPI';

function EditInfo () {

    const selector = useSelector(state => state.member);
    console.log('selector : ', selector);
    const dispatch = useDispatch();

    const [password , setPassword] = useState({
        password: ''
    });

    
    const onChangeHandler = (e) => {
        setPassword({
        [e.target.name] : e.target.value
        });
    }

    const onClickHandler = () => {
        const token = decodeJwt(window.localStorage.getItem('accessToken'));
        console.log('token : ', token);
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

export default EditInfo;