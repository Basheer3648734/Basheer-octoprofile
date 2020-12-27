import React from "react";
import modules from "./profile_card.module.css";
function profile_cards({ count, label }) {
  return (
    <div className={modules.profile_card}>
      <p className={modules.profile_card__count}>{count}</p>
      <h5 className={modules.profile_card__label}>{label}</h5>
    </div>
  );
}

export default profile_cards;
