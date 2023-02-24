import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IFolderDataTypes} from "../types/folderTypes";

function Root() {
  const [data, setData] = useState<IFolderDataTypes>();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/63f8217f9eba4545fab6f7d8`)
      .then((response) => {
        const data = response.data.data;
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="container">
      <div
        style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}
      >
        <Link to={`/folder/${data?.id}`}>
          <button>
            <FontAwesomeIcon icon={faFolder} size={"6x"} color={"#89CFF0"} />
          </button>
        </Link>
      </div>
      <h1 style={{textAlign: "center"}}>{data?.name}</h1>
    </div>
  );
}

export default Root;
