import { PageRendererProps } from "gatsby"
import Slider from "rc-slider"
// tslint:disable-next-line:no-submodule-imports
import "rc-slider/assets/index.css"
import React, { ChangeEvent, useState } from "react"
import styled, { css } from "styled-components"
import { Layout } from "../components/layout"

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

type Props = PageRendererProps

const encode = (data: { [key: string]: any }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const BaseInputCss = css`
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

const StyledInput = styled.input`
  height: 2.25em;
  ${BaseInputCss};
`

const StyledTextArea = styled.textarea`
  ${BaseInputCss};
  resize: none;
`

const InputWrapper = styled.div`
  box-sizing: border-box;
  clear: both;
  position: relative;
  text-align: left;
`

const BaseFormContainer = styled.div`
  display: flex;
`

const BaseFormColumn = styled.div``

const LeftBaseFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 1rem;
`

const RightBaseFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1rem;
  text-align: center;
`

const AboutButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const SliderWrapper = styled.div`
  margin-bottom: 2rem;
`

const SliderLabel = styled.p`
  margin-bottom: 3rem;
`

const SalarySlider = styled(SliderWrapper)`
  margin-top: 1rem;
`

const DEFAULT_SALARY_RANGE = [120, 140]

type PersonType = "recruiter" | "entrepreneur"

const Button = props => {
  return (
    <button type="button" {...props}>
      {props.children}
    </button>
  )
}

export const Form = (props: Props) => {
  const [personType, setIsPersonType] = useState<PersonType | undefined>(
    undefined
  )
  const [fields, setFields] = useState({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }

  const onSalaryChange = (values: [number, number]) => {
    setFields({
      ...fields,
      salary: values,
    })
  }

  const onBudgetChange = (values: [number, number]) => {
    setFields({
      ...fields,
      budget: values,
    })
  }

  const onTimelineChange = (values: [number, number]) => {
    setFields({
      ...fields,
      timeline: values,
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    console.log(fields, "fields")
    e.preventDefault()
    const form = e.target
    fetch("/", {
      body: encode({
        "form-name": form.getAttribute("name"),
        ...fields,
        personType,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    })
      .then(() => alert("form submitted"))
      .catch(error => alert(error))
  }

  const renderJobForm = () => {
    return (
      <>
        <h3>Interesting Job Description</h3>
        <InputWrapper>
          <label>Company Name</label>
          <StyledInput
            required={true}
            type="text"
            name="company"
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Location</label>
          <StyledInput
            placeholder={'You can put "Remote" here'}
            required={true}
            type="text"
            name="location"
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Job Title</label>
          <StyledInput
            required={true}
            type="text"
            name="location"
            onChange={handleChange}
          />
        </InputWrapper>
        <SalarySlider>
          <SliderLabel>Salary</SliderLabel>
          <Range
            allowCross={false}
            min={100}
            max={200}
            defaultValue={DEFAULT_SALARY_RANGE}
            tipFormatter={(value: string) => `$${value}k`}
            tipProps={{ visible: true }}
            step={5}
            onChange={onSalaryChange}
          />
        </SalarySlider>
        <InputWrapper>
          <label> What is the gig all about?</label>
          <StyledTextArea
            placeholder={
              "Describe the company culture, some of the daily tasks, benefits and such. Please avoid copypasta :)"
            }
            name={`${personType}-message`}
            onChange={handleChange}
            rows={"10"}
          />
        </InputWrapper>
      </>
    )
  }

  const renderInquiryForm = () => {
    return (
      <>
        <h3>Let's Do Something Cool!</h3>
        <SliderWrapper>
          <SliderLabel>Timeline</SliderLabel>
          <Range
            defaultValue={[3, 6]}
            max={36}
            tipFormatter={(value: string) => `${value} months`}
            tipProps={{ visible: true }}
            onChange={onTimelineChange}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderLabel>Budget</SliderLabel>
          <Range
            allowCross={false}
            min={5}
            max={995}
            defaultValue={[25, 100]}
            tipFormatter={(value: string) => `$${value}k`}
            tipProps={{ visible: true }}
            step={10}
            onChange={onBudgetChange}
          />
        </SliderWrapper>
        <InputWrapper>
          <label> What will we be doing?</label>
          <StyledTextArea
            placeholder={
              "A nice introduction about you or your business and the project"
            }
            name={`${personType}-message`}
            onChange={handleChange}
            rows={"10"}
          />
        </InputWrapper>
      </>
    )
  }

  // About you

  return (
    <Layout location={props.location} title={"Contact"}>
      <h3>About You</h3>
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
            <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <BaseFormContainer>
          <LeftBaseFormContainer>
            <InputWrapper>
              <label>Your Name</label>
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
            <InputWrapper>
              <label>Phone</label>
              <StyledInput
                required={true}
                type="text"
                name="phone"
                onChange={handleChange}
              />
            </InputWrapper>
          </LeftBaseFormContainer>
          <RightBaseFormContainer>
            <h4>Choose One</h4>
            <AboutButtons>
              <Button onClick={() => setIsPersonType("recruiter")}>
                Recruiter
              </Button>
              <Button onClick={() => setIsPersonType("entrepreneur")}>
                Entrepreneur
              </Button>
            </AboutButtons>
          </RightBaseFormContainer>
        </BaseFormContainer>
        {personType === "recruiter" && renderJobForm()}
        {personType === "entrepreneur" && renderInquiryForm()}
        {personType && (
          <p>
            <button type="submit">Send</button>
          </p>
        )}
      </form>
    </Layout>
  )
}

export default Form
