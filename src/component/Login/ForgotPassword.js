import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {userActions} from "../../actions/user.action";
import {useHistory} from "react-router";
import {ValidationText} from "../../constants/Validation";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";

export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const history = useHistory()
    const [isValidForm, setFormValidation] = useState(undefined);
    const [checkEmail, setCheckEmail] = useState(false)
    const handleSubmit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setCheckEmail(false)
        const form = ev.currentTarget
        if (!form.checkValidity()) {
            swal(SwalCommon.ALERT_MISSING_DATA)
            setFormValidation(false)
        } else {
            setFormValidation(true)
            userActions.reclaimPasswordByEmail(email).then(resp => {
                if (resp.status === 200) {
                    history.push("/login")
                }
            }).catch((error) => {
                let code = error.response.data.errorCode
                if(code === 800 || code === 5000)
                {
                    setCheckEmail(true)
                    //swal(SwalCommon.ALERT_CHECK_EMAIL)
                }
            })
        }
    }

    return (
        <Container className="form-center">
            <h2>비밀번호 초기화 메일 발송</h2>
            <p>
                관리자로 등록된 이메일 주소를 정확히 입력해 주세요.<br/>
                해당 이메일로 비밀번호 재설정 안내 메일을 발송해드립니다.
            </p>
            <Form onSubmit={handleSubmit} noValidate className={`${(isValidForm === false) ? ' was-validated' : ''}`}>
                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={10}>
                        <Form.Control value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" required
                                      placeholder="이메일을 입력해주세요."/>
                        <div className="text-left" style={{color: "red"}} hidden={!checkEmail}>{SwalCommon.ALERT_CHECK_EMAIL.text}</div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{span: 10, offset: 2}}>
                        <Button type="submit">확인</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}