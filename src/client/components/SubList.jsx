import React from "react";
import { Link } from "react-router-dom";

const SubList = ({subItems}) => {
  return (
    <ul className={`sublist`}>
      {subItems.length > 0 && subItems.map((subItem, index) => (
        <li key={index}>
            <Link to={`/category/${subItem.link}`}>{subItem.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubList;
