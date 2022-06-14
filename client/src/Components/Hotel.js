import React, { useState, useEffect } from "react";
import Favorite from "@material-ui/icons/Favorite";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./Style.js";
import { useNavigate } from "react-router-dom";
function Hotel({ hotel }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [success, setSuccess] = useState();
  const [rating, setRating] = useState(hotel.rating);
  const [write_review, setWrite_Review] = useState(hotel.write_review);
  const [image, setImage] = useState(hotel.photo.images.large.url);
  const [num_reviews, setNum_reviews] = useState(hotel.num_reviews);
  const [name, setName] = useState(hotel.name);
  const [adress, setAdress] = useState(hotel.address);
  const [web_url, setWeb_url] = useState(hotel.web_url);
  const [website, setWebsite] = useState(
    hotel.website || "https://www.friendsandfamilyla.com/"
  );

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
  }, []);

  const savePlan = () => {
    if (!user) {
      navigate("/login");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const id = user._id;
      axios
        .post(
          "http://localhost:5000/api/Plans/savePlan",
          {
            id,
            write_review,
            name,
            num_reviews,
            adress,
            web_url,
            website,
            image,
            rating,
          },
          config
        )
        .then((response) => {
          console.log(response);
          navigate("/saves");
        })
        .catch((Error) => {
          console.log(Error.response.data);
        });
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Card elevation={15} height={500}>
        <CardMedia
          style={{ height: 300 }}
          image={
            hotel.photo
              ? hotel.photo.images.large.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
          title={hotel.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {hotel.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(hotel.rating)} readOnly />
            <Typography component="legend">
              {hotel.num_reviews} review{hotel.num_reviews > 1 && "s"}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {hotel.price_level ? hotel.price_level : "$"}
            </Typography>
          </Box>

          {hotel.address && (
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOnIcon />

              {hotel.address}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(hotel.web_url, "_blank")}
          >
            details
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={() => window.open(hotel.website, "_blank")}
          >
            Website
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(hotel.write_review, "_blank")}
          >
            Write_review
          </Button>
          <Button size="small" severity="info"></Button>
          <Button size="small" color="primary" onClick={savePlan}>
            <Favorite />
            save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Hotel;
