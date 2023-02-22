import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Link} from "react-router-dom";

type Props = {};

function Home({}: Props) {
  let a = [4, 5, 6, 7, 8, 4, 5, 7, 8, 9, 4, 4, 4, 4, 6, 7, 8, 9, 0, 5, 3, 2, 4];
  return (
    <div className="container">
      <header style={{display: "flex", justifyContent: "center"}}>
        <h1>Welcome to Folder Manager</h1>
      </header>
      <div
        style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}
      >
        {a.map((item) => (
          <div style={{width: "300px", margin: "20px"}}>
            <Link to={""}>
              <button>
                <FontAwesomeIcon
                  icon={faFolder}
                  size={"6x"}
                  color={"#89CFF0"}
                />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
