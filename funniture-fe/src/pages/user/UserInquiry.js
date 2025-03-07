import { useEffect } from 'react';
import myPageInquiry from './mypageInquiry.module.css';
import { callAllInquiryByMypageAPI } from '../../apis/InquiryAPI';
import { useSelector } from 'react-redux';

function UserInquiry () {

    // 25-03-08 일단 사용자 마이페이지 문의 불러오고, 스토어에 저장했음!!!
    const user = useSelector(state => state.member);
    console.log('user : ' , user);

    // useEffect(() => {
    //     callAllInquiryByMypageAPI();
    // });

    return(
        <>
            <div className={myPageInquiry.activeContainer}>
                <div className={myPageInquiry.activeInquiryTitle}>
                    <div>유저 문의</div>
                </div>

                    <div className={myPageInquiry.activeRentalContainer}>
                    <table className={myPageInquiry.activeRentalTable}>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>주문번호</th>
                                <th style={{ width: "24%" }}>상품명</th>
                                <th style={{ width: "5%" }}>수량</th>
                                <th style={{ width: "10%" }}>약정기간</th>
                                <th style={{ width: "8%" }}>A/S</th>
                                <th style={{ width: "28%" }}>사용 날짜 / 만료 날짜</th>
                                <th style={{ width: "15%" }}>반납신청</th>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </>
    );
}

export default UserInquiry;