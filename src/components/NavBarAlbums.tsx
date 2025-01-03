import { useNavigate } from "react-router-dom";
import Props from "react";

type Props = {
  nname: string;
  nLink: string;
};
const NavbarAlbums = () => {
  const navigate = useNavigate();
  const buttons: Props[] = [
    { nname: "Ved", nLink: "/users" },
    { nname: "Jayachandra", nLink: "/users-list" },
  ];

  const buttonblock = buttons.map((b, nLink) => (
    <button key={nLink} className="btns-nav" onClick={() => navigate(b.nLink)}>
      {b.nname}
    </button>
  ));
  return (
    <>
      <div className="nav-bar">
        <div>
          <button className="back-btn" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
        <div className="nav-btn1">{buttonblock}</div>
      </div>
    </>
  );
};

export default NavbarAlbums;
