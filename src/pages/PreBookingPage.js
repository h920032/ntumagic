import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, styled } from "@mui/material";
import { RoundedButton } from "../components/UI/GuideButtons";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
`;
const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
  align-items: center;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
`;

const PreBookingPage = () => {
  return (
    <Layout>
      <StyledBox>
        <Typography variant="h5">A. 我只要劃一個位子</Typography>
        <Link to="/booking">
          <RoundedButton>→直接去劃位!</RoundedButton>
        </Link>
        <Typography variant="h5">B. 我想劃多個位子</Typography>
        <Link to="/profile">
          <RoundedButton>→新增同行朋友</RoundedButton>
        </Link>
      </StyledBox>
    </Layout>
  );
};

export default PreBookingPage;
