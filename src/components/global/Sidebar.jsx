import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
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

const SidebarMain = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

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
        <Item
          title="Questions"
          to="/questions"
          icon={<QuestionAnswerIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Slack Integration"
          to="/integrations"
          icon={<HubIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  );
};

export default SidebarMain;
