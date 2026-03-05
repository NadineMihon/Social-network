import styled from "styled-components"

export const Typo = styled.p `
    margin: 0;
    text-align: left;
    color: #1E293B;

    &[data-variant='title'] {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
    }

    &[data-variant='subtitle'] {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        letter-spacing: -0.007em;
    }

    &[data-variant='body'] {
        font-size: 14px;
        font-weight: 400;
        line-height: 160%;
    }

    &[data-tone='muted'] {
        color: #475569;
    }  

    &[data-weight='bold'] {
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.006em
    }

    &[data-variant='caption'] {
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        color: #47556989;
    }
`