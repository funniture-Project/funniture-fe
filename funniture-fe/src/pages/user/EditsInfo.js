import OrdersCss from './orders.module.css';
import './editInfo.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callLoginAPI } from '../../apis/MemberAPI';
import { Navigate } from 'react-router-dom';

function EditsInfo () {

    const member = useSelector(state => state.member);
    console.log('member : ', member);
    const dispatch = useDispatch();

    const [password , setPassword] = useState({
        password: ''
    });

    
    const onChangeHandler = (e) => {
        setPassword({
        [e.target.name] : e.target.value});
    }

    const onClickHandler = () => {
        Navigate("/");
    }

    return (
        <>
            <div className={OrdersCss.ordersContainer}>
                <div className={OrdersCss.orderPageTitle}>회원정보 관리</div>    
                
            </div>
        </>
    );
}

export default EditsInfo;