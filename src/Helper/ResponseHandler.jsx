import { useEffect, useState } from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ResponseHandler = (props) => {
  const { data } = props;
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (data?.message) {
      data?.flag
        ? setMessage({ message: data?.message, type: "success" })
        : setMessage({ message: data?.message, type: "error" });
    }
  }, [data, data?.message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({});
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {message?.message && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Object.keys(message).length > 0}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ResponseHandler;
