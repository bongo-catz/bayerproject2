import React, {Component, createRef, useState} from 'react';
//import '../../App.css';
import {FormControl, FormLabel, RadioGroup, TextField, Grid, Radio, FormControlLabel, Paper, Avatar} from '@mui/material/';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from '@mui/icons-material/Publish';
import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];

document.body.style.margin = "30px";

class FormBuilder extends Component {
    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder({formData});
    }
    render() {
        return <div id = "fb-editor" ref = {this.fb} />
    }
}

const PATH = "http://localhost:8080/Materials/includes/new_supplier.inc.php";

function CreateOwnForm() {
    return (
        <FormBuilder />
    )
}

export default CreateOwnForm;

