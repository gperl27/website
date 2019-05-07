import { ThemeManagerContext } from "gatsby-styled-components-dark-mode"
import * as React from "react"
import { useContext } from "react"
import styled, { css, withTheme } from "styled-components"
import { rhythm } from "../../utils/typography"

const IsOnStyles = css`
  background: linear-gradient(
    rgb(${props => props.theme.palette.lightAccent}),
    rgb(${props => props.theme.palette.lightShades})
  );
  box-shadow: inset 0 7px 0 rgb(${props => props.theme.palette.lightShades}),
    0 2px 3px rgba(${props => props.theme.palette.lightShades}, 0.3);

  &:before {
    background: rgb(${props => props.theme.palette.darkAccent});
    box-shadow: 0 1px 1px rgba(${props => props.theme.palette.lightAccent}, 0.2),
      0 3px 3px rgba(${props => props.theme.palette.lightAccent}, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      0 0 5px rgba(${props => props.theme.palette.lightAccent}, 0.5);
  }

  &:after {
    background: linear-gradient(
      160deg,
      rgba(${props => props.theme.palette.lightAccent}, 0.7),
      rgba(${props => props.theme.palette.lightAccent}, 0)
    );
    background: -webkit-linear-gradient(
      290deg,
      rgba(${props => props.theme.palette.lightAccent}, 0.75),
      rgba(${props => props.theme.palette.lightAccent}, 0)
    );
  }
`

const StyledInput = styled.input`
  position: absolute;
  visibility: hidden;
`

const StyledLabel = styled.div`
  display: block;
  position: relative;
  width: ${rhythm(2.5)};
  height: ${rhythm(4)};
  cursor: pointer;
  border-radius: ${rhythm(20)};
  background: rgb(${props => props.theme.palette.darkAccent});
  background: linear-gradient(
    rgb(${props => props.theme.palette.darkAccent}),
    rgb(${props => props.theme.palette.darkShades})
  );
  box-shadow: inset 0 -5px 0 rgb(${props => props.theme.palette.darkAccent}),
    0 6px 5px rgba(${props => props.theme.palette.darkShades}, 0.75),
    3px 16px 5px rgba(${props => props.theme.palette.darkShades}, 0.3);

  &:before {
    content: "";
    position: absolute;
    top: ${rhythm(-0.3)};
    bottom: ${rhythm(-0.3)};
    left: ${rhythm(-0.15)};
    right: ${rhythm(-0.15)};
    z-index: -1;
    border-radius: inherit;
    background: rgb(${props => props.theme.palette.lightAccent});
    box-shadow: 0 1px 1px rgba(${props => props.theme.palette.darkAccent}, 0.2),
      0 3px 3px rgba(${props => props.theme.palette.darkAccent}, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      0 0 5px rgba(${props => props.theme.palette.darkAccent}, 0.5);
  }

  &:after {
    content: "";
    position: absolute;
    width: ${rhythm(2.2)};
    height: ${rhythm(3)};
    border-radius: 50%;
    z-index: -1;
    left: ${rhythm(0.7)};
    top: ${rhythm(0.5)};
    background: linear-gradient(
      160deg,
      rgba(${props => props.theme.palette.darkAccent}, 0.7),
      rgba(${props => props.theme.palette.darkAccent}, 0)
    );
    background: -webkit-linear-gradient(
      290deg,
      rgba(${props => props.theme.palette.darkAccent}, 0.75),
      rgba(${props => props.theme.palette.darkAccent}, 0)
    );
    -webkit-filter: blur(1px);
    display: ${props => props.theme.isDark && "none"};

    @media (max-width: 991px) {
      width: ${rhythm(1)};
      height: ${rhythm(2)};
    }

    @media (max-width: 456px) {
      width: ${rhythm(1)};
      height: ${rhythm(2)};
    }
  }

  ${props => props.theme.isDark && IsOnStyles};

  @media (max-width: 991px) {
    width: ${rhythm(1.5)};
    height: ${rhythm(3)};
  }

  @media (max-width: 456px) {
    width: ${rhythm(1.5)};
    height: ${rhythm(2)};
  }
`

const InnerContentDarkStyles = css`
  color: rgb(${props => props.theme.palette.darkShades});
`

const StyledInnerContent = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  color: rgb(${props => props.theme.palette.lightShades});

  ${props => props.theme.isDark && InnerContentDarkStyles};
`

export const LightSwitch = withTheme(() => {
  const themeContext = useContext(ThemeManagerContext)

  return (
    <>
      <StyledInput
        type="checkbox"
        name="lightSwitch"
        readOnly={true}
        checked={themeContext.isDark}
      />
      <StyledLabel onClick={() => themeContext.toggleDark()}>
        <StyledInnerContent>X</StyledInnerContent>
      </StyledLabel>
    </>
  )
})
