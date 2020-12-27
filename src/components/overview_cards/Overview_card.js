import React from "react";
import modules from "./overview_card.module.css";
function Overview_card({ main, label }) {
  return (
    <div className={modules.overview_card}>
      <h2 className={modules.overview_card__main}>{main}</h2>
      <p className={modules.overview_card__label}>{label}</p>
    </div>
  );
}

export default Overview_card;
