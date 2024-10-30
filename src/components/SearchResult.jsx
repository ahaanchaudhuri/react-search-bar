import React from 'react';
import "./SearchResult.css";

const SearchResult = ({ result }) => {
  return (
    <div 
      className='search-result' 
      onClick={(e) => alert(`You clicked on ${result["course-name"]}`)}
    >
      <h3 className='course-name'>{result["course-name"]}</h3>
      <p className='instructor-name'>Instructor: {result["instructor-name"]}</p>
      <p className='course-description'>{result["course-description"]}</p>
    </div>
  );
}

export default SearchResult;
