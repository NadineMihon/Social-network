import styled from "styled-components";

export const AuthorInfo = styled.div `
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #E2E8F0;
`
export const Author = styled.div `
    display: flex;
    gap: 12px;
    align-items: center;
`
export const AuthorName = styled.div `
    display: flex;
    flex-direction: column;
`
export const ContentInfo = styled.div `
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
    border-bottom: 1px solid #E2E8F0;
`
export const PostActions = styled.div`
    display: flex;
    gap: 25px;
    align-items: center;
`
export const PostAction = styled.div `
    display: flex;
    gap: 10px;
    align-items: center;
`
export const ActionIcon = styled.img `
    cursor: pointer;
`
export const CommentInfo = styled.div `
    width: 100%;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`
export const Comment = styled.div `
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
`
export const MessageIcon = styled.div`
    cursor: pointer;
    border-radius: 30px;
    padding: 9px 10px 8px 12px;
    border: 1px solid #ffffff;

    &:hover {
        border: 1px solid #4F46E5;
    }
`