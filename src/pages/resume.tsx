import { PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Query, SitePageContext } from "../graphql-types"
import { rhythm } from "../utils/typography"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: ${`${rhythm(1)}`};
  max-width: ${rhythm(36)};
`

const ResumeContainer = styled.div`
  display: flex;
`

const LeftSide = styled.div`
  padding-right: ${rhythm(1)};
  border-right: 1px solid black;
  flex: 3;
`

const RightSide = styled.div`
  padding-left: ${rhythm(1)};
  flex: 1;
`

const Resume = (props: Props) => {
  return (
    <Container>
      <h1>Greg Perlman</h1>
      <h2>gregperlman.dev</h2>
      <hr />
      <ResumeContainer>
        <LeftSide>
          <h2>Summary</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
          <h2>Experience</h2>
          <h3>Software Engineer</h3>
          <h4>
            <em>Boca Raton, FL 2016 - Present</em>
          </h4>
          <ul>
            <li>Blaralsdkfj asdlfkjasdflk as;lkfjasldkfj</li>
            <li>Blaralsdkfj asdlfkjasdflk as;lkfjasldkfj</li>
            <li>Blaralsdkfj asdlfkjasdflk as;lkfjasldkfj</li>
          </ul>
        </LeftSide>
        <RightSide>
          <ul>
            <li>email</li>
            <li>phone</li>
            <li>Delray Beach, FL</li>
            <li>linkedin</li>
            <li>github</li>
          </ul>
          <h2>Skills</h2>
          <h5>Expert</h5>
          <ul>
            <li>javascript</li>
            <li>typescript</li>
            <li>node</li>
            <li>laravel</li>
          </ul>
          <h2>Education</h2>
          <h3>Digital Media Studies</h3>
        </RightSide>
      </ResumeContainer>
    </Container>
  )
}

export default Resume
