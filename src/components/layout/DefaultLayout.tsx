import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ListIcon from "@mui/icons-material/RecentActors";
import NavItem from "../atoms/NavItem";
import AppBar from "../atoms/AppBar";
import Drawer from "../atoms/Drawer";
import DrawerHeader from "../atoms/DrawerHeader";

const drawerWidth = 240;

function DefaultLayout() {
  const [open, setOpen] = React.useState(true);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Didomi Frontend Challenge
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
        <DrawerHeader>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <nav aria-label="main navigation">
          <List>
            <NavItem href="/give-consent" icon={<CreateIcon />} open={open}>
              Give Consent
            </NavItem>
            <NavItem href="/consents" icon={<ListIcon />} open={open}>
              Collected Consents
            </NavItem>
          </List>
        </nav>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DefaultLayout;
