import React, { useEffect, useState } from "react";
import axios from "axios";
import Plan from "./Plan";
function Saves() {
  const [plans, setPlans] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(`http://localhost:5000/api/Plans/getPlans`, config)
      .then((res) => {
        setPlans(res.data.Plans);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);
  console.log(plans);

  return (
    <div>
      <h1 className="title text-info" style={{ textAlign: "center" }}>
        <strong> All your saves is here</strong>
      </h1>
      <br></br>
      <div className="row">
        {plans &&
          plans.map((plan, i) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={i}>
              <Plan plan={plan} setPlans={setPlans} />
              <br></br>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Saves;
