import { css } from "styled-components"

export const baseInputStyles = css`
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  border-radius: 4px;
  background-color: #fff;
  appearance: none;
  align-items: center;
  border: 1px solid #dbdbdb;
  display: inline-flex;
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(0.375em - 1px) calc(0.625em - 1px);
  position: relative;
  vertical-align: top;
  max-width: 100%;
  width: 100%;
  outline: 0;
  font-size: 1.2rem;

  &:hover {
    border-color: #b5b5b5;
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
    border-color: #3273dc;
  }
`
