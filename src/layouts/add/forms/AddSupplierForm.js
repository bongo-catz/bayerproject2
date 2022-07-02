import React, {useState} from 'react';
//import '../../App.css';
import {FormControl, FormLabel, RadioGroup, TextField, Grid, Radio, FormControlLabel, Paper, Avatar} from '@mui/material/';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from '@mui/icons-material/Publish';
import $ from "jquery";

const PATH = "http://localhost:8080/Materials/includes/new_supplier.inc.php";

function AddInformationForms() {

    const [count, setCount] = useState(1);
    const incrementCount = () => {
        setCount(count+1);
    }

    const decrementCount = () => {
        setCount(count-1);
    }

    const [docuheight, setDocuHeight] = useState(600);

    const paperStyle = {padding: 20, height: docuheight, width: 600, margin: "40px auto"}
    const avatarStyle = {backgroundColor:"orange"}
    const [inputFields, setInputFields] = useState ([
        {Supplier_Name: "", Vendor_Type: "", PS_BD_Germ: "", Criticality: "", Mat: "", Mat_Type: "", iso: "", certi: "", QAA: "", Quest: "", sent: false,
        error: null,}
    ])

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleSubmit = (event) => {
        for (var index = 0; index <= count; index++) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: `${PATH}`,
                data: inputFields[index]
            });  
        }
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, {Supplier_Name: "", Vendor_Type: "", PS_BD_Germ: "", Criticality: "", Mat: "", Mat_Type: "", iso: "", certi: "", QAA: "", Quest: "", sent: false,
        error: null,}])
        const newHeight = docuheight + 400;
        setDocuHeight(newHeight);
        incrementCount();
    }

    const handleRemoveField = (index) => {
        if (index != 0) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
            const newHeight = docuheight - 400;
            setDocuHeight(newHeight);
            decrementCount();
        }
    }

    return (
        <Grid>
            <Paper elevation = {10} style = {paperStyle}>
                <Grid align = "center">
                    <Avatar style = {avatarStyle}><AssignmentIndIcon/></Avatar>
                    <h1> Add New Supplier </h1>
                </Grid>
                <br/>
                <form className onSubmit ={handleSubmit}>
                {inputFields.map((inputField,index) => (
                    <div key = {index}>
                    <Grid container rowSpacing = {1} columnSpacing = {{xs:1, sm: 2, md:3}}>
                        <Grid item xs = {6}>
                            <TextField
                            name = "Supplier_Name"
                            label = "Supplier Name and Address"
                            variant = "outlined"
                            value = {inputField.Supplier_Name}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "Vendor_Type"
                            label = "Vendor Type"
                            variant = "outlined"
                            value = {inputField.Vendor_Type}
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "Mat"
                            label = "Material"
                            variant = "outlined"
                            value = {inputField.Mat}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "Mat_Type"
                            label = "Material Type"
                            variant = "outlined"
                            value = {inputField.Mat_Type}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "iso"
                            label = "ISO 90001 Exp."
                            variant = "outlined"
                            fullWidth
                            value = {inputField.iso}
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "certi"
                            label = "Other Certifications (Exp.)"
                            variant = "outlined"
                            fullWidth
                            value = {inputField.certi}
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "QAA"
                            label = "QAA"
                            variant = "outlined"
                            fullWidth
                            value = {inputField.QAA}
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "Quest"
                            label = "Quest."
                            variant = "outlined"
                            fullWidth
                            value = {inputField.Quest}
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <FormControl>
                                <FormLabel>Criticality</FormLabel>
                                <RadioGroup row
                                name = "Crit" 
                                value = {inputField.Crit}
                                required
                                onChange = {event => handleChangeInput(index, event)}
                                >
                                    <FormControlLabel value = "critical" control = {<Radio/>} label = "Critical" />
                                    <FormControlLabel value = "non-critical" control = {<Radio/>} label = "Non-Critical" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs = {6}>
                            <FormControl>
                                <FormLabel>PS / BD / Germany</FormLabel>
                                <RadioGroup row
                                name = "PS_BD_Germ" 
                                value = {inputField.PS_BD_Germ}
                                required
                                onChange = {event => handleChangeInput(index, event)}
                                >
                                    <FormControlLabel value = "PS" control = {<Radio/>} label = "PS" />
                                    <FormControlLabel value = "BD" control = {<Radio/>} label = "BD" />
                                    <FormControlLabel value = "Germany" control = {<Radio/>} label = "Germany" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br/>
                    <IconButton
                        onClick = {() => handleRemoveField(index)}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                        onClick = {() => handleAddFields()}
                    >
                        <AddIcon />
                    </IconButton>
                    <Button 
                        variant = "contained" 
                        color = "primary" 
                        type = "submit"
                        endIcon = {<PublishIcon>send</PublishIcon>}
                        onClick = {handleSubmit}>
                        Submit
                    </Button>
                    </div>
                ))}
            </form>
            </Paper>
        </Grid>
    );
}

export default AddInformationForms;

