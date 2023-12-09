import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  styled,
  type CSSObject,
  type Theme,
} from "@mui/material";

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
  drawerWidth: number;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => !["open", "drawerWidth"].includes(String(prop)),
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  boxSizing: "border-box",
  flexShrink: 0,
  whiteSpace: "nowrap",
  width: drawerWidth,
  ...(open
    ? {
        ...openedMixin(theme, drawerWidth),
        "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default Drawer;
