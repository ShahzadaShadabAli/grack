import React from "react";
import api from "../../Inceptor/api"
const CreateTracks = ({ tracks, fetchTracks }) => {
    const handleClick = async (event, _id) => {
        const parent = event.target.parentNode.parentNode
        try {
            parent.remove();
          const response = await api.delete(`https://grack.vercel.app/workouts/${_id}`);
        } catch (error) {
          alert(error.message);
        }
      };
    return (
        <div className="tracks">
            {tracks && tracks.map((t, index) => {
                const wPerR = t.weight * t.reps;
                return (
                    <div className="track" key={index}>
                        <span className="cross" onClick={(event) => handleClick(event, t._id)}><i class="fa-solid fa-xmark"></i></span>
                        <h4 className="workout-heading">{t.workout}</h4>
                        <div className="d-flex justify-content-around">
                            <span className="d-flex"><h6 className="m-0 qty-heading">Reps :</h6>{t.reps}</span>
                            <span className="d-flex"><h6 className="m-0 qty-heading">Weight :</h6>{t.weight}kg</span>
                        </div>
                        <h6 className="text-center progress-heading">( {wPerR}kg lifted )</h6>
                    </div>
                );
            })}
            {tracks.length === 0 && <div className="d-flex justify-content-center align-items-center text-light"><h1>No Workouts Yet</h1></div>}
        </div>
    );
};

export default CreateTracks;
