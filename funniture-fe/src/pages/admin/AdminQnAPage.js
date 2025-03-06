import { useEffect, useState } from "react";
import AdminTop from "../../component/adminpage/AdminTop";
import AdminQnACss from './AdminQnAPage.module.css'
import { ReactComponent as Message } from '../../assets/icon/message.svg'
import { ReactComponent as Check } from '../../assets/icon/circle-check-solid.svg'

import AdminManageChat from "./AdminManageChat";

// 1:1 문의 페이지 꺼
import AdDirectCss from './AdminDirectPage.module.css'
import { getConsultingList } from "../../apis/AdminInquiryAPI";

function AdminQnAPage() {
    const [showCheck, setShowCheck] = useState("qnaList")

    useEffect(() => {
        console.log("showCheck : ", showCheck)
    }, [showCheck])

    // 1:1 문의 꺼
    const [showTab, setShowTab] = useState("all")
    const [orderBy, setOrderBy] = useState("desc")
    const [userList, setUserList] = useState([])

    async function getUserList() {
        const response = await getConsultingList()

        if (response.httpStatusCode == 200) {
            setUserList(response?.results.result)
        }
    }

    useEffect(() => {
        getUserList()
    }, [])

    useEffect(() => {
        console.log("상담 이용 사용자 : ", userList)
    }, [userList])

    return (
        <>
            <AdminTop title={"문의 사항"} />
            <div className={AdminQnACss.wholeContainer}>
                <div className={AdminQnACss.radioBox}>
                    <input type="radio" name="showCheck" id="qnaList"
                        onChange={(e) => setShowCheck(e.target.id)}
                        checked={showCheck == "qnaList" ? true : false}
                    />
                    <label htmlFor="qnaList">문의 내역</label>

                    <input type="radio" name="showCheck" id="questionList"
                        onChange={(e) => setShowCheck(e.target.id)}
                        checked={showCheck == "questionList" ? true : false}
                    />
                    <label htmlFor="questionList">질문 관리</label>
                </div>
                <div className={AdminQnACss.contentContainer}>
                    {/* 이 부분 radio버튼에 따라 교체 예정 */}
                    {showCheck == "qnaList" ?
                        <div className={AdDirectCss.directWholeContainer}>
                            <div className={AdDirectCss.directListContainer}>
                                <div className={AdDirectCss.statusBox}>
                                    <div className={AdDirectCss.statusItem} onClick={(e) => setShowTab("all")}>
                                        <input type="radio" name="showTab" id="all"
                                            checked={showTab == "all"}
                                            onChange={(e) => setShowTab(e.target.id)}
                                        />
                                        <div>
                                            <Message className={AdDirectCss.MsgIcon} />
                                        </div>
                                        <label htmlFor="all">전체</label>
                                    </div>
                                    <div className={AdDirectCss.statusItem} onClick={(e) => setShowTab("ing")}>
                                        <input type="radio" name="showTab" id="ing"
                                            checked={showTab == "ing"}
                                            onChange={(e) => setShowTab(e.target.id)}
                                        />
                                        <div>
                                            <Message className={AdDirectCss.MsgIcon} />
                                        </div>
                                        <label htmlFor="ing">진행 중</label>
                                    </div>
                                    <div className={AdDirectCss.statusItem} onClick={(e) => setShowTab("done")}>
                                        <input type="radio" name="showTab" id="done"
                                            checked={showTab == "done"}
                                            onChange={(e) => setShowTab(e.target.id)}
                                        />
                                        <div>
                                            <Message className={AdDirectCss.MsgIcon} />
                                        </div>
                                        <label htmlFor="done">종료</label>
                                    </div>
                                </div>
                                <div className={AdDirectCss.orderByBox}>
                                    <select name="orderBy" id="orderBy" value={orderBy} onChange={(e) => setOrderBy(e.target.id)}>
                                        <option value="desc">최근 대화순</option>
                                        <option value="asc">과거 대화순</option>
                                    </select>
                                </div>
                                <div className={AdDirectCss.userListBox}>
                                    {userList && userList.length > 0 ?
                                        userList.map(user => (
                                            <div className={AdDirectCss.userItem} value={user.memberId}>
                                                <div className={AdDirectCss.isConsulting}>
                                                    <div style={{ backgroundColor: user.isConsulting ? "#7F5539" : "#a8a8a8" }}>
                                                        {user.isConsulting ? "상담중" : "상담종료"}
                                                    </div>
                                                </div>
                                                <div className={AdDirectCss.userInfoBox}>
                                                    <div className={AdDirectCss.userImgBox}>
                                                        <img
                                                            src={user.imageLink == "a.jpg" || user.imageLink == null || user.imageLink == "default.jpg"
                                                                ? require("../../assets/images/default.jpg") :
                                                                user.imageLink
                                                            }
                                                            alt="사용자 이미지" />
                                                    </div>
                                                    <div className={AdDirectCss.userInfo}>
                                                        <div><span>{user.userName}</span>님</div>
                                                        <div className={AdDirectCss.userEmail}>{user.email}</div>
                                                    </div>
                                                    <div className={AdDirectCss.checkAbleBox}>
                                                        <Check className={AdDirectCss.checkAble} style={{ fill: "#B08968 !important" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <div>문의 중인 사용자가 없습니다.</div>}
                                </div>
                            </div>
                            <div className={AdDirectCss.directChatContainer}>내용</div>
                        </div>
                        : <AdminManageChat />
                    }
                </div>
            </div>
        </>
    )
}

export default AdminQnAPage;