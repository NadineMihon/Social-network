import { useState } from "react";
import { Avatar } from "../../../ui/Avatar";
import { Container } from "../../../ui/Container";
import { Form } from "../../../ui/Form";
import { Input } from "../../../ui/Input";
import { MessageButton } from "../../../ui/MessageButton";
import messageIcon from "../../../../assets/icons/messageIcon.svg";

import * as SC from "./styles";

const DEFAULT_VALUE = { content: '' };

export const CreateComment = ({ onSubmitForm }) => {
    const [formValue, setFormValue] = useState(DEFAULT_VALUE);

    const onChange = (name, value) => {
        setFormValue({ ...formValue, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitForm(formValue);
        setFormValue(DEFAULT_VALUE);
    };

    const disabled = !formValue.content;

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <SC.CommentInfo>
                    <SC.Comment>
                        <Avatar />
                        <Input 
                            name="content"
                            type="text"
                            placeholder="Напишите комментарий"
                            value={formValue.content}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                        />
                    </SC.Comment>
                    <MessageButton type='submit' disabled={disabled}>
                        <img src={messageIcon} alt="Message Icon" />    
                    </MessageButton>
                </SC.CommentInfo>
            </Form>
        </Container>
    )
};