import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

type UserDetails = {
  id: number;
  username: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
};

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleUserpage = () => {
    navigate("/users");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div className="userBackground UserBackgroundImg">
        <div className="buttonStyle">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUserpage}
          >
            Back
          </button>
        </div>
        <div className="background_table mt-3 d-flex flex-column justify-content-center align-items-center">
          <h3 className="text-center text-white">User Id: {user.id}</h3>
          <table className="content_table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{user.id}</td>
              </tr>
              <tr>
                <th>User name</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>
                  {user.address.street}, {user.address.suite}
                  {user.address.city}, {user.address.zipcode}
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>Website</th>
                <td>{user.website}</td>
              </tr>
              <tr>
                <th>Company</th>
                <td>
                  {user.company.name}, {user.company.catchPhrase},
                  {user.company.bs}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
