import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import UserAuth from "./../../auth/UserAuth";

const BlogDetail = (props) => {
  const [blog, setBlog] = useState();

  const fetchData = async () => {
    const res = await Axios.get(
      "http://localhost:5000/blog/get/" + props.match.params.id
    );
    console.log(res.data);
    setBlog(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <UserAuth>
      <>
        <Navbar />
        <MDBContainer>
          <br />
          <p className="h1 text-center">{blog?.title}</p>
          <br />
          <MDBRow>
            <MDBCol md="12" className="mb-3">
              <img src={blog?.imageURL} className="img-fluid z-depth-1" />
            </MDBCol>
          </MDBRow>
          <br />
          <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
        </MDBContainer>
      </>
    </UserAuth>
  );
};

export default BlogDetail;
