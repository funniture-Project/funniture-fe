import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatCss from './ChatModal.module.css'
import { createElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatQaList } from "../apis/ChatAPI";
import adminLogo from '../assets/images/white_chiar_logo.png'
import { useLocation } from "react-router-dom";

function ChatModal({ showBtnModal, setShowBtnModal }) { // 25-02-27 attachmentFile 추가

    const [showImageModal, setShowImageModal] = useState(false); // 이미지 확대 모달 상태
    const { chatQaList } = useSelector(state => state.chat)
    const [currentList, setCurrentList] = useState();
    const [selectNum, setSelectNum] = useState();

    const location = useLocation();

    // 이전 질문
    const prevList = useRef();

    // 처음 질문
    const firstList = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatQaList());
    }, [])

    useEffect(() => {
        if (firstList?.current?.length > 0) {
            setCurrentList(firstList.current)
        }
    }, [location.pathname])

    useEffect(() => {
        setCurrentList(chatQaList)

        if (!firstList?.current?.length > 0) {
            firstList.current = chatQaList
        }
    }, [chatQaList])

    // useEffect(() => {
    //     console.log("현재의 prevList : ", prevList.current)
    // }, [prevList.current])

    // useEffect(() => {
    //     console.log("현재의 firstList : ", firstList.current)
    // }, [firstList.current])

    // useEffect(() => {
    //     console.log("현재의 currentList : ", currentList)
    // }, [currentList])

    // 두번째 버튼은 보통 취소 버튼으로 취소 또는 불허가 일때의 함수 정의
    const handleFailClose = () => {
        setShowBtnModal(false);
    }

    // 성공(또는 확인) 시 진행될 함수
    const handleSuccessClose = () => {
        setShowBtnModal(false); // 모달 닫기
    };

    // header의 x버튼이 눌렸을때 동작할 함수
    const handleOnClose = () => {
        setShowBtnModal(false); // 모달 닫기
    };

    function selectChatList(num) {
        setSelectNum(num)
        prevList.current = currentList
        // 선택 질문
        const selectQu = currentList.filter((item) => item.chatQaNo == num)

        // 선택 질문 내용
        const selectQuestion = selectQu[0].chatQaQuContent

        // 응답
        const response = selectQu[0].chatQaAnContent

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
            <div class="${ChatCss.senderMsg}">
                ${response}
            </div>
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
            console.log(chatBox.scrollHeight * 0.8)
            chatBox.style.scrollBehavior = 'smooth';
            chatBox.scrollTop = chatBox.scrollHeight - adminBoxHeight - userBoxHeight;  // 스크롤 설정
        } else {
            console.log("chatBox 요소 찾을 수 없음");
        }
    }

    useEffect(() => {
        dispatch(getChatQaList(selectNum))
    }, [selectNum])

    function setPrevList() {
        setCurrentList(prevList.current)
    }

    function setFirstList() {
        setCurrentList(firstList.current)
    }

    return (
        <>
            <Modal show={showBtnModal}
                onHide={handleFailClose}
                className={ChatCss.modalCss}
                size='md'
                dialogClassName={ChatCss.customModal}
                contentClassName={ChatCss.modalContent}
                backdropClassName={ChatCss.backDrop}
            >
                <Modal.Header closeButton className={ChatCss.modalHeader} onHide={handleOnClose}>
                    <div>
                        <div className={ChatCss.imgBox}>
                            <img src={require("../assets/images/a.jpg")} alt="로고 이미지" />
                        </div>
                        <div className={ChatCss.siteInfo}>
                            <div>Funniture</div>
                            <div>운영시간 보기</div>
                        </div>
                    </div>
                </Modal.Header>

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
                                            <button className={ChatCss.receiverButton} onClick={setPrevList}>이전 질문 보기</button>
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
                                    : <button className={ChatCss.receiverButton} onClick={setFirstList}>처음 질문 보기</button>
                                }


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
                {/* <Modal.Footer className={ChatCss.modalFooter}>
                    <Button onClick={handleSuccessClose}>
                        확인
                    </Button>
                    <Button onClick={handleFailClose}>
                        취소
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );

}

export default ChatModal;