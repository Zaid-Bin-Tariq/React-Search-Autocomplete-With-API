import React from "react";

const Suggestions = ({ data, handleClick }) => {
  return (
    <div>
      <ul>
        {data && data.length
          ? data.map((item, index) => (
              <li onClick={handleClick} key={index}>
                {item}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Suggestions;
