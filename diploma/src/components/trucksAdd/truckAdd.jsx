import React,{useState} from "react";

import "./dist/truckAdd.css"

export function TrucksAdd(){
    const [file, setFile] = useState()



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); 
        console.log(file)
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
                <input className="trucks_inputs" placeholder="Марка" type="text" />
                <input  className="trucks_inputs" placeholder="Модель"type="text" />


            </div>
            <div className="license_fuel_inputs">
                <input className="trucks_inputs" placeholder="Марка" type="text" />
                <input  className="trucks_inputs" placeholder="Модель"type="text" />
            </div>

            <div className="btn_group">
                <div className="truck_btn exit"></div>
                <div className="truck_btn add"></div>

            </div>


        </div>
    )
}