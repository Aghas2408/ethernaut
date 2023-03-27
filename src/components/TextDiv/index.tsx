import React from 'react';
import './TextDiv.css';

function TextDiv(props: any) {
  return (
    <div className="text-div">
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

export default TextDiv;