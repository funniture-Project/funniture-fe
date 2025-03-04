import { useEffect, useState } from "react";
import AdminTop from "../../component/adminpage/AdminTop";
import AdminQnACss from './AdminQnAPage.module.css'
import { getChatQaList } from "../../apis/ChatAPI";
import { useDispatch, useSelector } from "react-redux";

function AdminQnAPage() {
    const [showCheck, setShowCheck] = useState("qnaList")

    useEffect(() => {
        console.log("showCheck : ", showCheck)
    }, [showCheck])

    // 질문 관리 부분
    const [selectLevel, setSelectLevel] = useState(1)
    const { chatQaList } = useSelector(state => state.chat)

    const dispatch = useDispatch();

    function getListData() {
        dispatch(getChatQaList({ levelNum: selectLevel }))
    }

    useEffect(() => {
        getListData()
    }, [selectLevel])

    useEffect(() => {
        console.log("chatQaList : ", chatQaList)
    }, [chatQaList])

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
                    <div className={AdminQnACss.questionListContainer}>
                        <div className={AdminQnACss.questionListLevelBox}>
                            <input type="radio" name="levelCheck" id="level1" value={1}
                                onChange={(e) => setSelectLevel(e.target.value)}
                                checked={selectLevel == 1 ? true : false}
                            />
                            <label htmlFor="level1">1단계 질문</label>
                            <input type="radio" name="levelCheck" id="level2" value={2}
                                onChange={(e) => setSelectLevel(e.target.value)}
                                checked={selectLevel == 2 ? true : false}
                            />
                            <label htmlFor="level2">2단계 질문</label>
                            <input type="radio" name="levelCheck" id="level3" value={3}
                                onChange={(e) => setSelectLevel(e.target.value)}
                                checked={selectLevel == 3 ? true : false}
                            />
                            <label htmlFor="level3">3단계 질문</label>
                        </div>
                        <div className={AdminQnACss.btnBox}>
                            <button>추가 +</button>
                            <button>저장하기</button>
                        </div>
                        <div className={AdminQnACss.contentBox}>
                            <div className={`${AdminQnACss.contentItem} ${AdminQnACss.contentTitle}`}>
                                <div>질문</div>
                                <div>답변</div>
                                <div>하위 질문 여부</div>
                                <div>관리자 연결 여부</div>
                                <div>삭제</div>
                            </div>

                            <div className={AdminQnACss.listBox}>

                                {chatQaList?.length > 0 ? chatQaList.map(item => (
                                    <div className={AdminQnACss.contentItem}>
                                        <div>
                                            <div>
                                                {item.chatQaQuContent}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ whiteSpace: "pre-line" }}>
                                                {`${item.chatQaAnContent}`}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input type="checkbox" id="subAble" checked={item.nextQuAbsence} />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input type="checkbox" id="adminAble" checked={item.adminConnectAbsence} />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <button>
                                                    <img src={require("../../assets/icon/minus-solid.svg").default} alt="삭제 버튼" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                    <div>등록 된 질문이 없습니다.</div>
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminQnAPage;