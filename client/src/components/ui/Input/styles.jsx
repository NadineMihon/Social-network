import styled from "styled-components";

export const Input = styled.input `
    max-width: 400px;
    width:${props => props.$width === 'auto' ? 'auto' : '100%'};
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: #475569;
    padding: 12px;
    outline: none;
    background: none;
    border: 1px solid #CBD5E1;
    border-radius: 30px;
`