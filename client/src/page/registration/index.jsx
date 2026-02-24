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

const DEFAULT_VALUES = { name: '', surname: '', email: '', password: '' };

export const RegistrationPage = () => {
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
    
    const disabled = !formValues.name || !formValues.email || !formValues.password;

    return (
        <Container>
            <SC.Wrapper>
                <Card>
                    <SC.RegistrationWrapper>
                        <Field>
                            <Typo variant="title">Регистрация</Typo>    
                        </Field>
                        <Form onSubmit={onSubmit}>
                            <Field>
                                <Input 
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    placeholder="Имя"
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Input 
                                    type="text"
                                    name="surname"
                                    value={formValues.surname}
                                    placeholder="Фамилия"
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Input 
                                    type="surname"
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
                                <Button type="submit" disabled={disabled}>Регистрация</Button>
                            </Field>
                        </Form>
                    </SC.RegistrationWrapper>
                </Card>    
            </SC.Wrapper>
        </Container>
    )
};