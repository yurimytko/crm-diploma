import React,{useState, useEffect} from "react";

import "./dist/workerUo.css"
import workerService from "../../service/workerService";

import { Preloader } from "../preloader/preloader";

export function WorkerUp({user,worker}){
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false);
    const [drop, setDrop] = useState(false)
    const [role, setRole] = useState("Посада")
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')



    useEffect(() => {
        if (worker) {
            setName(worker.name);
            setPhone(worker.phone)
            setSurname(worker.surname)
            setEmail(worker.email)
            setRole(worker.role)
        }
    }, [worker]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); 
        console.log(file)
    };


    const closeWorkerUp= () => {
        const trucksAddElement = document.getElementById('worker_add');

        trucksAddElement.style.opacity = '0';
        document.getElementById("up_menu_worker").style.transform = "scale(0.8)"

        document.getElementById("drop_w_up").style.height = "0vh"

        setDrop(false)  
        setTimeout(() => {


        trucksAddElement.style.display = 'none';
        setFile(null);

            
        }, 500);
    
    }


    const dropDown = () => {
        if(drop === false){
            document.getElementById("drop_w_up").style.height = "10vh"
            setDrop(true)
        } else{
            document.getElementById("drop_w_up").style.height = "0vh"
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


    const upWorker = async() => {

        setLoading(true)
        try{ 
            const response = await workerService.workerUpdate(
                worker.id,
                name,
                surname,
                phone,
                email,
                role,
                worker.status,
                file,
                worker.isfavorite
    
            )
        }catch(e){
            console.error(e)
        } finally{
            setLoading(false); 
            closeWorkerUp();
            window.location.reload()
        }

    }


    return(
        <div id="up_menu_worker" className="worker_add_menu">
                      {file? (
                    <div className="add_truck_img">
                        <div className="gradient"></div>
                        <img className='uploaded_image' src={URL.createObjectURL(file)} alt="Uploaded" />
                    </div>
                ):(
                    <div className="add_truck_img">
                        <img className="photo_up_Worker" src={`http://localhost:8000/${worker?.picture}`} alt="" />
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
                    <div id = "drop_w_up" className="drop">
                        <p className="drop_text" onClick={roleChange}>Менеджер</p>
                        <p className="drop_text" onClick={roleChange}>Водій</p>

                    </div>
                </div>
            </div>

            <div className="btn_group_w">
                <div className="truck_btn exit" onClick={closeWorkerUp}>Відмінити</div>
                <div className="truck_btn add" onClick={upWorker}>Оновити</div>

            </div>
            {loading && <Preloader/>}
        </div>
    )
}