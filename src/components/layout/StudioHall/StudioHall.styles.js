// src/components/layout/StudioHall/StudioHall.styles.js

import styled from 'styled-components';
import { flexCenter } from '../../../styles/mixins';

export const StudioContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme.colors.background};
`;
