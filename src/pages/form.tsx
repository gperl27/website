import { PageRendererProps } from "gatsby"
import { createSliderWithTooltip, Range } from "rc-slider"
// tslint:disable-next-line:no-submodule-imports
import "rc-slider/assets/index.css"
import React, { ChangeEvent, useState } from "react"
import styled, { keyframes } from "styled-components"
import Modal from "styled-react-modal"
import { Button } from "../components/common/Button"
import { TextArea } from "../components/common/TextArea"
import { TextInput } from "../components/common/TextInput"
import { Layout } from "../components/layout"

const RangeWithTooltip = createSliderWithTooltip(Range)

const DEFAULT_SALARY_RANGE = [140, 250]
const DEFAULT_TIMELINE_RANGE = [3, 6]
const DEFAULT_BUDGET_RANGE = [25, 100]

type Props = PageRendererProps

type PersonType = "recruiter" | "entrepreneur"

const encode = (data: { [key: string]: any }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const InputWrapper = styled.div`
  box-sizing: border-box;
  clear: both;
  position: relative;
  text-align: left;
`

const BaseFormContainer = styled.div`
  display: flex;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`

const LeftBaseFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 1rem;

  @media (max-width: 991px) {
    padding: initial;
  }
`

const RightBaseFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1rem;
  text-align: center;

  @media (max-width: 991px) {
    padding: initial;
  }
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

const CloseButton = styled.div`
  position: absolute;
  left: 1rem;
  top: 0.5rem;
  font-size: 1rem;
`

const StyledH3 = styled.h3`
  margin-top: 1rem;
`

const SubmitButtonWrapper = styled.div`
  text-align: center;
  margin: 2rem auto auto;
`

const ZoomIn = keyframes`
    from {
      transform: scale3d(.3, .3, .3);
    }
`

const StyledModal = Modal.styled`
  border-radius: 0.625rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: white;
  position: relative;
`

const AnimatedModal = styled(StyledModal)<{ isOpen: boolean }>`
  animation-name: ${ZoomIn};
  animation-timing-function: cubic-bezier(0.4, 0, 0, 1.5);
  animation-duration: 0.3s;
  animation-delay: 0s;
`

export const Form = (props: Props) => {
  const [isShowing, setIsShowing] = useState(false)
  const [fields, setFields] = useState({})
  const [personType, setIsPersonType] = useState<PersonType | undefined>(
    undefined
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateFields({ [e.target.name]: e.target.value })
  }

  const onSliderChange = (name: string) => (values: [number, number]) => {
    updateFields({ [name]: values })
  }

  const updateFields = (value: { [key: string]: any }) => {
    setFields({ ...fields, ...value })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
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
      .then(() => handleSuccessfulSubmit(form))
      .catch(error => alert(error))
  }

  const handleSuccessfulSubmit = (form: HTMLFormElement) => {
    form.reset()

    setIsShowing(true)
    setIsPersonType(undefined)
    setFields({})
  }

  const renderHiddenInputsForStaticRendering = () => {
    return (
      <>
        <input type="hidden" name="salary" />
        <input type="hidden" name="budget" />
        <input type="hidden" name="timeline" />
        <input type="hidden" name="company" />
        <input type="hidden" name="location" />
        <input type="hidden" name="recruiter-message" />
        <input type="hidden" name="entrepreneur-message" />
      </>
    )
  }

  const renderJobForm = () => {
    return (
      <>
        <h3>Interesting Job Description</h3>
        <InputWrapper>
          <label>Company Name</label>
          <TextInput
            required={true}
            type="text"
            name="company"
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Location</label>
          <TextInput
            placeholder={'You can put "Remote" here if need be'}
            required={true}
            type="text"
            name="location"
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Job Title</label>
          <TextInput
            required={true}
            type="text"
            name="location"
            onChange={handleChange}
          />
        </InputWrapper>
        <SalarySlider>
          <SliderLabel>Salary</SliderLabel>
          <RangeWithTooltip
            allowCross={false}
            min={100}
            max={300}
            defaultValue={DEFAULT_SALARY_RANGE}
            tipFormatter={(value: number) => `$${value}k`}
            tipProps={{ visible: true }}
            step={5}
            onChange={onSliderChange("salary")}
          />
        </SalarySlider>
        <InputWrapper>
          <label> What is the gig all about?</label>
          <TextArea
            placeholder={
              "Describe the company culture, some of the daily tasks, benefits and such. Please avoid copypasta :)"
            }
            name={`${personType}-message`}
            onChange={handleChange}
            rows={10}
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
          <RangeWithTooltip
            defaultValue={DEFAULT_TIMELINE_RANGE}
            max={36}
            tipFormatter={(value: number) => `${value} months`}
            tipProps={{ visible: true }}
            onChange={onSliderChange("timeline")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderLabel>Budget</SliderLabel>
          <RangeWithTooltip
            allowCross={false}
            min={5}
            max={995}
            defaultValue={DEFAULT_BUDGET_RANGE}
            tipFormatter={(value: number) => `$${value}k`}
            tipProps={{ visible: true }}
            step={10}
            onChange={onSliderChange("budget")}
          />
        </SliderWrapper>
        <InputWrapper>
          <label> What will we be doing?</label>
          <TextArea
            placeholder={
              "A nice introduction about you or your business and the project"
            }
            name={`${personType}-message`}
            onChange={handleChange}
            rows={10}
          />
        </InputWrapper>
      </>
    )
  }

  return (
    <Layout location={props.location} title={"Greg Perlman"}>
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
        {renderHiddenInputsForStaticRendering()}
        <p hidden={true}>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <BaseFormContainer>
          <LeftBaseFormContainer>
            <InputWrapper>
              <label>Name</label>
              <TextInput
                required={true}
                type="text"
                name="name"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Email</label>
              <TextInput
                required={true}
                type="email"
                name="email"
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Phone</label>
              <TextInput type="text" name="phone" onChange={handleChange} />
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
          <SubmitButtonWrapper>
            <Button type="submit">Send</Button>
          </SubmitButtonWrapper>
        )}
      </form>
      <AnimatedModal
        onBackgroundClick={() => setIsShowing(false)}
        onEscapeKeydown={() => setIsShowing(false)}
        isOpen={isShowing}
        allowScroll={false}
      >
        <StyledH3>Thanks!</StyledH3>
        <p>I look forward to speaking with you!</p>
        <CloseButton onClick={() => setIsShowing(false)}>x</CloseButton>
      </AnimatedModal>
    </Layout>
  )
}

export default Form
