import React, {useState, useEffect} from 'react';
//import '../../App.css';
import {FormControl, FormLabel, RadioGroup, TextField, Grid, Radio, FormControlLabel, Paper, Avatar} from '@mui/material/';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from '@mui/icons-material/Publish';
import $ from "jquery";

const PATH = "http://localhost:8080/Materials/includes/new_material.inc.php";

function AddInformationForms() {

    const [count, setCount] = useState(1);
    const [docuheight, setDocuHeight] = useState(600);

    const incrementCount = () => {
        setCount(count+1);
    }

    const decrementCount = () => {
        setCount(count-1);
    }

    const paperStyle = {padding: 20, height: docuheight, width: 600, margin: "40px auto"}
    const avatarStyle = {backgroundColor:"green"}
    const [inputFields, setInputFields] = useState ([
        {SAPMATNUM: "", products: "", MatName: "", Crit: "", workstream: "", mat: "", supp: "", manu: "", sup_man_num: "", qual: "", sent: false,
        error: null}
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
        setInputFields([...inputFields, {SAPMATNUM: "", products: "", MatName: "", Crit: "", workstream: "", mat: "", supp: "", manu: "", sup_man_num: "", qual: "", sent: false,
        error: null}])
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
                    <Avatar style = {avatarStyle}><BlurOnIcon/></Avatar>
                    <h1> Add New Material </h1>
                </Grid>
                <br/>
                <form className onSubmit ={handleSubmit}>
                {inputFields.map((inputField,index) => (
                    <div key = {index}>
                    <Grid container rowSpacing = {1} columnSpacing = {{xs:1, sm: 2, md:1, m: 5}}>
                        <Grid item xs = {6}>
                            <TextField 
                            name = "SAPMATNUM"
                            label = "SAP Material Number"
                            variant = "outlined"
                            value = {inputField.SAPMATNUM}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "products"
                            label = "Used in Products"
                            variant = "outlined"
                            value = {inputField.products}
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "MatName"
                            label = "Material Name"
                            variant = "outlined"
                            value = {inputField.MatName}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "mat"
                            label = "Material"
                            variant = "outlined"
                            value = {inputField.mat}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "supp"
                            label = "Supplier"
                            variant = "outlined"
                            value = {inputField.supp}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "manu"
                            label = "Manufacturer"
                            variant = "outlined"
                            value = {inputField.manu}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "sup_man_num"
                            label = "Supp/Manu #"
                            variant = "outlined"
                            value = {inputField.sup_man_num}
                            required
                            fullWidth
                            onChange = {event => handleChangeInput(index, event)}
                            />
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField
                            name = "qual"
                            label = "Qual. Status"
                            variant = "outlined"
                            value = {inputField.qual}
                            required
                            fullWidth
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
                                <FormLabel>WorkStream</FormLabel>
                                <RadioGroup row
                                name = "workstream" 
                                value = {inputField.workstream}
                                required
                                onChange = {event => handleChangeInput(index, event)}
                                >
                                    <FormControlLabel value = "upstream" control = {<Radio/>} label = "Up Stream" />
                                    <FormControlLabel value = "downstream" control = {<Radio/>} label = "Down Stream" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
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
                    </Grid>
                    </div>
                ))}
            </form>
            </Paper>
        </Grid>
    );
}

export default AddInformationForms;

