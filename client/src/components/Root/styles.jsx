import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div `
    margin: 0 auto;
    max-width: 1350px;
    width: 100%;
    display: flex;
    align-items: flex-start;
`
export const LeftSidebar = styled.div `
    max-width: 100%;
    margin: 30px 15px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: white;
`
export const CompanyInfo = styled.div `
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: white;
`
export const Menu = styled.nav `
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
`
export const MenuItem = styled(NavLink) `
    padding: 5px 15px;
    display: flex;
    gap: 10px;
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    color: rgba(30, 41, 59, 1);
    background-color: white;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &.active {
        color: #1196CC;
    }
`
export const UserInfo = styled.div `
    padding: 25px 0 0;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E2E8F0;
`
export const Exit = styled.img `
    cursor: pointer;
    height: 40px;
`
export const RightSidebar = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    border-top: 1px solid white;
`
export const UserArea = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 20px 24px;
`
export const FriendSuggestions = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px;
`
export const FriendSuggestionsField = styled.div `
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #E2E8F0;
`
export const UserDescription = styled.div `
    display: flex;
    gap: 15px;
    align-items: center;
`
export const UserName = styled.div `
    display: flex;
    flex-direction: column;
`
export const PlusIcon = styled.img`
    cursor: pointer;
`