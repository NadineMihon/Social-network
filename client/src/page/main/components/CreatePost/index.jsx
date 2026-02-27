import { useState } from "react";
import { Container } from "../../../../components/ui/Container";
import { Card } from "../../../../components/ui/Card";
import { Form } from "../../../../components/ui/Form";
import { TextAria } from "../../../../components/ui/TextAria";
import { Field } from "../../../../components/ui/Field";
import { Input } from "../../../../components/ui/Input";
import { Typo } from "../../../../components/ui/Typo";
import { Button } from "../../../../components/ui/Button";

import * as SC from "./styles";

const DEFAULT_VALUES = { body: '', visibility: 'public' };

export const CreatePost = ({ onSubmitForm }) => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES);

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitForm(formValues);
        setFormValues(DEFAULT_VALUES);
    };

    const disabled = !formValues.body;

    return (
        <Container>
            <SC.CreatePostWrapper>
                <Card>                        
                    <SC.CreatePost>
                        <Form onSubmit={onSubmit}>
                            <TextAria 
                                name="body"
                                value={formValues.body} 
                                placeholder="Текст поста" 
                                rows={5} 
                                cols={30}
                                onChange={(e) => onChange(e.target.name, e.target.value)}
                            />
                            <Field>
                                <SC.Label>
                                    <Typo>Только для друзей</Typo>
                                    <Input 
                                        name="visibility"
                                        checked={formValues.visibility === 'friends'}
                                        $width="auto" 
                                        type="checkbox" 
                                        onChange={(e) => onChange(e.target.name, e.target.checked ? 'friends' : 'public')}
                                    />    
                                </SC.Label>
                                <Button type='submit' disabled={disabled}>Создать пост</Button>
                            </Field>    
                        </Form>
                    </SC.CreatePost> 
                </Card>
            </SC.CreatePostWrapper>
        </Container>
    )
};