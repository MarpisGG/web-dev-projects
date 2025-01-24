import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/Marvell.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>              
                <img src={headerImg} alt="Header Img"/>
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Hi! I'm Marvell Christofer`} </h1>
                <h1>
                <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Cyber Security", "UI/UX Designer","Mobile Application Developer" ]'><span className="wrap">{text}</span></span>
                  </h1>
                  <p>I am an Informatics student at Universitas Multimedia Nusantara. Interested in website development, mobile app development, UI/UX design, and cybersecurity, I’ve gained valuable hands-on skills both in and outside the classroom. My involvement in various organizations has taught me the importance of teamwork and collaboration, while my academic journey has helped me embrace new ideas and innovation. I am eager to apply my knowledge in real-world projects, contribute to a team, and continue enhance my skills.</p>
              <a href={process.env.PUBLIC_URL + "/assets/cv/Marvell Christofer-CV.pdf"} download="Marvell Christofer-CV.pdf">
                <button>Download My CV<ArrowRightCircle size={25} /></button>
              </a>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
