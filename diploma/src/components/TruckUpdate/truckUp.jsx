import React, {useState,useEffect} from "react";

import "./dist/truckUp.css"
import { Preloader } from "../preloader/preloader";

export function TruckUp({truck}){
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

    useEffect(() => {
        if(truck){
            setBrand(truck?.brand)
            setModel(truck?.model)
            setLicense(truck?.license)
            setFuel(truck?.fuel_type)
        }
        
    },[])



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


    const closeTruckUp = () => {
        const trucksAddElement = document.getElementById('trucks_up');

        trucksAddElement.style.opacity = '0';
        document.getElementById("truck_up_menu").style.transform = "scale(0.8)"

        document.getElementById("drop_t_up").style.height = "0vh"

        setDrop(false)  
        setTimeout(() => {


        trucksAddElement.style.display = 'none';

            
        setBrand(truck?.brand)
        setModel(truck?.model)
        setLicense(truck?.license)
        setFuel(truck?.fuel_type)
        setFile(null)
        setDrop(false)
        

        }, 500);
    
    }



    const dropDown = () => {
        if(drop === false){
            document.getElementById("drop_t_up").style.height = "10vh"
            setDrop(true)
        } else{
            document.getElementById("drop_t_up").style.height = "0vh"
            setDrop(false)
        }
    }

    return(
        <div id="truck_up_menu" className="truck_up_menu">
            {file? (
                    <div className="add_truck_img">
                        <div className="gradient"></div>
                        <img className='uploaded_image' src={URL.createObjectURL(file)} alt="Uploaded" />
                    </div>
                ):(
                    <div className="add_truck_img">
                        <img className="up_truck" src={`http://localhost:8000/${truck?.picture}`} alt="" />
                        <div className="gradient"></div>

                        <input className="truck_file" type="file" onChange={handleFileChange}/>
                        <p className="file_text">ОБЕРІТЬ ФАЙЛ</p>
                    </div>  
                )}

                
            <div className="barnd_model_inputs">
                <input className="trucks_inputs" onChange={brandChange} value={brand} placeholder="Марка" type="text" />
                <input  className="trucks_inputs" onChange={modelChange} value={model} placeholder="Модель"type="text" />


            </div>
            <div className="license_fuel_inputs">
                <input className="trucks_inputs" onChange={licenseChange} value={license} placeholder="Номера" type="text" />
                <div onClick={dropDown} className="trucks_inputs dropdown"type="text">
                    {fuel}
                    <div id = "drop_t_up" className="drop">
                        <p className="drop_text" onClick={fuelChange}>Бензин</p>
                        <p className="drop_text" onClick={fuelChange}>Дизель</p>

                    </div>
                </div>
            </div>

            <div className="btn_group">
                <div className="truck_btn exit" onClick={closeTruckUp}>Відмінити</div>
                <div className="truck_btn add">Зберегти</div>

            </div>
            {loading && <Preloader/>}
        </div>
    )
}