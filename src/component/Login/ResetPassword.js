import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {userActions} from "../../actions/user.action";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {userConstants} from "../../constants/user.constants";
import {ValidationText} from "../../constants/Validation";
import swal from "sweetalert";
import {SwalCommon} from "../../constants/SwalCommon";

export default function ResetPassword(props) {

    const [newPassword, setNewPassword] = useState("")
    const history = useHistory()
    const [isValidForm, setFormValidation] = useState(undefined);
    const [requiredPassword, setRequiredPassword]=useState("")
    useEffect(() => {
        setRequiredPassword(ValidationText.RequiredPassword)
    })

    const handleSubmit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        const query = new URLSearchParams(props.location.search)
        const signature = query.get("sig")
        const form = ev.currentTarget
        if (!form.checkValidity()) {
            swal(SwalCommon.ALERT_MISSING_DATA)
            setFormValidation(false)
        } else {
            setFormValidation(true)
            userActions.resetPassword(newPassword, signature).then(resp => {
                if (resp.status === 204)
                    history.push("/login")
            })
        }
    }

    return (
        <Container className="form-center">
            <h2>비밀번호 재설정</h2>
            <Form onSubmit={handleSubmit} noValidate className={`${(isValidForm === false) ? ' was-validated' : ''}`}>
                <Form.Group as={Row} controlId="newPassword">
                    <Form.Label column sm={3}>새 비밀번호</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="password" required pattern={requiredPassword} value={newPassword} onChange={(ev) => {
                            setNewPassword(ev.target.value)
                        }} placeholder="비밀번호를 입력해주세요."/>
                        <div className="text-left invalid-feedback" style={{color: "red"}}>{ValidationText.NewPassword}</div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="confirmPassword">
                    <Form.Label column sm={3}>비밀번호 확인</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="password" required pattern={requiredPassword} placeholder=" 비밀번호를 다시 입력해주세요."/>
                        <div className="text-left invalid-feedback" style={{color: "red"}}>{ValidationText.ConfirmPassword}</div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{span: 9, offset: 3}}>
                        <Button type="submit">확인</Button>
                    </Col>
                </Form.Group>

            </Form>
        </Container>
    )
}