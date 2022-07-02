// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Dashboard components
import Projects from "layouts/home/components/Projects";
import OrdersOverview from "layouts/home/components/OrdersOverview";

function Home() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultProjectCard
                image="https://bit.ly/3MGJQYO"
                label="View Databases"
                title="Raw Materials and Suppliers"
                description="View information on raw materials and suppliers!"
                action={{
                  type: "internal",
                  route: "/tables",
                  color: "info",
                  label: "View",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultProjectCard
                  image="https://bit.ly/3MGJQYO"
                  label="Query Information"
                  title="Raw Materials and Suppliers"
                  description="Search for information on raw materials and suppliers!"
                  action={{
                    type: "internal",
                    route: "/query",
                    color: "info",
                    label: "search",
                  }}
                />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultProjectCard
                    image="https://bit.ly/3MGJQYO"
                    label="Add Information"
                    title="Raw Materials and Suppliers"
                    description="Add information on raw materials and suppliers!"
                    action={{
                      type: "internal",
                      route: "/add",
                      color: "info",
                      label: "add",
                    }}
                  />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
          </Grid>
        </Grid>
        <MDBox>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
