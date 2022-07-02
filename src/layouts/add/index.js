import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AddInformationForm from "./forms/AddInformationForm";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import AddSupplierForm from "./forms/AddSupplierForm";
import CreateOwnForm from "./forms/CreateOwnForm";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/add/components/Header";
import PlatformSettings from "layouts/add/components/PlatformSettings";

import breakpoints from "assets/theme/base/breakpoints";

function Add() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
      <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Add New Material"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      extension
                    </Icon>
                  }
                  value = "1"
                />
                <Tab
                  label="Add New Supplier"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      person
                    </Icon>
                  }
                  value = "2"
                />
                <Tab
                  label="Create Own Form"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      inventory
                    </Icon>
                  }
                  value = "3"
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                {tabValue === "1" && <AddInformationForm />}
                {tabValue === "2" && <AddSupplierForm />}
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
        {tabValue === "3" && <CreateOwnForm/>}
      </Header>
    </DashboardLayout>
  );
}

export default Add;
