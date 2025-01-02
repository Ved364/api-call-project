import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBarAlbums";
import "../styles/AlbumsPage.css";
import { useNavigate, useLocation } from "react-router-dom";
type Albumtype = {
  userId: number;
  id: number;
  title: string;
};

const AlbumsPage = () => {
  const [data, setData] = useState<Albumtype[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = Number(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const recordsPerPage = 10;
  const npage = Math.ceil(100 / recordsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/albums?_start=${
          (currentPage - 1) * recordsPerPage
        }&_limit=${recordsPerPage}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const prePage = () => {
    if (currentPage !== 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };

  const handleNavId = (id: number) => {
    navigate(`/album/${id}`);
  };

  const tablebody = data.map((album: Albumtype) => (
    <tr key={album.id} onClick={() => handleNavId(album.id)}>
      <td>{album.userId}</td>
      <td>{album.id}</td>
      <td>{album.title}</td>
    </tr>
  ));

  return (
    <>
      <Navbar />

      <div>
        <h3 className="albums-h3">Details of Users</h3>
        <table className="albums-table">
          <thead>
            <tr>
              <th>USERID</th>
              <th>ID</th>
              <th>TITLE</th>
            </tr>
          </thead>
          <tbody>{tablebody}</tbody>
        </table>

        <div className="btns-div">
          <ul className="pagination-list">
            <li className="btn-list">
              <button
                className="prev-nxt-btn"
                onClick={prePage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>

            <li className="btn-list">
              <button
                className="prev-nxt-btn"
                onClick={nextPage}
                disabled={currentPage === npage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AlbumsPage;
