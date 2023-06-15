import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";

function Header() {
  const [value, setvalue] = useState();
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setvalue(val)}
              value={value}
              textColor="inherit"
            >
              <Tab label="login" />
              <Tab label="signup" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
