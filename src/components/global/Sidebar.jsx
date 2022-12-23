import { Fragment, useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HubIcon from "@mui/icons-material/Hub";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const steps = ["Q&A", "Configuration"];

const SidebarMain = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");
  const [data, setData] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const answer = e.target.answer.value;
    console.log("values are:", question + "? a:" + answer);

    const headers = new Headers({ "Content-Type": "application/json" });

    const requestBody = {
      question: question,
      answer: answer,
    };

    const init = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    };

    fetch("/entry", init)
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        setData("entry saved");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: `${colors.primary[400]}`,
        },
        [`.${menuClasses.button}`]: {
          backgroundColor: "transparent",
        },
        [`.${menuClasses.button}:hover`]: {
          backgroundColor: "#868dfb",
        },
        [`.${menuClasses.active}`]: {
          backgroundColor: "#6870fa",
        },
      }}
    >
      <Menu iconShape="square">
        <MenuItem
          onClick={() => collapseSidebar()}
          icon={<MenuOutlinedIcon />}
          style={{
            margin: "10px 0 0 0",
            color: colors.grey[100],
          }}
        >
          {!collapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h5" color={colors.grey[100]}>
                Andres Villamarin
              </Typography>
            </Box>
          )}
        </MenuItem>
        <Item
          title="Dashboard"
          to="/"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <MenuItem
          style={{
            color: colors.grey[100],
          }}
          onClick={handleOpen}
          icon={<AddCircleOutlinedIcon />}
        >
          <Typography>Add</Typography>
        </MenuItem>
        <Item
          title="Slack Integration"
          to="/integrations"
          icon={<HubIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title={data}
          to="/integrations"
          icon={<HubIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>New Q&A</DialogTitle>
        <DialogContent>
          <form id="newQAForm" onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="question"
              label="Add Question"
              type="text"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="answer"
              label="Add Answer"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              InputLabelProps={{ shrink: true }}
              InputProps={{}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            form="newQAForm"
            type="submit"
            onClick={handleClose}
            color="inherit"
            variant="outlined"
            // sx={{ color: "#868dfb", borderColor: "#868dfb" }}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Sidebar>
  );
};

export default SidebarMain;
