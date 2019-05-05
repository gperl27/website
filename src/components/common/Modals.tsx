import styled, { keyframes } from "styled-components"
import Modal from "styled-react-modal"
import { Theme } from "../../utils/theme"
import { rhythm } from "../../utils/typography"

const ZoomIn = keyframes`
    from {
      transform: scale3d(.3, .3, .3);
    }
`

const StyledModal = Modal.styled`
  border-radius: ${rhythm(0.25)};
  padding: ${rhythm(3)};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
`

export const AppModal = styled(StyledModal)<{
  theme: Theme
  isOpen: boolean
}>`
  animation-name: ${ZoomIn};
  animation-timing-function: cubic-bezier(0.4, 0, 0, 1.5);
  animation-duration: 0.3s;
  animation-delay: 0s;

  background-color: rgb(
    ${props =>
      props.theme.isDark
        ? props.theme.palette.darkShades
        : props.theme.palette.lightShades}
  );
`
