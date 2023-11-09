import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import ParametrizedDrower from '../parametrizedDrower/parametrizedDrower';
import SlTab from '@shoelace-style/shoelace/dist/react/tab';
import SlTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import SlTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import getModule from '../modules';
import Item from '../Item/item';
import React, {useEffect, useState} from 'react';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import TableToExcel from "@linways/table-to-excel";



setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/');



const upModules =[
    {
        name: "VM",
        image:"VM_1_0",
        parameters: [
            ["Висота", 900],
            ["Ширина", 0],
            ["Кількість полок", [1, 2, 3]],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]],
            ["Боковина видима", false],
            ["Один фасад", true]
        ],
        imageName: [2, 6]
    },
    {
        name: "VM_VT",
        image:"VM_VT",
        parameters: [
            ["Висота", 900],
            ["Ширина", 0],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]]
        ],
        imageName: []
    },
    {
        name: "VM_V",
        image:"VM_V_1_0",
        parameters: [
            ["Висота", 900],
            ["Ширина", 0],
            ["Кількість полок", [1, 2]],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Стійка посередині", false]
        ],
        imageName: [2, 4]
    },
    {
        name: "VM_K",
        image:"VM_K_1",
        parameters: [
            ["Висота", 900],
            ["Ширина", 0],
            ["Кількість полок", [1, 2]],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]]
        ],
        imageName: [2]
    }

];
const bottomModules =[
    {
        name:"NM_RL",
        image:"NM_RL_0_0",
        parameters:[
            ["Висота"  ,850],
            ["Ширина",0],
            ["Кількість полок", [ 0, 1, 2 ]],
            ["Матеріал корпусу", [ 1, 2, 3, 4 ]],
            ["Матеріал фасаду",  [ 1, 2, 3, 4 ]],
            ["Боковина видима", false],
            ["Gola" , false],
            ["Один фасад" , true],
        ],
        imageName:[2,6]
    },
    {
        name:"NM_YA",
        image:"NM_YA_2_0_0",
        parameters:[
            ["Висота", 850],
            ["Ширина",0],
            [ "Кількість ящиків", [ 2, 3, 4 ]],
            [ "Матеріал корпусу", [ 1, 2, 3, 4 ]],
            [ "Матеріал фасаду", [ 1, 2, 3, 4 ]],
            [ "Боковина видима", false],
            [ "Gola", false],
            [ "Рівні фасади", false],
        ],
        imageName:[ 2, 6, 7]
    },
    {
        name: "NM_M",
        image:"NM_M_0",
        parameters: [
            ["Висота", 850],
            ["Ширина", 0],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]],
            ["Боковина видима", false],
            ["Gola", false],
            ["Один фасад", true]
        ],
        imageName: [5]
    },
    {
        name: "NM_DH",
        image:"NM_DH",
        parameters: [
            ["Висота", 850],
            ["Ширина", 0],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]]
        ],
        imageName: []
    },
    {
        name: "NM_PM",
        image:"NM_PM",
        parameters: [
            ["Висота", 850],
            ["Ширина", [450, 600]],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]],
            ["Gola", false]
        ],
        imageName: []
    },
    {
        name: "NMK",
        image:"NMK_0_0",
        parameters: [
            ["Висота", 850],
            ["Ширина", 0],
            ["Кількість полок", [0, 1, 2]],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]],
            ["Gola", false]
        ],
        imageName: [2, 5]
    },
    {
        name: "NMY_M",
        image:"NMY_M_0",
        parameters: [
            ["Висота", 850],
            ["Ширина", 0],
            ["Матеріал корпусу", [1, 2, 3, 4]],
            ["Матеріал фасаду", [1, 2, 3, 4]],
            ["Gola", false]
        ],
        imageName: [4]
    },
]
const allModules = [...bottomModules , ...upModules];
const getModuleObjByName =(name)=>{
    return allModules.find(module=>module.name === name);
}
const ViewPage = ({items,setOpen,setCurParams,setIsEdit,setAddValue,removeModule})=>{
    const getImage =(name,imageName , parameters)=>{
        if(parameters ===undefined) return "./images/error.png"
        let imageString = "./images/"+name;
        imageName.forEach(item=>{
            imageString+=`_${+parameters[item]}`;
        })
        imageString+=".png";
        return imageString;
    }
    return <div className="flexList">
            {items.map(({module,name,imageName},i)=>{
                const src = getImage(name,imageName,module.Parameters);
                return <Item key={i} src={src}> 
                    <div className="textWrap">
                        {module.Name}
                    </div>
                    <div className="cardFooter" slot='footer'>
                        <SlButton variant="danger" outline  onClick={()=>{
                                removeModule(i);
                            }}> <SlIcon name="trash-fill"></SlIcon> </SlButton>
                        <SlButton variant="primary" outline onClick={()=>{
                            setIsEdit(i);
                            setOpen(true);
                            setAddValue(module.Parameters);
                            const editParams = getModuleObjByName(name);
                            setCurParams([name,editParams.parameters,imageName]);
                        }}> <SlIcon name="pencil-fill"></SlIcon> </SlButton>
                    </div>
                </Item>
            })}
        </div>
}

