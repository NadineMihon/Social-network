import styled from "styled-components";

export const MessageButton = styled.button `
    cursor: pointer;
    border-radius: 30px;
    padding: 9px 10px 8px 12px;
    border: 1px solid #ffffff;
    background: white;

    &:hover {
        border: 1px solid #4F46E5;
    }

    &:disabled {
        border: none;
    }
`