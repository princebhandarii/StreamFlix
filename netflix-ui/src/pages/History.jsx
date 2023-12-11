import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getwatchedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Card from "../components/Card";


export default function History() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });
//  const uid = localStorage.getItem('uid')

const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getwatchedMovies(email));
    }
    // eslint-disable-next-line
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };



  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My History</h1>
        <div className="grid flex">

          {/* {movies?.length > 0 ? (
            movies.map((movie, index) => (
              <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
            ))
          ) : (
            <h1>No movies. You can add some!</h1>
          )} */}

          
          {movies?.length > 0 ? (
                movies.map((movie) => (
                  <Card movieData={movie} key={movie.id} isWatched={true} />
                ))
              ) : (
                <h1>No History</h1>
              )}



        </div>
      </div>
    </Container>
  );
  
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

