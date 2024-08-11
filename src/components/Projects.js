import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Skills } from "./Skills";

export const Projects = () => {

    const projects = [
        {
            title: "Home Planning",
            description: "Transforming your dream home into a detailed, livable blueprint",
            imgUrl: projImg1,
        },
        {
            title: "Plot Design",
            description: "Optimizing your plot for functionality, aesthetics, and future growth",
            imgUrl: projImg2,
        },
        {
            title: "Design Consultancy",
            description: "Expert guidance to bring your architectural vision to life",
            imgUrl: projImg3,
        }
    ];

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Projects</h2>
                                    <p>At DP Solutions, we bring your architectural visions to life with precision and creativity. From conceptual design to detailed plot planning and meticulous house mapping, our expert team is dedicated to turning your ideas into reality. Whether you're envisioning a modern home, a commercial space, or a unique architectural masterpiece, we offer comprehensive solutions tailored to your needs. With a commitment to quality, innovation, and client satisfaction, we ensure that every project is not just built, but crafted to perfection..</p>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Services Provided</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Clients </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">Ongoing Projects</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                            <Tab.Pane eventKey="first">
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
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <p> Comming Soon.....</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <p> Comming Soon.....</p>
                                            </Tab.Pane>
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
