import { Col } from "react-bootstrap";

export const ProjectCard = ({ linkweb, title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <a href={linkweb}>
          <img src={imgUrl} />
          <div className="proj-txtx" style={{ color: 'white' }}>
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </a>
      </div>
    </Col>
  )
}
