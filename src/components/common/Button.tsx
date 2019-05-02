import React, { ButtonHTMLAttributes } from "react"
import styled from "styled-components"

type ButtonProps = Partial<ButtonHTMLAttributes<HTMLButtonElement>>

const StyledButton = styled.button`
  appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(0.375em - 1px) calc(0.625em - 1px);
  position: relative;
  vertical-align: top;
  background-color: #f5f5f5;
  cursor: pointer;
  outline: none;

  &:active {
    background-color: #e8e8e8;
    border-color: transparent;
    color: #363636;
  }

  &:focus {
    box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
  }

  &:hover {
    background-color: #eee;
    border-color: transparent;
    color: #363636;
  }
`
export const Button = (props: ButtonProps) => {
  return (
    <StyledButton type="button" {...props}>
      {props.children}
    </StyledButton>
  )
}
