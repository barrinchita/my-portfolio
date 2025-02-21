import React from "react";
import { BiSolidChevronDownCircle } from "react-icons/bi";
import styles from "../css/main.module.css";

function SearchProject() {
  return (
    <>
      <div className={styles.searchDiv}>
        <div className={styles.setSearchBg}>
          <div className={styles.selectDiv}>
            <select name="" id="">
              <option value="">All projects</option>
              <option value="">All projects</option>
              <option value="">All projects</option>
            </select>
          </div>
          <button>View all</button>
        </div>
      </div>
    </>
  );
}

export default SearchProject;
