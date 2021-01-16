import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, InlineIcon } from "@iconify/react";
import linkedinIcon from "@iconify/icons-logos/linkedin-icon";

function Navbar() {
  const history = useHistory();
  function toHome(e, id) {
    e.preventDefault();
    history.push(`/`);
  }

  return (
    <header>
      <div onClick={(e) => toHome(e)} className="logo">
        Blog.Rafi
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://id.linkedin.com/in/rafi-panji"
        className="btn-contact"
      >
        <p>Contact Me</p>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://id.linkedin.com/in/rafi-panji"
        className="btn-linkedin"
      >
        <Icon icon={linkedinIcon} />
      </a>
    </header>
  );
}

export default Navbar;
