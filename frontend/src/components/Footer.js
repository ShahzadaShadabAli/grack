import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-dark py-4 footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className='text-dark'>Track Your Workouts</h5>
            <p>Get Started To Get Jacked ASAP and lift em weights</p>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-3">
        <p>&copy; {new Date().getFullYear()} Grack</p>
      </div>
    </footer>
  );
}

export default Footer;
