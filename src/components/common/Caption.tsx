import styled from "styled-components"
import { rhythm } from "../../utils/typography"

export const Caption = styled.span`
  font-size: ${rhythm(0.5)};
  color: rgb(
    ${props =>
      props.theme.isDark
        ? props.theme.palette.darkAccent
        : props.theme.palette.lightAccent}
  );
`
