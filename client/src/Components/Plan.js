import React, { useState, useEffect } from "react";
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
import Delete from "@material-ui/icons/Delete";

import Rating from "@material-ui/lab/Rating";
import useStyles from "./Style.js";
import { useNavigate } from "react-router-dom";
import Remove from "@material-ui/icons/Remove";
function Plan({ plan, setPlans }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [rating, setRating] = useState(plan.rating);
  const [image, setImage] = useState(plan.image);
  const [num_reviews, setNum_reviews] = useState(plan.num_reviews);
  const [name, setName] = useState(plan.name);
  const [adress, setAdress] = useState(plan.address);
  const [idplan, setidplan] = useState(plan._id);

  const [web_url, setWeb_url] = useState(plan.web_url);
  const [website, setWebsite] = useState(
    plan.website || "https://www.friendsandfamilyla.com/"
  );

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
  }, []);

  const removePlan = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const id = user._id;
    if (!user) {
      navigate("/login");
    } else {
      axios
        .delete(
          `http://localhost:5000/api/Plans/removefromplans/${idplan}`,
          config
        )
        .then((response) => {
          console.log(response);
          setPlans((plans) => plans.filter((plan) => plan._id !== idplan));
        })
        .catch((Error) => {
          console.log(Error.response.data);
        });
    }
  };

  const classes = useStyles();
  const prin = () => {
    console.log("ello");
  };
  return (
    <div>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={plan.image}
          title={plan.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {plan.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(plan.rating)} readOnly />
            <Typography component="legend">
              {plan.num_reviews} review{plan.num_reviews > 1 && "s"}
            </Typography>
            <br></br>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOnIcon />
              {plan.adress}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(plan.web_url, "_blank")}
          >
            details
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(plan.website, "_blank")}
          >
            Website
          </Button>
          <Button size="small" color="primary"></Button>
          <Button size="small" color="primary"></Button>

          <Button size="small" color="primary" onClick={removePlan}>
            remove
            <Delete />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Plan;
