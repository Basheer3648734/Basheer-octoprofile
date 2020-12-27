import React from "react";
import { GoRepo, GoRepoForked, GoStar } from "react-icons/go";
import modules from "./repo_card.module.css";
function repo_card({ name, description, fork, star, size, url }) {
  return (
    <div className={modules.repo_card}>
      <a href={url} target="blank">
        <h2 className={modules.repo_card__header}>
          <GoRepo />
          {name}
        </h2>
        <p className={modules.repo_card__description}>{description}</p>
        <div className={modules.repo_card__stats}>
          <p>
            <GoRepoForked /> {fork}
          </p>
          <p>
            <GoStar /> {star}
          </p>
          <p>{size}KB</p>
        </div>
      </a>
    </div>
  );
}

export default repo_card;
