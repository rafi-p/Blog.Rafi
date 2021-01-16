import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import reactIcon from "@iconify/icons-logos/react";
import graphqlIcon from "@iconify/icons-logos/graphql";

function Footer() {
  return (
    <div className="footer">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rafi-p/Blog.Rafi/tree/master/Blog_App"
      >
        Github
      </a>
      <ul className="techStack">
        <li>
          <Icon icon={reactIcon} />
        </li>
        <li>
          <Icon icon={graphqlIcon} />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
