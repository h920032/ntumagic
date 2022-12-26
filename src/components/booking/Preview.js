import React, { useState, useEffect } from "react";
import SeatService from "../../services/seat.service";
import { useNavigate } from "react-router-dom";
import { BookingLayout } from "./Booking";
import SquareButton from "../UI/SquareButton";
import PriceSigns from "./PriceSigns";
import Auditorium from "./Auditorium";

const Preview = () => {
  const [seatsData, setSeatsData] = useState(null);

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getPreviewSeats();
      setSeatsData([...res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadSeatsData();
  }, []);

  const navigate = useNavigate();
  const goToGuide = () => {
    navigate("/guide");
  };

  return (
    <BookingLayout>
      <h1>預覽座位區</h1>
      <PriceSigns />
      {seatsData && <Auditorium seatsData={seatsData} chosenSeats={[]} />}
      <br />
      <SquareButton color="blue" onClick={goToGuide}>
        前往劃位
      </SquareButton>
    </BookingLayout>
  );
};

export default Preview;
