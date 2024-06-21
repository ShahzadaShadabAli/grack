import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import {Link, useNavigate} from "react-router-dom"
import useCheckTokenExpired from "../../hooks/useCheckTokenExpired";
import api from "../../Inceptor/api";
import useLogout from "../../hooks/useLogout";
import useCheckValidate from "../../hooks/useCheckValidate";

const TrackHistory = () => {
    const navigate = useNavigate()
    const isExpiredToken = useCheckTokenExpired()
    const user = JSON.parse(localStorage.getItem('user'))
    const logout = useLogout()
   if (user) {
    if (isExpiredToken(user.token)) {
        logout()
    }
   } else {
    logout()
   }
    let today = new Date().toLocaleDateString()
    const [month, day, year] = today.split('/');
    const formattedToday = `${year}-${parseInt(month)}-${parseInt(day)}`

    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function fetchTracks() {
        setIsLoading(true);
        try {
            const response = await api.get('https://grack.vercel.app/workouts');
            if (response.statusText === 200) {
                setTracks(response.data);
                setIsLoading(false);
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
        if (user) {
            if (isExpiredToken(user.token)) {
                logout()
            }
            fetchTracks();
           } else {
            navigate('/')
           }
    }, []);


    return (
        <Container className="overlay">
            <Row>
                <Col lg={12} className="bg-light track-history">
                    <div className="h-tracks">
                    
                        <Link to={`/track/${formattedToday}`} className="h-track add-new"></Link>
                        {tracks.map(d => {
                            const convertedDate = d._id.split('/').join('-');
                        return (
                            <Link to={`/track/${convertedDate}`} className="h-track">
                                <span className="cross"><i class="fa-solid fa-xmark"></i></span>
                                <h6 className="workout-heading text-light h-qty-heading mt-2">{convertedDate}</h6>
                                <span className="d-flex"><h6 className="mt-1 text-light h-qty-heading">{d.day} Day</h6></span>
                                <span className="d-flex"><h6 className=" text-light h-qty-heading">{d.totalWeight}kg Lifted</h6></span>
                            </Link>
                        )
                        }) }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TrackHistory;
