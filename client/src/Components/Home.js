import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { getPlacesData } from "../Api/api";
import useStyles from "./Style.js";
import Hotel from "./Hotel";
import axios from "axios";

import Hero from "./Hero";

function Home() {
  const [ville, setVille] = useState("Rabat");
  const [isloading, setisLoading] = useState(true);
  const changeCoordinates = (e) => {
    setisLoading(true);
    e.preventDefault();

    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=7d757b80d5caa5fc1a3d5899dc686190&query=` +
          ville
      )
      .then((res) => {
        setCordinates({
          lat: res.data.data[0].latitude,
          lng: res.data.data[0].longitude,
        });
      });
  };

  const [cordinates, setCordinates] = useState({});
  const [hotels, setHotels] = useState(null);

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    console.log(cordinates);
    getPlacesData(cordinates.lat, cordinates.lng).then((data) => {
      setHotels(data);
      console.log(data);
      setisLoading(false);
    });
  }, [cordinates]);
  const classes = useStyles();

  return (
    <div>
      <Hero />
      <div className="mt-5 mx-auto">
        <h2 style={{ textAlign: "center" }} className="text-info">
          <strong>Recommended Restaurants In Your City</strong>
        </h2>
      </div>
      {isloading == true ? (
        <div className="mx-auto">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <div className="row mt-5">
          {hotels &&
            hotels
              .filter((hotel) => hotel.photo != null)
              .filter((hotel) => Number(hotel.rating) >= 4)
              .map((hotel, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                  <Hotel hotel={hotel} key={i} />
                  <br></br>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default Home;
