import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type albumtype = { userId: number; id: number; title: string };
const AlbumIdPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<albumtype | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const user = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    if (!user) {
      navigate("/login");
    }
  }, [id, user, navigate]);

  if (!album) {
    return <div>Album Not Found ..!</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        <button
          className="back-to-albums"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
      <table className="album-id-table">
        <thead>
          <tr>
            <th>USERID</th>
            <th>ID</th>
            <th>TITLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{album.userId}</td>
            <td>{album.id}</td>
            <td>{album.title}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AlbumIdPage;
