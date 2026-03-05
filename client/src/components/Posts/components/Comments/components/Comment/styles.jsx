import styled from "styled-components";

export const CommentInfo = styled.div `
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 15px;
    padding: 10px;
    background:#e2e8f03d;
    border-radius: 30px;
`
export const Comment = styled.div `
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    justify-content: space-between;
`
export const Content = styled.div `
    padding: 0 10px;
`
export const Info = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
`
export const DeleteComment = styled.div `
    position: absolute;
    top: 10px;
    right: 10px;
`