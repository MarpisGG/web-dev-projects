import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import navIcon4 from '../assets/img/nav-icon4.svg';

// export const Contact = () => {
//   const formInitialDetails = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: ''
//   }
//   const [formDetails, setFormDetails] = useState(formInitialDetails);
//   const [buttonText, setButtonText] = useState('Send');
//   const [status, setStatus] = useState({});

//   const onFormUpdate = (category, value) => {
//       setFormDetails({
//         ...formDetails,
//         [category]: value
//       })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setButtonText("Sending...");
//     let response = await fetch("http://localhost:5000/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(formDetails),
//     });
//     setButtonText("Send");
//     let result = await response.json();
//     setFormDetails(formInitialDetails);
//     if (result.code == 200) {
//       setStatus({ success: true, message: 'Message sent successfully' });
//     } else {
//       setStatus({ success: false, message: 'Something went wrong, please try again later.' });
//     }
//   };

//   return (
//     <section className="contact" id="connect">
//       <Container>
//         <Row className="align-items-center">
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                 <h2>Get In Touch</h2>
//                 <form onSubmit={handleSubmit}>
//                   <Row>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} style={{ borderRadius: '10px' }} />
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} style={{ borderRadius: '10px' }} />
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} style={{ borderRadius: '10px' }} />
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} style={{ borderRadius: '10px' }} />
//                     </Col>
//                     <Col size={12} className="px-1">
//                       <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} style={{ borderRadius: '10px' }}></textarea>
//                       <button type="submit" style={{ borderRadius: '10px' }}><span>{buttonText}</span></button>
//                     </Col>
//                     {
//                       status.message &&
//                       <Col>
//                         <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
//                       </Col>
//                     }
//                   </Row>
//                 </form>
//               </div>}
            
//             </TrackVisibility>
//           </Col>
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" style={{ borderRadius: '10px' }}/>
//               }
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   )
// }


import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_0c7pdnn', 'template_hytv588', form.current, {
        publicKey: 'uFTUH8eQ6bUAqbUnI',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col size={12} md={6}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <h4 className="mb-4 font-weight-bold">Write me a Message 👇👇</h4>
                <form ref={form} onSubmit={sendEmail}>
                    <Col size={12}className="px-1">
                      <label>Name</label>
                      <input type="text" name="user_name" placeholder="Your Name" style={{ borderRadius: '10px' }} />
                    </Col>
                    <Col size={12}className="px-1">
                      <label>Email</label>
                      <input type="email" name="user_email" placeholder="Your Email" style={{ borderRadius: '10px' }} />
                    </Col>
                    <Col size={12} className="px-1">
                      <label>Message</label>
                      <textarea name="message" rows="6" placeholder="Your Message" style={{ borderRadius: '10px' }}></textarea>
                    </Col>
                    <Row size={12} className="px-1">
                      <button type="submit" style={{ borderRadius: '10px' }}>
                        <span>Send</span>
                      </button>
                    </Row>
                </form>
              </div>
            }
          </TrackVisibility>
        </Col>
        <Col size={12} md={6}>
          <TrackVisibility>
            {({ isVisible }) =>
              <img
                className={isVisible ? "animate__animated animate__zoomIn" : ""}
                src={contactImg}
                alt="Contact Us"
                style={{ borderRadius: '10px' }}
              />
            }
          </TrackVisibility>
        </Col>
      </Row>
    </Container>
  </section>
);

};