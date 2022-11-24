import React, { useState, useEffect } from "react";
import SeatService from "../../services/seat.service";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import { BookingLayout, PriceSigns, LightBoard, Stage } from "./Booking";
import { AuditoriumLayout } from "./Auditorium";
import Seat from "./Seat";
import SquareButton from "../UI/SquareButton";

const Preview = ({}) => {
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

  const cols = [...Array(24).keys()];
  return (
    <BookingLayout>
      <h1>預覽座位區</h1>
      <PriceSigns />
      <LightBoard>燈音控制台</LightBoard>
      <div>
        <AuditoriumLayout>
          {seatsData && (
            <Grid container>
              {cols.map((c) => {
                return (
                  <Grid item xs={12} key={uuidv4()}>
                    {seatsData.slice(34 * c, 34 * c + 34).map((seat_obj) => {
                      return (
                        <Seat
                          key={uuidv4()}
                          seatData={seat_obj}
                          chosenSeats={[]}
                          isPreview={true}
                        />
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </AuditoriumLayout>
      </div>
      <Stage>舞台</Stage>
      <br />
      <SquareButton
        color="blue"
        onClick={() => {
          navigate("/guide");
        }}
      >
        前往劃位
      </SquareButton>
    </BookingLayout>
  );
};

export default Preview;
