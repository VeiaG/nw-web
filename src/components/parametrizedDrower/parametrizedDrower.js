import React,{useEffect, useState} from "react";
import SlDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import SlRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlButton from '@shoelace-style/shoelace/dist/react/button';



const ParametrizedDrower = ({open,parameters,setOpen,isEdit , addValue , setAddValue,addModule,onConfirm})=>{
    const [imgSrc,setImgSrc]=useState("./images/error.png");
    const setParam =(index,value)=>{
        const newParams = [...addValue];
        if(addValue.length <index) return;
        newParams[index] = value;
        setAddValue(newParams);
    }
    useEffect(()=>{
        function checkIfImageExists(url, callback) {
            const img = new Image();
            img.src = url;
            
            if (img.complete) {
              callback(true);
            } else {
              img.onload = () => {
                callback(true);
              };
              
              img.onerror = () => {
                callback(false);
              };
            }
          }
        
        if(parameters ===undefined) return
        let imageString = "./images/"+parameters[0];
        parameters[2].forEach(item=>{
            imageString+=`_${+addValue[item]}`;
        })
        imageString+=".png";
        const setImg = async ()=>{
            checkIfImageExists(imageString, (exists) => {
            if (exists) {
                setImgSrc(imageString);
            } else {
                setImgSrc("./images/error.png");
            }
            });
        }
        setImg();
    },[addValue])
    return <SlDrawer label={((isEdit===-1) ?"Додати " : "Редагувати ") +(parameters && parameters[0])} open={open} onSlAfterHide={() => setOpen(false)}>
        <img src={imgSrc} alt="" className="item-img"/>
        <div className="addDrawer">
        {addValue && parameters[1].map((param,i)=>{
            const settings = param[1];
            const name = param[0];
            const getElementBySetting = (settings)=>{
                switch(typeof settings){
                    case "number":
                        return <SlInput label={name} 
                        type="number" 
                        step={5} 
                        onSlChange={(e)=>{setParam(i,+e.target.value)}}
                        value={addValue[i]}/>
                    case "boolean":
                        return <SlSwitch
                            checked={addValue[i]}
                            onSlChange={(e)=>{setParam(i,e.target.checked)}}>
                                {name}</SlSwitch>
                    case "object":
                        return  <SlRadioGroup 
                            value={addValue[i]}
                            onSlChange={(e)=>{setParam(i,+e.target.value)}}
                            label={name}>
                                {settings.map(item=><SlRadioButton 
                                    value={item}
                                    key={item}>{item}</SlRadioButton>)}
                            </SlRadioGroup>
                    default:
                        return <h2>Error : {typeof settings}</h2>
                }
            }
            return <span key={i}>
                {getElementBySetting(settings)}
            </span>;
        })}
        </div>
        <SlButton slot="footer" variant="primary" onClick={onConfirm}>
          {(isEdit===-1) ?"Додати" : "Редагувати"}
        </SlButton>
  </SlDrawer>
}
export default ParametrizedDrower;