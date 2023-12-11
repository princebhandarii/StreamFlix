import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import NotAvailable from "../components/NotAvailable";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

export default function TVShows() {
    const [isScrolled,setIsScrolled]= useState(false);
    //const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const dispatch=useDispatch();
 
useEffect(()=>{
  dispatch(getGenres());
// eslint-disable-next-line
},[]);


useEffect(()=>{
  if(genresLoaded)
  {
    dispatch(fetchMovies({ genres, type: "tv" }));
    //dispatch(fetchMovies({type: "movies" }));
  }
  // eslint-disable-next-line
},[genresLoaded]);

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll=null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
   //if (currentUser) navigate("/");
  });

  return (

      
    <Container>
    <div className="navbar">
      <Navbar setIsScrolled={isScrolled} />
    </div>

    <div className="data">
      <SelectGenre genres={genres} type="tv" />
        
      {movies && movies.length > 0 ? (
        <Slider movies={movies} />
      ) : (
        <NotAvailable />
      )}
    </div>
  </Container>
  );
}

const Container=styled.div`
.data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;