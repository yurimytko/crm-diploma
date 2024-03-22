import React,{useState} from "react";


import truckServices from "../../service/truckService";

import "./dist/truckAdd.css"
import { Preloader } from "../preloader/preloader";

export function TrucksAdd({decode, fetchData}){

    const user = decode

    const [file, setFile] = useState()
    const [drop, setDrop] = useState(false)
    const [fuel, setFuel] = useState("Оберіть тип пального")
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [license, setLicense] = useState('')
    const [loading, setLoading] = useState(false);



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); 
        console.log(file)
    };


    const closeTruckAdd = () => {
        const trucksAddElement = document.getElementById('trucks_add');

        trucksAddElement.style.opacity = '0';
        document.getElementById("add_menu_truck").style.transform = "scale(0.8)"

        document.getElementById("drop").style.height = "0vh"

        setDrop(false)  
        setTimeout(() => {


        trucksAddElement.style.display = 'none';
        setFile(null)
        setFuel("Оберіть тип пального")
        setBrand('')
        setModel('')
        setLicense('')


            
        }, 500);
    
    }

    const dropDown = () => {
        if(drop === false){
            document.getElementById("drop").style.height = "10vh"
            setDrop(true)
        } else{
            document.getElementById("drop").style.height = "0vh"
            setDrop(false)
        }
    }


    const fuelChange = (event) => {
        setFuel(event.target.textContent);
      };
    const brandChange = (event) => {
        setBrand(event.target.value);
        console.log(event.target.value);
    };
    const modelChange = (event) => {
        setModel(event.target.value);
        console.log(event.target.value);
    };
    const licenseChange = (event) => {
        setLicense(event.target.value);
        console.log(event.target.value);
    };


    const addTruck = async () => {
        setLoading(true); // Установить состояние загрузки данных в true
        try {
            const response = await truckServices.postTrucks(brand, model, license, file, fuel, user.admin_id);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setLoading(false); 
            closeTruckAdd();
            window.location.reload()
        }
    };

    return(
        <div id="add_menu_truck" className="truck_add_menu">

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
                <input className="trucks_inputs" value={brand} onChange={brandChange} placeholder="Марка" type="text" />
                <input  className="trucks_inputs" onChange={modelChange} value={model} placeholder="Модель"type="text" />


            </div>
            <div className="license_fuel_inputs">
                <input className="trucks_inputs" onChange={licenseChange} value={license} placeholder="Номера" type="text" />
                <div onClick={dropDown} className="trucks_inputs dropdown"type="text">
                    {fuel}
                    <div id = "drop" className="drop">
                        <p className="drop_text" onClick={fuelChange}>Бензин</p>
                        <p className="drop_text" onClick={fuelChange}>Дизель</p>

                    </div>
                </div>
            </div>

            <div className="btn_group">
                <div className="truck_btn exit" onClick={closeTruckAdd}>Відмінити</div>
                <div className="truck_btn add" onClick={addTruck}>Зберегти</div>

            </div>
            {loading && <Preloader/>}
            {/* {loading && <Preloader />} */}
        </div>
    )
}