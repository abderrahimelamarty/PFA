import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Autocomplete } from "@react-google-maps/api";
import { getPlacesData } from "../Api/api";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./Style.js";
import Hotel from "./Hotel";
import axios from "axios";

function Restaurants() {
  const classes = useStyles();
  const [isloading, setisLoading] = useState(false);
  const [ville, setVille] = useState("Rabat");
  const changeCoordinates = (e) => {
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
  const [rating, setRating] = useState(0);

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
      setisLoading(true);
    });
  }, [cordinates]);

  return (
    <div>
      <form>
        <br></br>
        <br></br>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Where you want to go"
            onChange={(e) => setVille(e.target.value)}
          />
          <button class="input-group-text btn-info" onClick={changeCoordinates}>
            <i class="bi bi-search me-2"></i> Explore
          </button>
        </div>
      </form>
      <h1 style={{ textAlign: "center" }} className="text-info">
        <strong>All Restaurants is here</strong>{" "}
      </h1>

      <FormControl className={classes.formControl}>
        <InputLabel id="rating">Rating</InputLabel>
        <Select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>
      {isloading == false ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" className="mx-auto" />
        </div>
      ) : (
        <div className="row mt-5">
          {hotels &&
            hotels
              .filter((hotel) => hotel.photo != null)
              .filter((hotel) => Number(hotel.rating) >= rating)
              .map((hotel, i) => (
                <div key={i} className="col-4">
                  <Hotel hotel={hotel} key={i} />
                  <br></br>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default Restaurants;
