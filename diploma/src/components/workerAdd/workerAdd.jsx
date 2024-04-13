import React,{useState} from "react";

import "./dist/workerAdd.css"

import workerService from "../../service/workerService";
import { Preloader } from "../preloader/preloader";


export function WorkerAdd({user}){
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false);
    const [drop, setDrop] = useState(false)
    const [role, setRole] = useState("Посада")
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); 
        console.log(file)
    };


    const closeWorkerAdd = () => {
        const trucksAddElement = document.getElementById('worker_add');

        trucksAddElement.style.opacity = '0';
        document.getElementById("add_menu_worker").style.transform = "scale(0.8)"

        document.getElementById("drop_w").style.height = "0vh"

        setDrop(false)  
        setTimeout(() => {


        trucksAddElement.style.display = 'none';
        setFile(null)
        setRole("Посада")
        setName('')
        setSurname('')
        setEmail("")
        setPhone('')

            
        }, 500);
    
    }


    const dropDown = () => {
        if(drop === false){
            document.getElementById("drop_w").style.height = "10vh"
            setDrop(true)
        } else{
            document.getElementById("drop_w").style.height = "0vh"
            setDrop(false)
        }
    }

    const roleChange = (event) => {
        setRole(event.target.textContent);
    };

    const nameChange = (e) => {
        setName(e.target.value)
    }
    const surnameChange = (e) => {
        setSurname(e.target.value)
    }
    const phoneChange = (e) => {
        setPhone(e.target.value)
    }
    const emailChange = (e) => {
        setEmail(e.target.value)
    }


    const addWorker = async() => {

        setLoading(true)
        try{ 
            const response = await workerService.addWorker(
                name,
                surname,
                phone,
                email,
                role,
                file,
                user.admin_id
    
            )
        }catch(e){
            console.error(e)
        } finally{
            setLoading(false); 
            closeWorkerAdd();
            window.location.reload()
        }

    }


    return(
        <div id="add_menu_worker" className="worker_add_menu">
                      {file? (
                    <div className="add_truck_img">
                        <div className="gradient"></div>
                        <img className='uploaded_image' src={URL.createObjectURL(file)} alt="Uploaded" />
                    </div>
                ):(
                    <div className="add_truck_img">
                        <img src="./img/upload_file.svg" alt="" />
                        <div className="gradient"></div>

                        <input className="truck_file" type="file" onChange={handleFileChange}/>
                        <p className="file_text">ОБЕРІТЬ ФАЙЛ</p>
                    </div>  
                )}

                
            <div className="barnd_model_inputs">
                <input className="trucks_inputs" onChange={nameChange} value={name} placeholder="Ім'я" type="text" />
                <input  className="trucks_inputs" onChange={surnameChange} value={surname} placeholder="Призвище"type="text" />


            </div>
            <div className="l_inputs">
                <input className="trucks_inputs" placeholder="Телефон" onChange={phoneChange} value={phone} type="text" />
                <input  className="trucks_inputs" placeholder="Пошта" onChange={emailChange} value={email} type="email" />


            </div>
            <div className="license_fuel_inputs">
                <div onClick={dropDown} className="trucks_inputs dropdown"type="text">
                    <p>{role}</p>
                    <div id = "drop_w" className="drop">
                        <p className="drop_text" onClick={roleChange}>Менеджер</p>
                        <p className="drop_text" onClick={roleChange}>Водій</p>

                    </div>
                </div>
            </div>

            <div className="btn_group_w">
                <div className="truck_btn exit" onClick={closeWorkerAdd}>Відмінити</div>
                <div className="truck_btn add" onClick={addWorker}>Зберегти</div>

            </div>
            {loading && <Preloader/>}
        </div>
    )
}