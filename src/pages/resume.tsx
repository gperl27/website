import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import education from "../../content/resume/education.json"
import experiences from "../../content/resume/experience.json"
import skills from "../../content/resume/skills.json"
import summary from "../../content/resume/summary.json"
import { rhythm } from "../utils/typography"

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: ${rhythm(1)};
  max-width: ${rhythm(36)};
`

const ResumeContainer = styled.div`
  display: flex;
`

const LeftSide = styled.div`
  padding-right: ${rhythm(1)};
  border-right: 1px solid rgba(${props => props.theme.palette.mainBrand}, 0.2);
  flex: 3;
`

const RightSide = styled.div`
  padding-left: ${rhythm(1)};
  flex: 1;
`

const Jumbotron = styled.div`
  text-align: center;
  padding: ${rhythm(4)};
  background: rgb(${props => props.theme.palette.mainBrand});
  color: rgb(${props => props.theme.palette.lightShades});
  margin: 0 auto ${rhythm(1)};
`

const JumboName = styled.h1`
  padding: 0;
  margin: 0;
  font-family: Montserrat, serif;
`

const Title = styled.h2`
  font-family: Montserrat, serif;
`

const EducationTitle = styled.h5`
  margin-bottom: ${rhythm(0.25)};
`

const EducationDescription = styled.p`
  font-size: ${rhythm(0.5)};
`

const SkillListItem = styled.li`
  font-size: ${rhythm(0.6)};
  list-style-type: circle;
`

const ExperienceAccomplishmentListItem = styled.li`
  font-size: ${rhythm(0.6)};
`

const ExperienceCompanyHeader = styled.h4`
  margin-bottom: ${rhythm(0.25)};
`

const ContactList = styled.ul`
  margin-left: 0;
`

const ContactListItem = styled.li`
  font-size: ${rhythm(0.6)};
  list-style-type: none;
  white-space: nowrap;
`

const ContactListIcon = styled(FontAwesomeIcon)`
  margin-right: ${rhythm(0.5)};
  margin-left: ${rhythm(0.25)};
`

const ContactListLink = styled.a`
  color: black;
  &:hover {
    color: rgb(${props => props.theme.palette.mainBrand});
  }
`

const Experiences = experiences.map(experience => {
  return (
    <span key={experience.name}>
      <h3>{experience.title}</h3>
      <ExperienceCompanyHeader>
        <em>
          {experience.name} - {experience.location}
        </em>
      </ExperienceCompanyHeader>
      <h4>
        <em>
          {experience.from} - {experience.to}
        </em>
      </h4>
      <ul>
        {experience.accomplishments.map(accomplishment => (
          <ExperienceAccomplishmentListItem key={accomplishment}>
            {accomplishment}
          </ExperienceAccomplishmentListItem>
        ))}
      </ul>
    </span>
  )
})

const Skills = skills.map(skill => {
  return (
    <span key={skill.title}>
      <h4>
        <em>{skill.title}</em>
      </h4>
      <ul>
        {skill.items.map(item => (
          <SkillListItem key={item}>{item}</SkillListItem>
        ))}
      </ul>
    </span>
  )
})

const Education = education.map(edu => {
  return (
    <span key={edu.name}>
      <EducationTitle>{edu.name}</EducationTitle>
      <EducationDescription>{edu.description}</EducationDescription>
    </span>
  )
})

const Resume = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          social {
            linkedIn
            github
          }
        }
      }
    }
  `)

  const { github, linkedIn } = data.site.siteMetadata.social
  const githubUrl = `github.com/${github}`
  const linkedInUrl = `linkedin.com/in/${linkedIn}`
  const email = process.env.GATSBY_EMAIL || ""
  const phone = process.env.GATSBY_PHONE || ""
  const address = process.env.GATSBY_ADDRESS || ""

  return (
    <>
      <Jumbotron>
        <JumboName>{data.site.siteMetadata.author}</JumboName>
      </Jumbotron>
      <Container>
        <ResumeContainer>
          <LeftSide>
            <Title>Summary</Title>
            <p>{summary.summary}</p>
            <Title>Experience</Title>
            {Experiences}
          </LeftSide>
          <RightSide>
            <Title>Contact</Title>
            <ContactList>
              <ContactListItem>
                <ContactListIcon icon={faEnvelope} />
                <ContactListLink href={`mailto:${email}`}>
                  {email}
                </ContactListLink>
              </ContactListItem>
              <ContactListItem>
                <ContactListIcon icon={faPhone} />
                <ContactListLink href={`tel:${phone}`}>{phone}</ContactListLink>
              </ContactListItem>
              <ContactListItem>
                <ContactListIcon icon={faMapMarkerAlt} />
                {address}
              </ContactListItem>
              <ContactListItem>
                <ContactListIcon icon={faLinkedin} />
                <ContactListLink href={`https://${linkedInUrl}`}>
                  {linkedInUrl}
                </ContactListLink>
              </ContactListItem>
              <ContactListItem>
                <ContactListIcon icon={faGithub} />
                <ContactListLink href={`https://${githubUrl}`}>
                  {githubUrl}
                </ContactListLink>
              </ContactListItem>
            </ContactList>
            <Title>Skills</Title>
            {Skills}
            <Title>Education</Title>
            {Education}
          </RightSide>
        </ResumeContainer>
      </Container>
    </>
  )
}

export default Resume
