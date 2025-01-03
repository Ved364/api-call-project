import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
};

type Name = {
  navName: string;
  navLink: string;
};

const UsersPage = () => {
  const names: Name[] = [
    { navName: "Dhanusree", navLink: "/albums" },
    { navName: "Jaya Chandra", navLink: "/userslist" },
  ];

  const [data, setData] = useState<User[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = Number(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 5;
  const user = localStorage.getItem("email");
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleIndividualUser = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleUserpage = () => {
    navigate("/");
  };

  const totalPages = Math.ceil(10 / rowsPerPage);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage * currentPage}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
    if (!user) {
      navigate("/login");
    }
  }, [currentPage, navigate, user]);
  return (
    <div className="userBackground UserBackgroundImg">
      <div className="UsersButton">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUserpage}
        >
          Back
        </button>
        <div>
          {names.map((itemName, i) => (
            <button
              key={i}
              type="button"
              onClick={() => navigate(itemName.navLink)}
              className="btn btn-primary mx-2"
            >
              {itemName.navName}
            </button>
          ))}
        </div>
      </div>
      <div className="background_table mt-3 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center text-white">Users</h3>
        <table className="content_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User name</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index} onClick={() => handleIndividualUser(user.id)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UsersPage;
