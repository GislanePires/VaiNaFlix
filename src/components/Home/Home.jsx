import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactModal from 'react-modal';
import "./HomeStyle.scss";

// Configurando o elemento root para acessibilidade
ReactModal.setAppElement('#root');

//api
const api = 'https://www.omdbapi.com/?'

//api key
const apiKey = 'apikey=cd95de62'

function Home(){
    const [name, setName] = useState("");
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null); // Inicializa com null para evitar erros
    const [selectedID, setSelectedID] = useState(null);

    //modal
    const [show, setShow] = useState(false);

    //config modal
    const showModal = () => {
        setShow(true)
    }
    const hideModal = () => {
        setShow(false)
        setMovieDetails(null); // Limpa os detalhes do filme ao fechar o modal
    }
    const handleClose = () => {
        hideModal()
    }

    //get response from API
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
    
    //get Details
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

    //submit the title entered
    const handleSubmit = (e) => {
        e.preventDefault();
        getInfo();
    };

    useEffect(() => {
        console.log("show:", show, "selectedID:", selectedID);
    }, [show, selectedID]);

    return (        
        <main>
          <h1>Vai na Flix</h1>
          <section>
            <form action="">
              <label htmlFor="name"></label>
              <input
                type="text"
                name="name"
                placeholder="Nome do filme"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Search
              </button>
            </form>
      
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
                    
                    {/* Modal com react-modal */}
                    <ReactModal
                      isOpen={show && selectedID === movie.imdbID}
                      onRequestClose={handleClose}
                      contentLabel="Detalhes do Filme"
                      className="modal-body"
                      overlayClassName="modal-overlay"
                    >
                      {movieDetails && ( // Verifica se movieDetails não é null
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
export default Home;
