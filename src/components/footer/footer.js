import React from "react";
import modules from "./footer.module.css";
function footer() {
  return (
    <div className={modules.footer}>
      <p className={modules.footer__paragraph}>
        Made with <a href="#"> react.js</a> . <a href="#"> gh-polyglot</a>
      </p>
    </div>
  );
}

export default footer;
