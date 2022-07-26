import React, {useState, useEffect, useRef} from 'react';
import "./styles.css";
import ContentEditable from "react-contenteditable";


import { setConstantValue } from 'typescript';

const placeholder: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

interface Props{
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    handleContent: (e: React.FormEvent) => void;
}

function transformation(data: string) {
    const test = `${data}`;

    return test;
}




const InputField: React.FC<Props> = ({content, setContent, handleContent}: Props) => {
    
    const [value, setValue] = useState("");

    const handleChanges = (event: React.FormEvent) => {
        const { target } = event;
    };
    
    useEffect(()=>{
        setValue(placeholder);
    }, [])
    
    const inputRef = useRef(null); // might need to be a generic

    // make a form?
    return (
       <div className="input"> 
            {/* <ContentEditable
                ref = {inputRef}
                onChange={(e)=> setValue(e.target.value)}
                html={transformation(value)}
            /> */}
            <p>Dont bother stopped working completely</p>
             
              
       
       </div>
       
       

        
   )
    
};

export default InputField
