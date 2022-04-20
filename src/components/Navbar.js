import {  useState } from "react";
import { styled } from "../styles/stitches.config";
import Modal from "./Modal";

import Sidebar from "./Sidebar";

const NavContainer = styled("nav", {
  backgroundColor: "$gray2",
  position: "sticky",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  borderBottom: '1px solid $gray10', 
  height: "50px",
});

const NavItem = styled("a", {
  backgroundColor: "$black10",
  color: "$blue11",
  borderColor: "$blue7",
  marginRight: "25px",
  "&:hover": {
    backgroundColor: "$blue5",
    borderColor: "$blue8",
  },
});

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [addPerson, setAddPerson] = useState(false);

  const [addHospital, setAddHospital] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />

      <NavContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100px",
          }}
        >
          <NavItem>HCSM</NavItem>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Modal
            open={addPerson}
            setOpen={setAddPerson}
            type="person"
            label="add Person"
          />

          <Modal
            open={addHospital}
            setOpen={setAddHospital}
            type="hospital"
            label="add Hospital"
          />
        </div>
      </NavContainer>
    </>
  );
};

export default Navbar;
