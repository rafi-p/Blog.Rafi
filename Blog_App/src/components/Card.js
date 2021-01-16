import React from "react";
import { useHistory } from "react-router-dom";

function Card(props) {
  const history = useHistory();

  function toDetail(e, id) {
    e.preventDefault();
    history.push(`/post/${id}`);
  }
  const { post } = props;
  return (
    <div className="card">
      <div className="readTime">{post.id} Mins Read</div>
      <div className="blogSummary">
        <h3>{post.title}</h3>
        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
      </div>
      <a href="" onClick={(e) => toDetail(e, post.id)}>
        Read More
      </a>
    </div>
  );
}

export default Card;
