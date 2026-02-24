import styled from "styled-components";

export const Button = styled.button `
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: white;
    text-align: center;
    border-radius: 30px;
    border: none;
    padding: 12px 20px;
    background-color: #4F46E5;
    cursor: pointer;

    &:hover {
        background-color:#1196CC;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`