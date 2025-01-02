import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Name = {
  navName: string;
  navLink: string;
};
const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const StoredData = localStorage.getItem("email");
    if (StoredData) {
      setEmail(StoredData);
    }
  }, []);

  const names: Name[] = [
    { navName: "Ved", navLink: "/users" },
    { navName: "Dhanusree", navLink: "/albums" },
    { navName: "Jaya Chandra", navLink: "/Usertask1" },
  ];
  return (
    <div className="HomeBackground">
      <h3 className="text-white text-center">{email}</h3>
      <div className="d-flex justify-content-end align-items-center gap-3 p-3">
        {names.map((itemName, i) => (
          <button
            key={i}
            type="button"
            onClick={() => navigate(itemName.navLink)}
            className="btn btn-primary"
          >
            {itemName.navName}
          </button>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Log out
        </button>
      </div>
      <div className="homeBackground">
        <h1 className="HomeHeading">
          Our First Group <br />
          Project
        </h1>
      </div>
    </div>
  );
};

export default Home;