const TablePage = ({modules ,setIsSave})=>{
    const getMaterialList = (index)=>{
        const name = `Material${index}List`;
        const arr = modules.map(el=>{
            return el.module[name];
        });
        const fullArray = arr.flat(2);
        return fullArray;
    }
    let isSaveLocal = [false,false,false,false,false];
    useEffect(()=>{
        setIsSave(isSaveLocal);
    },[modules])
    const getTable = (index)=>{
        const m = getMaterialList(index);
        isSaveLocal[index] = (m.length>0);
        return <div className="tableContainer">
             <table id={`table${index}`}>
                    <thead>
                    <tr>
                            <th> Длина</th>
                            <th> Ширина</th>
                            <th> К-во</th>
                            <th> В</th>
                            <th> Н</th>
                            <th> Л</th>
                            <th> П</th>
                            <th> Текстура</th>
                            <th> Название</th>
                            <th> Кратность сращения</th>
                    </tr>
                    </thead>
                    <tbody>
                        {m.map((obj,i)=>{
                            return <tr key={i}>
                                <td data-t="n"> {obj.length}</td>
                                <td data-t="n"> {obj.width}</td>
                                <td data-t="n"> {obj.count}</td>
                                <td data-t="n"> {obj.k[0]}</td>
                                <td data-t="n"> {obj.k[1]}</td>
                                <td data-t="n"> {obj.k[2]}</td>
                                <td data-t="n"> {obj.k[3]}</td>
                                <td> {obj.texture}</td>
                                <td> {obj.name}</td>
                                <td> {obj.kr}</td>
                            </tr>
                        })}
                    </tbody>
            </table>
        </div>  
       
    }
    return <div className="tablePage">
        <SlTabGroup>
                <SlTab slot="nav" panel="m1">
                   Матеріал 1
                </SlTab>
                <SlTab slot="nav" panel="m2">
                    Матеріал 2
                </SlTab>
                <SlTab slot="nav" panel="m3">
                    Матеріал 3
                </SlTab>
                <SlTab slot="nav" panel="m4">
                    Матеріал 4
                </SlTab>
                <SlTab slot="nav" panel="m5">
                    Задні стінки
                </SlTab>
                    
                <SlTabPanel name="m1">
                    {getTable(1)}
                </SlTabPanel>
                <SlTabPanel name="m2">
                    {getTable(2)}
                </SlTabPanel>
                <SlTabPanel name="m3">
                    {getTable(3)}
                </SlTabPanel>
                <SlTabPanel name="m4">
                    {getTable(4)}
                </SlTabPanel>
                <SlTabPanel name="m5">
                    {getTable(0)}
                </SlTabPanel>
            </SlTabGroup>
    </div>
}

const AddPage = ({setOpen,setCurParams,setIsEdit,setAddValue,modules})=>{
    const renderList = (list)=>{
        return list.map(({name,image,imageName,parameters},i)=>{
            return <Item key={i} src={`./images/${image}.png`}>
                <div className="cardFooter">
                    <h3>{name}</h3>
                    <SlButton onClick={()=>{
                            const newArray = parameters.map((el)=>{
                                switch(typeof el[1]){
                                    case "number":
                                        return el[1]
                                    case "boolean":
                                        return el[1]
                                    case "object":
                                        return el[1][0]
                                    default:
                                        return 0
                                }
                            });
                            setOpen(true);
                            setIsEdit(-1);
                            setAddValue(newArray);
                            setCurParams([name,parameters,imageName]);
                        }}>Додати</SlButton>
                </div>
            </Item>
        })
    }
    return <div className="addPage">
        <SlTabGroup>
                <SlTab slot="nav" panel="bottom">
                    Нижні модулі
                </SlTab>
                <SlTab slot="nav" panel="up">
                    Верхні модулі
                </SlTab>
                    
                <SlTabPanel name="bottom">
                <div className="flexList">
                    {renderList(bottomModules)}
                </div>
                </SlTabPanel>
                <SlTabPanel name="up">
                <div className="flexList">
                    {renderList(upModules)}
                </div>
                </SlTabPanel>
            </SlTabGroup>
    </div>
}
const useArray = ()=>{
    const [arr,setArr] = useState([]);
    const pushElement = (element)=>{
        const newArr = [...arr];
        newArr.push(element);
        setArr(newArr);
    }
    const removeElement = (index)=>{
        const newArr = [...arr];
        newArr.splice(index,1);
        setArr(newArr);
    }
    const setElement = (index,value)=>{
        const newArr = [...arr];
        newArr[index] = value;
        setArr(newArr);
    }
    return [arr,[pushElement,removeElement,setElement,setArr]];
}


