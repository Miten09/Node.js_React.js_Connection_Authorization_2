import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

function Welcome() {
  const [user, setuser] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    // console.log(res);
    return data;
  };

  useEffect(() => {
    async function fetchData() {
      const alldata = await sendRequest();
      setuser(alldata.user);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>{user && <h1>{user.name}</h1>}</div>;
    </>
  );
}

export default Welcome;
