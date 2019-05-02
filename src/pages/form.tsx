import { PageRendererProps } from "gatsby"
import React, { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"

type Props = PageRendererProps

const encode = (data: { [key: string]: any }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const StyledInput = styled.input`
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  border-radius: 4px;
  background-color: #fff;
  appearance: none;
  align-items: center;
  border: 1px solid #dbdbdb;
  display: inline-flex;
  height: 2.25em;
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

const InputWrapper = styled.div`
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
`

export const Form = (props: Props) => {
  const [isRecruiter, setIsRecruiter] = useState(false)
  const [fields, setFields] = useState({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      body: encode({
        "form-name": form.getAttribute("name"),
        ...fields,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    })
      .then(() => alert("form submitted"))
      .catch(error => alert(error))
  }

  const SalaryInput = props => (
    <InputMask {...props} mask="+4\9 99 999 99" maskChar=" " />
  )

  return (
    <Layout location={props.location} title={"Contact"}>
      <h3>You are: </h3>
      <button onClick={() => setIsRecruiter(true)}>Recruiter</button>
      <button onClick={() => setIsRecruiter(false)}>Entrepreneur</button>
      <form
        name="contact"
        method="post"
        action=""
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden={true}>
          <label>
            Don’t fill this out:{" "}
            <input required={true} name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <InputWrapper>
          <label>Name</label>
          <StyledInput
            required={true}
            type="text"
            name="name"
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Email</label>
          <StyledInput
            required={true}
            type="email"
            name="email"
            onChange={handleChange}
          />
        </InputWrapper>
        <p>
          <label>
            Description:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </Layout>
  )
}

export default Form
