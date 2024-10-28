import React from "react";
import "./ModalMovies.scss";

export default function ModalMovies({movieInfo, handleClose}){
    return(
        <div className="modal-display-block">
            <section className="modal-container">
                <div className="modal-body">
                    <div className="modal-img">
                        <img src={movieInfo.Poster} alt="Poster" />
                    </div>
                </div>
                <div className="modal-info">
                    <p>
                        <b>Actors: </b> {movieInfo.Actors}
                    </p>
                    <p>
                        <b>Genre: </b> {movieInfo.Genre}
                    </p>
                    <p>
                        <b>Director: </b> {movieInfo.Director}
                    </p>
                    <p>
                        <b>Released: </b> {movieInfo.Released}
                    </p>
                    <p>
                        <b>Plot: </b> {movieInfo.Plot}
                    </p>
                </div>
                <button 
                className="modal-closebtn"
                onClick={handleClose}>
                    Fechar
                </button>
            </section>
        </div>
    );
};