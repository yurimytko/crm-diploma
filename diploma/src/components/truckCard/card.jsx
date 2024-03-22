import React,{useEffect,useRef, useState} from "react";


import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import truckServices from "../../service/truckService";
import "./dist/card.css"

export function TruckCard({data, fetchData}){

    const trucks = data

    const status = useRef()
    const favorite = useRef()
    const card = useRef()

    const [fav,setFav] = useState(trucks.isfavorite)

    const deleteTruck = async() =>{
        const response = await truckServices.deleteTruck(trucks.id)
        console.log(response)
        card.current.style.display = "none"
    }


    useEffect(() => {
        if(trucks){
            if(trucks.status === 'Доступний'){
                status.current.style.color = '#5DE2D9'
            }
            if(trucks.status === 'Не доступний'){
                status.current.style.color = '#FE3232'
            }
            if(trucks.isfavorite === true){
                favorite.current.style.opacity = '1'
            }
            else{
                favorite.current.style.opacity = '0'
            }
        }
    }, [trucks]);
    

      const favUp = async () => {
        try {
          const updatedFav = !fav;
          
          setFav(updatedFav);
      
          const response = await truckServices.favTruckUp(
            trucks.id,
            updatedFav
          );
      
          console.log(response.data);
        } catch (error) {
          console.error('Error updating favorite status:', error);
        }

        await fetchData()
      };




    return(
        <div ref={card} className="truck_card">
            <div className="img_con">
                {trucks && (
                    <LazyLoadImage src={`http://localhost:8000//${trucks.picture}`} alt=""className="truck_img"effect="blur"/>  // Эффект размытия при загрузке (опционально)/>
                )}
                <div className="fav_truck_con" onClick={favUp}>
                    <img className="truck_fav" src="./img/truck_fav.svg" alt="" />
                    <img ref={favorite} className="truck_fav_act" src="./img/truck_fav_act.svg" alt="" />
                </div>
                <div className="add_setings">
                    <img className="dots" src="./img/add_setings.svg" alt="" /> 
                    <div className="add_setings_btns">
                    <div className="add_set_btn up">Редагувати</div>
                        <div className="add_set_btn del" onClick={deleteTruck}>Видалити</div>
                    </div>
                </div>
            </div>
            <div className="truck_brand">
                {trucks.brand}
            </div>
            <div className="info_block">
                <div className="truck_info">
                    <p className="truck_info_punkt">Модель</p>
                    <div className="truck_line"></div>
                    <p>{trucks.model}</p>
                </div>
                <div className="truck_info">
                    <p className="truck_info_punkt">Номера</p>
                    <div className="truck_line"></div>
                    <p>{trucks.license}</p>
                </div>
                <div className="truck_info">
                    <p className="truck_info_punkt">Статус</p>
                    <div className="truck_line"></div>
                    <p className="tuck_status" ref={status}>{trucks.status}</p>
                </div>
                <div className="truck_info">
                    <p className="truck_info_punkt">Пальне</p>
                    <div className="truck_line"></div>
                    <p>{trucks.fuel_type}</p>
                </div>
            </div>
        </div>
    )
}