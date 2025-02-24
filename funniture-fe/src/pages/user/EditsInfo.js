import OrdersCss from './orders.module.css';
import './editsInfo.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decodeJwt from '../../utils/tokenUtils';
import { callLoginAPI } from '../../apis/MemberAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import { callChangePhoneAPI, callChangePasswordAPI, callBasicAddressAPI } from '../../apis/MemberAPI';

function EditsInfo () {

    const member = useSelector(state => state.member);
    console.log('member : ', member);
    console.log('member.user : ', member.user);
    console.log('member.user.address : ', member.user.address);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 사용자 개인정보 바꾸기 전에 기존 데이터 가져와야 함.
    useEffect(() => {
        if (member.user) {
            setForm({
                imageLink: member.user.imageLink || '',
                phoneNumber: member.user.phoneNumber || '',
                address: member.user.address || '',
                newPassword: '',
                confirmNewPassword: ''
            });
        }
    }, [member]); // member.user 변경될 때 마다 form 상태 업데이트.

    // useEffect(() => {
    //     callBasicAddressAPI({memberId: member.user.memberId});
    // });

    const [form, setForm] = useState({
        imageLink : '',
        phoneNumber : '',
        address : '',
        newPassword : '',
        confirmNewPassword : ''
    });

  // 비밀번호 유효성 검사 함수
    const isPasswordValid = (newPassword) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(newPassword);
    };
    
  // 비밀번호와 확인 일치 여부 확인 함수
    const isPasswordMatch = (newPassword, confirmNewPassword) => {
        return newPassword === confirmNewPassword;
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form, // 기존 상태를 복사
            [e.target.name]: e.target.value // 변경된 필드만 업데이트
        });
    };

    const phoneOnClickHandler = () => {
        dispatch(callChangePhoneAPI({
            memberId: member.user.memberId,
            phoneNumber: form.phoneNumber
        }));
    };
    
    const passwordOnClickHandler = () => {
        const { newPassword, confirmNewPassword } = form;
    
        // 비밀번호 유효성 검사
        if (!isPasswordValid(newPassword)) {
            alert('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
            return;
        }
    
        // 비밀번호 확인 일치 여부 검사
        if (!isPasswordMatch(newPassword, confirmNewPassword)) {
            alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }
    
        // 모든 조건을 만족하면 서버로 요청 전송
        dispatch(callChangePasswordAPI({
            memberId: member.user.memberId,
            password: newPassword
        }));
    
        alert('비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
    };
    

    return (
        <>
            <div className={OrdersCss.ordersContainer}>
                <div className={OrdersCss.orderPageTitle}>회원정보 관리</div>    
                <div className="editMypageInfo">
                    <div>
                        <span>프로필 사진</span>
                        <input
                            type="text"
                            name="imageLink"
                            value={form.imageLink}
                            onChange={onChangeHandler} />
                        <button>프로필 사진 변경</button>
                    </div>
                    <div>
                        <span>휴대 전화</span>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={onChangeHandler} />
                        <button onClick={phoneOnClickHandler}>전화번호 변경</button>
                    </div>
                    <div>
                        <span>주소</span>
                        <input
                            type="text"
                            name="address"
                            value={form.address || ''}
                            onChange={onChangeHandler} />
                        <button>주소 변경</button>
                    </div>
                    <div>
                        <span>새 비밀번호</span>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={onChangeHandler}
                            placeholder="영문 + 숫자 + 특수문자 포함하여 8자 이상 입력"
                        />
                        <button style={{ visibility: 'hidden' }}>비밀번호 변경</button>
                    </div>
                    <div>
                        <span>새 비밀번호 확인</span>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            onChange={onChangeHandler}
                            placeholder="새 비밀번호와 동일하게 입력해 주세요."
                        />
                        <button onClick={passwordOnClickHandler}>비밀번호 변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditsInfo;