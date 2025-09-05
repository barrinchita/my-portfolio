import React from "react";


import SearchProject from "./SearchProject";
import Projects from "./Projects";

function Section1() {
  return (
    <>
      <section>
        {/* <SearchProject/> */}

        <Projects title="Web Development"/>

      </section>

      <section>
        
        <Projects  title="Mobile Development"/>
      </section>
    </>
  );
}

export default Section1;
