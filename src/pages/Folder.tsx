import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IFolderCreateDataType, IFolderDataTypes} from "../types/folderTypes";
import axios from "axios";

function Folder() {
  const [data, setData] = useState<IFolderDataTypes>();
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const [root, setRoot] = useState<boolean>(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setSubmit(false);
    setShowModal(true);
    setRoot(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.112:4000/api/folder/${id}`)
      .then((response) => {
        const data = response.data.data;
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, submit]);

  const onDelete = async () => {
    if (data?.parent) {
      await axios.delete(`http://192.168.0.112:4000/api/folder/${id}`);
      navigate(-1);
    } else {
      setRoot(true);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();

    const body: IFolderCreateDataType = {
      name: name as string,
      parent: id as string,
    };
    console.log(body);

    try {
      await axios({
        method: "post",
        url: `http://192.168.0.112:4000/api/folder`,
        data: body,
      });
      closeModal();
      setSubmit(true);
    } catch {}
  };

  console.log(data);
  return (
    <>
      <h1 style={{textAlign: "center"}}>Folder : {data?.name}</h1>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button
          onClick={openModal}
          style={{
            backgroundColor: "#0096FF",
            border: "none",
            color: "white",
            padding: "10px 32px",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
          }}
        >
          Create New Folder
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          style={{
            backgroundColor: "#0096FF",
            border: "none",
            color: "white",
            padding: "10px 32px",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
        <button
          onClick={() => onDelete()}
          style={{
            backgroundColor: "#C70039",
            border: "none",
            color: "white",
            padding: "10px 32px",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
          }}
        >
          Delete Folder
        </button>

        {showModal && (
          <div>
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: "9998",
              }}
              onClick={closeModal}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                zIndex: "9999",
              }}
            >
              <h2>Add New Folder</h2>
              <form onSubmit={onSubmit}>
                <label>Name: </label>
                <input
                  style={{
                    padding: "10px 32px",
                    marginRight: "1rem",
                    marginLeft: "1rem",
                  }}
                  type={"text"}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  style={{
                    backgroundColor: "#0096FF",
                    border: "none",
                    color: "white",
                    padding: "10px 32px",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {root && (
        <p style={{textAlign: "center"}}>Cannot delete the root folder!!</p>
      )}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data &&
            data.children.map((item) => {
              console.log(item);

              return (
                <div>
                  <Link to={`/folder/${item.id}`}>
                    <button
                      style={{margin: "1rem"}}
                      onClick={() => setRoot(false)}
                    >
                      <FontAwesomeIcon
                        icon={faFolder}
                        size={"6x"}
                        color={"#89CFF0"}
                      />
                    </button>
                  </Link>

                  <h1 style={{textAlign: "center"}}>{item.name}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Folder;
