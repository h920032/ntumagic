import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Typography, Button, styled } from "@mui/material";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
`;
const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
`;

const PayPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Layout>
      <StyledBox>
        <Typography variant="h5">感謝您的劃位!</Typography>
        <Typography>請於劃位後至隔日15:00前將總金額匯款至:</Typography>
        <Alert icon={false} severity="info">
          <Typography>銀行代碼: 008 華南銀行</Typography>
          <Typography>帳號: 153200800025</Typography>
          <Typography>戶名: 楊皓勛</Typography>
        </Alert>
        {currentUser.user.bankAccount ? (
          <Typography>您的付款帳號: {currentUser.user.bankAccount}</Typography>
        ) : (
          <Typography>
            您的付款帳號: 尚未設定
            <Button component={Link} to="/profile" size="small">
              前往設定
            </Button>
          </Typography>
        )}
        <Typography>繳費說明:</Typography>
        <Typography>1. 完成付款之後，請填寫您的付款帳戶末5碼</Typography>
        <Typography>
          2. 待確認款項後，會於個人頁面顯示付款成功，並寄信至您的信箱
        </Typography>
        <Typography>3. 晚會當日請依信件至會場索取實體票</Typography>

        <Button component={Link} to="/profile" variant="contained">
          我知道了
        </Button>
      </StyledBox>
    </Layout>
  );
};

export default PayPage;
