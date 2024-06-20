import { Col, Container, Row } from "react-bootstrap";
import ExerciseForm from "./Form";
import CreateTracks from "./CreateTracks";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import api from "../../Inceptor/api";
import useLogout from "../../hooks/useLogout";
import { useParams } from "react-router-dom";
import useCheckValidate from "../../hooks/useCheckValidate";
import useCheckTokenExpired from "../../hooks/useCheckTokenExpired";

const Main = () => {
    const logout = useLogout()
    const isExpiredToken = useCheckTokenExpired()
    const user = JSON.parse(localStorage.getItem('user'))
    if (isExpiredToken(user.token)) {
        logout()
    }

    const params = useParams()
    const [isNewTrack, setIsNewTrack] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function fetchTracks() {
        setIsLoading(true);
        try {
            const response = await api.get('/workouts/'+params.date);
            if (response.statusText === 'OK') {
                setTracks(response.data);
                setIsLoading(false);
                if (response.data.length === 0) {
                    setIsNewTrack(true);
                } else {
                    setIsNewTrack(false);
                }
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response.data.message == "jwt expired") {
                logout()
            } else {
                alert(error.message);
            }
        }
    }

    useEffect(() => {
        fetchTracks();
    }, []);

    const value = useAuthContext();
    return (
        <Container className="overlay">
            <Row>
                <Col lg={7} md={7} sm={12} className="py-5 tracks-section">
                    {isLoading && <div className="loader"><img src="/loader.gif" alt="" /></div>}
                    {(!isLoading && tracks) && <CreateTracks tracks={tracks} fetchTracks={fetchTracks} />}
                </Col>
                <Col lg={5} md={5} sm={12} className="bg-light form-section">
                    <ExerciseForm fetchTracks={fetchTracks} isNewTrack={isNewTrack} />
                </Col>
            </Row>
        </Container>
    );
}

export default Main;
