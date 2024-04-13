import React, {useEffect, useRef, useState} from "react";

import workerService from "../../service/workerService";

import "./dist/workerCArd.css"

export function WorkerCard({data, getOneWorker}){
    const [favorite, setFavorite] = useState(data.isfavorite)


    const card = useRef()
    const fav = useRef()

    const deleteWorker = async() => {
        await workerService.deleteWorker(data.id)
        card.current.style.display = "none"
    }

    const getWorker = () => {
        getOneWorker(data.id)
    }


    const updateFav = async() => {
        const tempFav = !favorite
        setFavorite(tempFav)

        try{
            const response = await workerService.favWorkerUp(data.id, tempFav)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=> {
        if(favorite === true){
            fav.current.style.opacity = "1"
        }else{
            fav.current.style.opacity = "0"

        }
    },[favorite])


    return(
        <div className="worker_card" ref={card}>
            <div className="w_img_con">
                <img className="w_img" src={`http://localhost:8000/${data.picture}`} alt="" />
            </div>
            <div className="w_line"></div>
            <div className="w_name">
                {data.name} {data.surname}
            </div>
            <div className="w_line"></div>
            <div className="w_name">
            {data.phone}
            </div>
            <div className="w_line"></div>

            <div className="w_name">
            {data.email}
            </div>
            <div className="w_line"></div>
            <div className="w_name">
            {data.role}
            </div>
            <div className="w_line"></div>

            <div className="w_name">
            {data.status}
            </div>
            <div className="w_line"></div>
            <div className="w_control_card">
                <img src="./img/edit_pencil.svg" onClick={getWorker} alt="" />
                <img src="./img/delete.svg" alt="" onClick={deleteWorker}/>

                <div className="fav_worker_btn" onClick={updateFav}>
                    <img className="fav_w" src="./img/fav_yellow.svg" alt="" />
                    <img className="fav_w_a" ref={fav} src="./img/fav_yellow_a.svg" alt="" />

                </div>

            </div>
        </div>
    )
}