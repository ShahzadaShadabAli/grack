import { useState } from "react";
import { Col, Container, Row, Form, Button, CardBody } from "react-bootstrap";
import useRegister from "../../hooks/useRegister";
import Alert from 'react-bootstrap/Alert'
import useCheckValidate from "../../hooks/useCheckValidate";


const RegisterScreen = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ conPassword, setConPassword ] = useState('')
    const {register, error, isLoading, setError} = useRegister()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password == conPassword) {
            await register(name, email, password)
        } else {
            setError("Passwords do not match")
        }
    }

    return (
       <Container className="screen">
        <Row>
            <Col lg={6} md={12} sm={12} className="p-0 first-col">
            <img src="/gym-image.jpg" className="img-fluid" alt="jjj"/>
            </Col>
            <Col lg={6} md={12} sm={12} className="bg-light d-flex justify-content-center">
            <CardBody className="w-75 mx-auto p-5">
                <h1 className="text-center mb-3">Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <h6>Name</h6>
                    <Form.Control type="text" onInput={(e) => setName(e.target.value)} placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <h6>Email address</h6>
                    <Form.Control type="email" onInput={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>

                    <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <h6>Password</h6>
                        <Form.Control type="password" onInput={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <h6>Confirm Password</h6>
                        <Form.Control type="password" onInput={(e) => setConPassword(e.target.value)} placeholder="Confirm Password" />
                        </Form.Group>
                    </Col>
                    </Row>

                    <Form.Group className="w-100">
                    {!isLoading && <Button variant="dark" type="submit" className="w-100">
                    Register
                    </Button>}
                    {isLoading && <Button variant="dark" disabled type="submit" className="w-100">
                    Registering...
                    </Button>}
                    </Form.Group>
                </Form>
                {error && <Alert className="mt-4 text-center" variant={'danger'}>
                    {error}
                    </Alert>}
                </CardBody>
            </Col>
        </Row>
       </Container>
    );
}

export default RegisterScreen;
