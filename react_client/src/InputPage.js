
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

function InputPage() {

    function makePostRequest() {
        axios.post('http://127.0.0.1:5000/insert', {
            id: id,
            name: name})
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
        }
    const [isIDError, setIsIDError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);

    function handleSubmit() {
        if (id === "") {
            setIsIDError(true);
            console.log("No ID entered");
            return
        }
        if (name === "") {
            setIsNameError(true);
            console.log("No Name entered");
            return
        }
        
        console.log("Submit button clicked");
        console.log(id + ", " + name);
        setId("");
        setName("");
        makePostRequest();
    }
    function handleIdChange(event) {
        setId(event.target.value);
        setIsIDError(false);
    }
    function handleNameChange(event) {
        setName(event.target.value);
        setIsNameError(false);
    }
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    return (
        <div>
            <h1>This is an input page</h1>
            {isIDError ? <TextField id = "id-input" label = "Enter id..." value = {id} onChange = {handleIdChange} error/> :
            <TextField id = "id-input" label = "Enter id..." value = {id} onChange = {handleIdChange}/>}
            {isNameError ? <TextField id = "name-input" label = "Enter name..." value = {name} onChange = {handleNameChange} error/> :
            <TextField id = "name-input" label = "Enter name..." value = {name} onChange = {handleNameChange} />}
            <Button onClick = {handleSubmit}>Submit</Button>
        </div>
    )
}

export default InputPage;