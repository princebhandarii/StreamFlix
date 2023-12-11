import React from 'react'
import CardSlider from './CardSlider';

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    // Check if movies is defined and not empty before slicing
    if (movies && movies.length > 0) {
      return movies.slice(from, to);
    } else {
      return []; // Return an empty array if movies is undefined or empty
    }
  };

  return (
    <div>
      <CardSlider title="Treanding Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider title="BlockBuster Movies" data={getMoviesFromRange(20, 30)} />
      <CardSlider title="Popular on Netflix" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}

