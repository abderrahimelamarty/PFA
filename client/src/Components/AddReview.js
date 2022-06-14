import axios from "axios";
import React, { useState } from "react";

function AddReview() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [ranking, setRanking] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const addReview = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/hotels/addHotels",
        {
          title,
          rating,
          ranking,
          price,
          image,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setSuccess("share successsfly");
      })
      .catch((Error) => {
        console.log(Error.response.data);
      });
  };
  return (
    <div class="container px-5 my-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 rounded-3 shadow-lg">
            <div class="card-body p-4">
              <div class="text-center">
                {success && (
                  <div class="alert alert-success">
                    <strong>{success}</strong>
                  </div>
                )}
                <div class="h1 fw-light">Share review</div>
                <p class="mb-4 text-muted">
                  Partagez votre expérience en écrivant un avis.
                </p>
              </div>

              <form id="contactForm" onSubmit={addReview}>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="Title"
                    type="text"
                    placeholder="Name"
                    data-sb-validations="required"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label for="name">Title</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="rating"
                    type="number"
                    placeholder="Rating"
                    data-sb-validations="required,email"
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label for="rating">Rating</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="ranking"
                    type="text"
                    placeholder="Ranking"
                    data-sb-validations="required"
                    onChange={(e) => setRanking(e.target.value)}
                  />
                  <label for="ranking">Ranking</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="price"
                    type="text"
                    placeholder="price"
                    data-sb-validations="required"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label for="ranking">Price</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="image"
                    type="text"
                    placeholder="image"
                    data-sb-validations="required"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label for="ranking">Image</label>
                </div>

                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-lg "
                    id="submitButton"
                    type="submit"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
