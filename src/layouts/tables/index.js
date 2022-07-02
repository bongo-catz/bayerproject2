// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, {useState, useEffect, Fragment} from 'react';
import MaterialTable from "./material_table";
import SupplierTable from "./supplier_table";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import ReadOnlyRow from "./data/ReadOnlyRow";
import EditableRow from "./data/EditableRow";

const Tables = () => {
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

  const [editRow, setEditRow] = useState(null);

  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/Materials/includes/view_alL_materials.inc.php")
    .then(res => res.json())
    .then(
        (result) => {
          setItem(result);
        }
      )
  }, [])

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditRow(item.SAP_Mat_Num);

    const formValues = {
      SAP_Mat_Num: item.SAP_Mat_Num,
      Used_in_Products: item.Used_in_Products,
      Material_Name: item.Material_Name,
      Criticality: item.Criticality,
      Work_Stream: item.Work_Stream,
      Material: item.Material,
      Supplier: item.Supplier,
      Manufacturer: item.Manufacturer,
      Sup_Man_Article_Num: item.Sup_Man_Article_Num,
      Qual_Status: item.Qual_Status,
    }

    setEditFormData(formValues);
  }

  const [editFormData, setEditFormData] = useState({
    SAP_Mat_Num: "",
    Used_in_Products: "",
    Material_Name: "",
    Criticality: "",
    Work_Stream: "",
    Material: "",
    Supplier: "",
    Manufacturer: "",
    Sup_Man_Article_Num: "",
    Qual_Status: "",
  })

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    /* const editedItem = {
      SAP_Mat_Num: editFormData.SAP_Mat_Num,
      Used_in_Products: editFormData.Used_in_Products,
      Material_Name: editFormData.Material_Name,
      Criticality: editFormData.Criticality,
      Work_Stream: editFormData.Work_Stream,
      Material: editFormData.Material,
      Supplier: editFormData.Supplier,
      Manufacturer: editFormData.Manufacturer,
      Sup_Man_Article_Num: editFormData.Sup_Man_Article_Num,
      Qual_Status: editFormData.QualStatus,
    } */
    
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
        <AppBar position="static">
          <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
            <Tab
              label="Material Information"
              icon={
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  extension
                </Icon>
              }
              value = "1"
            />
            <Tab
              label="Supplier Information"
              icon={
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  person
                </Icon>
              }
              value = "2"
            />
          </Tabs>
        </AppBar>
      <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
      {tabValue === "1" && 
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Raw Material Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MaterialTable />
              </MDBox>
            </Card>
          </Grid>}
        {tabValue === "2" &&
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Supplier Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <SupplierTable />
              </MDBox>
            </Card>
          </Grid>}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
