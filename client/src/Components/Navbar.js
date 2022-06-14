import React, { useEffect } from "react";
import styled from "styled-components";
import Home from "@material-ui/icons/Home";
import Restaurant from "@material-ui/icons/Restaurant";
import Favorite from "@material-ui/icons/Favorite";
import logo from "./logop.jpeg";

import { NavDropdown, Dropdown, DropdownButton, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { Axios } from "axios";
export default function Navbar({ user, setUser }) {
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
  }, []);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Nav className="mt-3">
        <div className="brand">
          <div
            className="container"
            style={{ color: "#48cae4", fontSize: "1.5rem" }}
          >
            <img
              width="50px"
              height="50px"
              src={logo}
              alt=""
              className="rounded-circle"
            />
            Bon Plans
          </div>
          <div className="toggle"></div>
        </div>
        {user ? (
          <ul>
            <li>
              <Link to="/">
                {" "}
                <Home />
                Home
              </Link>
            </li>

            <li>
              <Link to="/restaurants">
                {" "}
                <Restaurant /> restaurants
              </Link>
            </li>
            <li>
              <Link to="/saves">
                {" "}
                <Favorite /> wishlist
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/">
                {" "}
                <Home />
                Home
              </a>
            </li>

            <li>
              <Link to="/restaurants">
                {" "}
                <Restaurant />
                restaurants
              </Link>
            </li>
            <li></li>
          </ul>
        )}
        {user ? (
          <>
            <DropdownButton id="dropdown-basic-button" title={user.name}>
              <Dropdown.Item href="/profile">View profile</Dropdown.Item>
              <Dropdown.Item href="/" onClick={logout}>
                Log out
              </Dropdown.Item>
            </DropdownButton>
          </>
        ) : (
          <Link to="/login">
            <button>Connect</button>
          </Link>
        )}
      </Nav>
    </>
  );
}

const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
.brand{
    .container{
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.4rem;
        font-size: 1.2rem;
        font-weight:900;
        text-transform: uppercase;
    }
    .toggle{
        display: none;
    }
}
ul {
    display: flex;
    list-style-type: none;
    gap: 1rem;
    li{
        a{
            text-decoration: none;
            color: #0077b6;
            font-size: 1.2rem;
            transition: 0ms.1s ease-in-out;
            &:hover {
                color: #023e8a;
            }
        }
       
        
    }
}
button{
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing; 0.1rem;
    transition: 0.3s ease-in-out ;
    &:hover {
        background-color: #023e8a;

    }
}
`;
const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: 30vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
`;
