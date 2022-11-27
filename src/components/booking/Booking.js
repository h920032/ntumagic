import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";

import Auditorium from "./Auditorium";
import Price from "./Price";
import BuyerInfo from "./BuyerInfo";
import SeatService from "../../services/seat.service";
import { bookTickets, clearAPI } from "../../store/user-actions";

const BookingLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0rem;
  font-family: "Roboto", sans-serif;

  @media (max-width: 767px) {
    width: 700px;
  }
`;

const LightBoard = styled("div")`
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-style: solid;
  padding: 0.5rem 2rem;
`;
const Stage = styled("div")`
  border-style: solid;
  padding: 0.5rem 40%;
`;

const colorMap = {
  A: "rgb(207, 1, 248)",
  B: "rgb(255, 210, 64)",
  C: "rgb(84, 125, 238)",
};

const PriceSign = styled("div")`
  width: 30px;
  height: 15px;
  background-color: ${(props) => colorMap[props.area]};
  display: inline-block;
  margin: 0 0.5rem;
`;

const PriceSigns = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <PriceSign area="A" /> A區 500元
      <PriceSign area="B" /> B區 400元
      <PriceSign area="C" /> C區 300元
    </div>
  );
};

const BookingInfo = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled(Button)`
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;

const Booking = () => {
  const bookingApi = useSelector((state) => state.user.bookingApi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [finalChosen, setFinalChosen] = useState(null);

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getAllSeats();
      setSeatsData([...res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadSeatsData();
  }, []);

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = () => {
    setFinalChosen(chosenSeats);
  };

  useEffect(() => {
    if (bookingApi.success) {
      window.alert("劃位成功!");
      dispatch(clearAPI("bookingApi"));
      navigate("/pay");
    }
    if (bookingApi.fail) {
      window.alert(bookingApi.errorMsg);
      setChosenSeats([]);
      setFinalChosen(null);
      loadSeatsData();
    }
  }, [dispatch, navigate, bookingApi]);

  useEffect(() => {
    if (finalChosen) {
      dispatch(bookTickets(finalChosen));
    }
  }, [dispatch, finalChosen]);

  return (
    <BookingLayout>
      {bookingApi.loading && "isLoading"}
      {/* <Alert severity="warning">
        劃位功能將於 15:00 關閉 <br />
        使用線上劃位請於 17:00 前進行匯款 <br />
        今日 17:00 後將開放現場購票
      </Alert> */}
      <h1>座位區</h1>
      <PriceSigns />

      <LightBoard>燈音控制台</LightBoard>
      <div>
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      </div>
      <Stage>舞台</Stage>
      <BookingInfo>
        <BuyerInfo />
        <Price chosenSeats={chosenSeats} />
        {chosenSeats.length ? (
          <Button variant="outlined" onClick={clearChosenHandler}>
            清除
          </Button>
        ) : null}
      </BookingInfo>
      {chosenSeats.length ? (
        <ConfirmButton
          variant="contained"
          size="large"
          color="error"
          onClick={submitHandler}
        >
          確定購票
        </ConfirmButton>
      ) : (
        <p>請選擇至少一個位子</p>
      )}
    </BookingLayout>
  );
};

export { BookingLayout, PriceSigns, LightBoard, Stage };

export default Booking;
