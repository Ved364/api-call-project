



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/userList.css';

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page') || '1');

  const [userData, setUserData] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const usersPerPage = 2;

  useEffect(() => {
    const fetchUserData = async (page: number) => {
      setLoading(true);
      setIsError({ status: false, msg: "" });
      try {
        const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${usersPerPage}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError({ status: true, msg: (error as Error).message || "Something went wrong!" });
      }
    };

    if (!id) {
      fetchUserData(currentPage);
    }
  }, [id, currentPage]);

  useEffect(() => {
    const fetchUserDetail = async (userId: string) => {
      setLoading(true);
      setIsError({ status: false, msg: "" });
      try {
        const response = await fetch(`${BASE_URL}/${userId}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUserDetail(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError({ status: true, msg: (error as Error).message || "Something went wrong!" });
      }
    };

    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`/userslist?page=${pageNumber}`);
  };

  const handleBackClick = () => navigate(-1);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError.status) {
    return (
      <div className="container">
        <h1>{isError.msg}</h1>
      </div>
    );
  }

  if (id && userDetail) {
    return (
      <div className="container">
        <button className="btn-back" onClick={handleBackClick}>Back</button>
        <h1>User Details</h1>
        <table style={{ border: "2px solid black", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userDetail.id}</td>
              <td>{userDetail.name}</td>
              <td>{userDetail.username}</td>
              <td>{userDetail.email}</td>
              <td>{`${userDetail.address.street}, ${userDetail.address.suite}, ${userDetail.address.city}, ${userDetail.address.zipcode}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container">
         <button className="btn-back" onClick={handleBackClick}>Back</button>
      <h1 className="header"><u>Users</u></h1>
      <table style={{ border: "2px solid black", borderCollapse: "collapse" }} >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((eachUser) => {
            const {id,name,username,email,address} = eachUser;
            return (
              <tr key={id} 
              onClick={() => navigate(`/userslist/${id}`)} 
                    style={{ cursor: 'pointer', textDecoration: 'none' }}  >
                <td>{id}</td>                
                <td>{name}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table  >
      <div className="pagination">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index + 1}
            className="btn-pagination"
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;

