import React from "react";
import { useState, useEffect } from "react";

import { MDBBtn } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer } from "mdbreact";
import axios from "axios";
import DoctorAuth from "../../auth/DoctorAuth";
import SideNav from "../SideNav/SideNav";
import { useHistory } from "react-router-dom";

export default function GetBlog() {
  const [blog, setBlog] = useState();
  const history = useHistory();

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:5000/blog/delete/" + id,{
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        if (res) {
          window.location.reload();
        }
      });
  };

  const editBlog = async (id) => {
    history.push("/doctor/editBlog/" + id);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/blog/get",{
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      setBlog(response.data);
    }
    fetchData();
  }, []);

  return (
    <DoctorAuth>
      <>
        <SideNav />
        <MDBContainer>
          {blog?.length === 0 ? (
            <>
              <br />
              <p className="h1 text-center">No Blog added yet</p>
            </>
          ) : (
            <div>
              <br />
              <p className=" h1 text-center">Blog List </p>
              <br />
              <MDBTable bordered striped small>
                <MDBTableHead color="black" textWhite>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Action</th>
                  </tr>
                </MDBTableHead>
                {blog?.map((data, i) => (
                  <MDBTableBody key={i}>
                    <tr>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{data.title}</td>

                      <td className="text-center">
                        <MDBBtn
                          color="warning"
                          size="sm"
                          onClick={() => editBlog(data._id)}
                        >
                          Edit
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete
                        </MDBBtn>
                      </td>
                    </tr>
                  </MDBTableBody>
                ))}
              </MDBTable>
            </div>
          )}
        </MDBContainer>
      </>
    </DoctorAuth>
  );
}
