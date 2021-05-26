import {
  FcApproval,
  FcConferenceCall,
  FcDepartment,
  FcDeployment,
  FcHome,
  FcOrganization
} from 'react-icons/fc';
import styled, { css } from 'styled-components';

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  img {
    height: 56px;
  }
`;

const iconCSS = css`
  flex-shrink: 0;

  width: 30px;
  height: 30px;
  /* color: var(--primary); */
`;

export const HomeIcon = styled(FcHome)`
  ${iconCSS}
`;

export const UsersIcon = styled(FcConferenceCall)`
  ${iconCSS}
`;

export const EstablishmentsIcon = styled(FcOrganization)`
  ${iconCSS}
`;

export const UnitsIcon = styled(FcDepartment)`
  ${iconCSS}
`;

export const ActivesIcon = styled(FcDeployment)`
  ${iconCSS}
`;

export const StatusIcon = styled(FcApproval)`
  ${iconCSS}
`;
