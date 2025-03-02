import './submissionMessage.module.css'
import OrdersCss from './orders.module.css';

const SubmissionMessage = () => (
    <div className={OrdersCss.submissionMessage}>
        <h2>제공자 전환 신청이 완료되었습니다.</h2>
        <p>제공자 전환 심사는 1~3일 소요됩니다.</p>
    </div>
);

export default SubmissionMessage;