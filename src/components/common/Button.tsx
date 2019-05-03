import React, { ButtonHTMLAttributes } from "react"
import styled from "styled-components"
import { rhythm, styledScale } from "../../utils/typography"

type ButtonProps = Partial<ButtonHTMLAttributes<HTMLButtonElement>>

const StyledButton = styled.button`
  ${styledScale(0.25)};
  appearance: none;
  align-items: center;
  border: ${rhythm(0.2)} solid transparent;
  border-radius: ${rhythm(0.15)};
  box-shadow: none;
  display: inline-flex;
  justify-content: flex-start;
  padding-left: ${rhythm(1)};
  padding-right: ${rhythm(1)};
  padding-top: ${rhythm(0.2)};
  padding-bottom: ${rhythm(0.25)};
  position: relative;
  cursor: pointer;
  outline: none;
  background: rgb(${props => props.theme.palette.mainBrand}, 0.9);
  color: rgb(${props => props.theme.palette.lightShades});

  &:focus,
  &:active {
    background-color: rgba(${props => props.theme.palette.mainBrand}, 1);
    box-shadow: 0 0 0 ${rhythm(0.1)}
      rgba(${props => props.theme.palette.mainBrand}, 0.1);
  }

  &:hover {
    background-color: rgba(${props => props.theme.palette.mainBrand}, 1);
  }
`
export const Button = (props: ButtonProps) => {
  return (
    <StyledButton type="button" {...props}>
      {props.children}
    </StyledButton>
  )
}
