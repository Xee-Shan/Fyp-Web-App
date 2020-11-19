import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import GetBlogs from "./GetBlogs";
import Pagination from "../Pagination/BlogsPagination";
import { MDBContainer } from "mdbreact";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerpage] = useState(3);

  const indexOfLastBlog = currentPage * blogsPerpage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerpage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    const response = await Axios.get("http://localhost:5000/blog/get");
    console.log(response.data);
    setBlog(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <p className="h1 text-center">All Blogs</p>
      <br />
      <GetBlogs blog={currentBlogs} />
      <br />
      <MDBContainer>
        <Pagination
          blogsPerPage={blogsPerpage}
          totalBlogs={blog.length}
          paginate={paginate}
        />
      </MDBContainer>
    </>
  );
};

export default Blog;
