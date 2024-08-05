import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ResponseHandler from "../Helper/ResponseHandler";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "@mui/material";
import { saveLogedUser } from "../redux/reducers/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(undefined);
  const currentUser = useSelector((state) => state.user.currentUser);

  const getToastMessage = useCallback(() => {
    if (location?.state) {
      setMessage({
        message: location?.state,
        flag: true,
      });
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const getUsers = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(data?.data);
  };

  useEffect(() => {
    getToastMessage();
    getUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "username", headerName: "User Name", width: 200 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "website",
      headerName: "Website",
      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      width: 350,
      valueGetter: (value, row) => {
        return `${row?.address?.street || ""} ${row?.address?.suite || ""} ${
          row?.address?.city || ""
        }`;
      },
    },
  ];

  const handleLogout = () => {
    dispatch(saveLogedUser({}));
    navigate("/login", {
      state: "Logout has been successfully",
    });
  };
  console.log("currentUser", currentUser);

  return (
    <>
      {message && <ResponseHandler data={message} />}
      <Card>
        <h3>
          Current User:
          {` ${currentUser[0]?.firstName || ""} ${
            currentUser[0]?.lastName || ""
          }`}
        </h3>
        <Button variant="outlined" onClick={handleLogout}>
          LogOut
        </Button>
      </Card>
      <div style={{ height: 400, width: "100%", margin: 10 }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
};
export default Dashboard;
