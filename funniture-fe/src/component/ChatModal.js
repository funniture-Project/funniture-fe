import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatCss from './ChatModal.module.css'
import { createElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatQaList } from "../apis/ChatAPI";
import adminLogo from '../assets/images/white_chiar_logo.png'
import { useLocation } from "react-router-dom";

function ChatModal({ showBtnModal, setShowBtnModal }) { // 25-02-27 attachmentFile 추가

    const { chatQaList } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.member)
    const [currentList, setCurrentList] = useState();
    const [selectNum, setSelectNum] = useState();

    // 관리자 연결여부
    const [adminAble, setAdminAble] = useState(false)

    const location = useLocation();

    // 이전 질문
    // const prevList = useRef();
    const [prevList, setPrevList] = useState(null);

    // 처음 질문
    const firstList = useRef();

    // 이전 선택한 질문의 번호호
    const prevSelectNo = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatQaList());
    }, [])

    useEffect(() => {
        console.log("새로받아온 chatQaList : ", chatQaList)
        setCurrentList(chatQaList)

        if (!firstList?.current?.length > 0) {
            firstList.current = chatQaList
        }
    }, [chatQaList])

    useEffect(() => {
        if (firstList?.current?.length > 0) {
            setCurrentList(firstList.current)
        }
    }, [location.pathname])

    // header의 x버튼이 눌렸을때 동작할 함수
    const handleOnClose = () => {
        console.log("모달 닫힘 : ", firstList.current)
        if (firstList?.current?.length > 0) {
            setCurrentList(firstList.current)
        }
        setShowBtnModal(false); // 모달 닫기
    };

    function selectChatList(num) {
        // prevList.current = { list: currentList, adminAble: adminAble }

        setPrevList({ list: currentList, adminAble: adminAble })
        prevSelectNo.current = selectNum

        // 선택 질문
        const selectQu = currentList.filter((item) => item.chatQaNo == num)

        // 선택 질문 내용
        const selectQuestion = selectQu[0].chatQaQuContent

        // 응답
        const response = selectQu[0].chatQaAnContent

        // 관리자 연결 여부
        setAdminAble(selectQu[0].adminConnectAbsence)

        // 관리자 여부에 따라 currentList 에 연결 여부 넣을꺼라서 setAdminAble 뒤에 selectNum 변경
        setSelectNum(num)

        // 사용자쪽
        const userBox = document.createElement("div")
        userBox.classList.add("receiver", ChatCss.receiver);
        userBox.innerHTML = `
            <div class="${ChatCss.receiverMsgBox}">
                <div class="${ChatCss.receiverMsg}">${selectQuestion}</div>
            </div>
        `

        const adminAll = document.querySelectorAll(".sender")
        const lastAdmin = adminAll[adminAll?.length - 1];

        if (lastAdmin) {
            lastAdmin.insertAdjacentElement("afterend", userBox);
        } else {
            console.log("lastAdmin 요소 찾을 수 없음")
        }

        // 관리자 쪽
        const adminBox = document.createElement("div")
        adminBox.classList.add("sender", ChatCss.sender);
        adminBox.innerHTML = `
        <div class="${ChatCss.senderImg}">
            <img src="${adminLogo}" alt=로고 이미지" />
        </div>
        <div class="${ChatCss.senderMsgBox}">
            <div class="${ChatCss.senderMsg}">${response}</div>
        </div>
        `

        const receiverAll = document.querySelectorAll(".receiver")
        const lastReceiver = receiverAll[receiverAll.length - 1];

        if (lastReceiver) {
            lastReceiver.insertAdjacentElement("afterend", adminBox);
        } else {
            console.log("lastReceiver 요소 찾을 수 없음")
        }

        // 스크롤 내리기
        const chatBox = document.querySelector(".chatBox");  // modalBody에 접근

        const adminBoxHeight = adminBox.getBoundingClientRect().height;  // adminBox 높이
        const userBoxHeight = userBox.getBoundingClientRect().height;  // userBox 높이

        if (chatBox) {
            chatBox.style.scrollBehavior = 'smooth';
            chatBox.scrollTop = chatBox.scrollHeight - adminBoxHeight - userBoxHeight;  // 스크롤 설정
        } else {
            console.log("chatBox 요소 찾을 수 없음");
        }
    }

    useEffect(() => {
        console.log("==============================================================")
    }, [currentList])

    useEffect(() => {
        dispatch(getChatQaList({ refNum: selectNum }))
    }, [selectNum])

    function changeToPrevList() {

        setAdminAble(prevList.adminAble)
        setSelectNum(prevSelectNo.current)
        setCurrentList(prevList.list)
    }

    function setFirstList() {
        setSelectNum()
        setPrevList({ list: firstList.current })
        setCurrentList(firstList.current)
    }

    // 관리자에게 연결
    function connectAdmin() {
        console.log("관리자에게 연결하기 클릭")
    }

    useEffect(() => {
        if (user) {
            console.log("user정보 : ", user)
        }
    }, [user])

    return (
        <>
            <Modal show={showBtnModal}
                onHide={handleOnClose}
                className={ChatCss.modalCss}
                size='md'
                dialogClassName={ChatCss.customModal}
                contentClassName={ChatCss.modalContent}
                backdropClassName={ChatCss.backDrop}
            >
                <Modal.Header closeButton className={ChatCss.modalHeader} onHide={handleOnClose}>
                    <div>
                        <div>
                            <div className={ChatCss.imgBox}>
                                <img src={require("../assets/images/a.jpg")} alt="로고 이미지" />
                            </div>
                            <div className={ChatCss.siteInfo}>
                                <div>Funniture</div>
                                <div>운영시간 : 9:00 ~ 18:00</div>
                            </div>
                        </div>
                        <div>
                            <button>상담 종료</button>
                        </div>
                    </div>
                </Modal.Header>

                {user?.isConsulting ?
                    <>
                        <Modal.Body className={ChatCss.modalBody}>
                            상담 진행 중인 user입니다.
                        </Modal.Body>
                        <Modal.Footer className={ChatCss.modalFooter}>
                            <div>footer의 위치</div>
                            {/* <Button onClick={handleSuccessClose}>
                                확인
                            </Button>
                            <Button onClick={handleFailClose}>
                                취소
                            </Button> */}
                        </Modal.Footer>
                    </>
                    :
                    <Modal.Body className={ChatCss.modalBody}>
                        <div className={`chatBox ${ChatCss.chatBox}`}>
                            <div className={`sender ${ChatCss.sender}`}>
                                <div className={ChatCss.senderImg}>
                                    <img src={require("../assets/images/white_chiar_logo.png")} alt="" />
                                </div>
                                <div className={ChatCss.senderMsgBox}>
                                    <div className={ChatCss.senderMsg}>
                                        안녕하세요 고객님😊
                                        <br />어떤게 궁금하신가요?
                                    </div>
                                </div>
                            </div>


                            <div className={ChatCss.receiver}>
                                <div className={ChatCss.receiverButtonBox}>
                                    {currentList?.length > 0 ? currentList[0].chatQaLevel >= 2
                                        ? (
                                            <>
                                                {currentList.map((item) => (
                                                    <button data-chat-no={item.chatQaNo}
                                                        className={ChatCss.receiverButton}
                                                        onClick={() => selectChatList(item.chatQaNo)}
                                                    >
                                                        {item.chatQaQuContent}
                                                    </button>
                                                ))}
                                                <button className={ChatCss.receiverButton} onClick={changeToPrevList}>이전 질문 보기</button>
                                                {currentList[0].chatQaLevel == 2 ? null :
                                                    <button className={ChatCss.receiverButton} onClick={setFirstList}>처음 질문 보기</button>
                                                }
                                            </>
                                        )
                                        : (currentList.map((item) => (
                                            <button data-chat-no={item.chatQaNo}
                                                className={ChatCss.receiverButton}
                                                onClick={() => selectChatList(item.chatQaNo)}
                                            >
                                                {item.chatQaQuContent}
                                            </button>
                                        )))
                                        :
                                        <>
                                            <button className={ChatCss.receiverButton} onClick={setFirstList}>처음 질문 보기</button>
                                        </>
                                    }

                                    {/* 관리자 연결 버튼 */}
                                    {(adminAble || prevList?.list[0].chatQaLevel == 3) ?
                                        <button className={ChatCss.receiverButton} onClick={connectAdmin}>관리자에게 문의 하기</button>
                                        : null}
                                </div>
                                {/* <div className={ChatCss.receiverMsgBox}>
                                <div className={ChatCss.receiverMsg}>받는 놈 메세지</div>
                                <div className={ChatCss.receiverMsg}>받는 놈 메세지asda asdslnc</div>
                                <div className={ChatCss.receiverMsg}>받는 놈</div>
                                <div className={ChatCss.receiverMsg}>받는 놈 메세지</div>
                                <div className={ChatCss.receiverMsg}>받는 놈 메세지</div>
                                <div className={ChatCss.receiverMsg}>받는 놈 메세지</div>
                            </div> */}
                            </div>
                        </div>
                    </Modal.Body>
                }

            </Modal>
        </>
    );

}

export default ChatModal;