import { Form } from "react-bootstrap";

export default function ValidationError({ text }) {
  return <Form.Text className="text-danger">{text}</Form.Text>;
}