const App = ()=>{
    const [open,setOpen] = useState(false);
    const [curParams,setCurParams] = useState(undefined);
    const [isEdit,setIsEdit] = useState(false);
    const [addValue,setAddValue] = useState(undefined);
    const [modules , [addModule,removeModule,setModule,setAll]] = useArray();
    const [isSave,setIsSave] = useState([false,false,false,false,false]);
    const [themeState , setThemeState] = useState( localStorage.getItem("theme") ?? "dark")
    const isLight = (themeState==="light");

    const md =window.matchMedia("(max-width:700px)").matches;
    useEffect(()=>{
        const html = document.querySelector("html");
        if(isLight){
            html.classList.add("sl-theme-light");
            html.classList.remove("sl-theme-dark");
        }
        else{
            html.classList.remove("sl-theme-light");
            html.classList.add("sl-theme-dark");
        }
        localStorage.setItem("theme",themeState);
    },[themeState]);
    
    const runExport = ()=>{
        isSave.forEach((save,i)=>{
            if(!save) return;
            TableToExcel.convert(document.getElementById(`table${i}`),{
                name:(i===0 ? "Задня стінка" : `Матеріал ${i}`)+".xlsx",
                sheet:{
                    name:"Export"
                }
            });
        })
    }
    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = JSON.parse(e.target.result);
              setAll(data);
            } catch (error) {
              console.error("Помилка імпорту JSON: " + error.message);
            }
          };
          reader.readAsText(file);
        }
      };

    const onConfirm = ()=>{
        if(isEdit===-1){
            const lastModule = (modules[modules.length-1]?.module.Mcount ?? 0)+1;
            addModule({
                name:curParams[0],
                module : getModule(curParams[0],addValue,lastModule),
                imageName: curParams[2],
            });
            setOpen(false);
            return
        }
        
        const newModule = modules[isEdit];
        newModule.module.Edit(addValue);
        setModule(isEdit,newModule);
        setOpen(false);
        setIsEdit(-1);
    }
    
    return <div className="app">
        <div className="header">
            <h1>
                NorwWood v1.0
            </h1>
            <div className="header__right">
                <SlButton onClick={()=>{
                    const jsonData = JSON.stringify(modules, null, 2);
                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'project.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }} >Зберегти проєкт</SlButton>
                 <input 
                    style={{display:"none"}}
                    type="file"
                    accept=".json"
                    onChange={importFromJSON}
                    id="file-input"
                />
                <SlButton onClick={()=>{
                    document.getElementById("file-input").click();
                }} >Відкрити проєкт</SlButton>
                <SlButton onClick={runExport} size="large" variant="success" outline>Експорт</SlButton>
            </div>
            <div className="header__btnGroup">
                    <SlIcon name={isLight?"sun-fill":"moon-fill"}
                        onClick={()=>{
                            if(isLight){
                                setThemeState("dark");
                            }
                            else{
                                setThemeState("light");
                            }
                        }}></SlIcon>
            </div>
        </div>
        <SlTabGroup placement={md? "top":"start"}>
            <SlTab slot="nav" panel="modules">
                Модулі
            </SlTab>
            <SlTab slot="nav" panel="items">
                Перегляд
            </SlTab>
            <SlTab slot="nav" panel="tables">
                Таблиці
            </SlTab>

            <SlTabPanel name="modules">
                <AddPage setOpen={setOpen} 
                setCurParams={setCurParams}
                setIsEdit={setIsEdit}
                setAddValue={setAddValue}
                modules={modules}/>
            </SlTabPanel>
            <SlTabPanel name="items">
                <ViewPage setOpen={setOpen} 
                setCurParams={setCurParams}
                setIsEdit={setIsEdit}
                setAddValue={setAddValue}
                items={modules}
                removeModule={removeModule}/>
            </SlTabPanel>
            <SlTabPanel name="tables">
                <TablePage modules={modules} setIsSave={setIsSave}/>    
            </SlTabPanel>
        </SlTabGroup>
        
        <ParametrizedDrower 
            isEdit={isEdit}
            open={open} 
            parameters={curParams} 
            setOpen={setOpen}
            addValue={addValue}
            setAddValue={setAddValue}
            onConfirm={onConfirm}/>
    </div>
}
export default App