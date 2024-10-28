import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';
// import "./ResultsStyle.scss";

const api = 'https://www.omdbapi.com/?'
const apiKey = 'apikey=cd95de62'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Results() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [show, setShow] = useState(false);
  const query = useQuery();
  const name = query.get('name');

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
    setMovieDetails(null);
  }

  const handleClose = () => {
    hideModal()
  }

  const getInfo = () => {
    axios
      .get(api + apiKey + `&s=${name}` + "&type=movie" + "&page=1")
      .then((res) => {
        if (res.data.Search) {
          setMovies(res.data.Search);
          console.log(res.data.Search);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };

  const getDetails = (e, id) => {
    e.preventDefault();
    axios.get(api + apiKey + `&i=${id}`).then((res) => {
      if (res.data) {
        setMovieDetails(res.data);
        setSelectedID(id);
        showModal();
      }
    }).catch((error) => {
      console.error("Erro ao buscar detalhes do filme:", error);
    });
  };

  useEffect(() => {
    getInfo();
  }, [name]);

  return (
    <main>
      <h1>Resultados da busca: {name}</h1>
      <section>
        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map(movie => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <div>
                  <p>{movie.Title}</p>
                </div>
                <button
                  className="details-btn"
                  onClick={e => getDetails(e, movie.imdbID)}>Details</button>
                <ReactModal
                  isOpen={show && selectedID === movie.imdbID}
                  onRequestClose={handleClose}
                  contentLabel="Detalhes do Filme"
                  className="modal-body"
                  overlayClassName="modal-overlay"
                >
                  {movieDetails && (
                    <div className="modal-content">
                      <div className="modal-img">
                        <img src={movieDetails.Poster} alt="Poster" />
                      </div>
                      <div className="modal-info">
                        <p><b>Elenco:</b> {movieDetails.Actors}</p>
                        <p><b>Gênero:</b> {movieDetails.Genre}</p>
                        <p><b>Diretor:</b> {movieDetails.Director}</p>
                        <p><b>Lançamento:</b> {movieDetails.Released}</p>
                        <p><b>Trama:</b> {movieDetails.Plot}</p>
                      </div>
                      <button
                        className="modal-closebtn"
                        onClick={handleClose}>
                        Fechar
                      </button>
                    </div>
                  )}
                </ReactModal>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default Results;

