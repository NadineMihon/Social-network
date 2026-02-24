import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Typo } from "../../components/ui/Typo";
import { Field } from "../../components/ui/Field";
import { Form } from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import * as SC from "./styles";

const DEFAULT_VALUES = { email: '', password: '' };

export const AuthPage = () => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        setFormValues(DEFAULT_VALUES);
    };

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const disabled = !formValues.email || !formValues.password;

    return (
        <Container>
            <SC.Wrapper>
                <Card>
                    <SC.AuthWrapper>
                        <Field>
                            <Typo variant="title">Авторизация</Typo>    
                        </Field>
                        <Form onSubmit={onSubmit}>
                            <Field>
                                <Input 
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    placeholder="Электронная почта"
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formValues.password} 
                                    placeholder="Пароль"
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button type="submit" disabled={disabled}>Войти</Button>
                            </Field>
                        </Form>
                    </SC.AuthWrapper>
                </Card>    
            </SC.Wrapper>
        </Container>
    )
};