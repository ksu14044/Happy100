import styled from "@emotion/styled";
import { mediaQuery, responsiveFont } from "../../styles/responsive";

export const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 0;
`;

export const StatusMessage = styled.div`
    color: #6b7280;
    font-size: ${responsiveFont("13px", "15px")};
    text-align: center;
    padding: 48px 0;

    ${mediaQuery.tablet} {
        padding: 32px 0;
    }

    ${mediaQuery.mobile} {
        padding: 24px 0;
    }
`;

export const ErrorMessage = styled(StatusMessage)`
    color: #b91c1c;
`;
