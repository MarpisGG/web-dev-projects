import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/nusafood.png";
import projImg2 from "../assets/img/danson.png";
import projImg3 from "../assets/img/cookit.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export const Projects = () => {

  const projects = [
    {
      linkweb: "https://nusafoodwebsite.vercel.app/",
      title: "Nusafood",
      description: "Indonesian Food Virtual Exhibition",
      imgUrl: projImg1,
    },
    {
      linkweb: "#",
      title: "Dansons",
      description: "UI/UX Design for dance learning app",
      imgUrl: projImg2,
    },
    {
      linkweb: "#",
      title: "CookIT",
      description: "Android App for cooking recipes",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>These are some of my best projects</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}

