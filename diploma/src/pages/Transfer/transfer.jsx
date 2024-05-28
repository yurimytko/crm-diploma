import React,{useEffect, useState} from "react";

import { NavBar } from "../../components/NavBar/navBar";
import trnsfService from "../../service/transferService";

import "./dist/transfer.css"
import { TransferCard } from "../../components/transferCard/transferCard";


export function Transfer({decode}){
    const user = decode

    const [trnsfData, setTrnsfData] = useState()


    const getTrnsf =async()=>{

        try{
            const response = await trnsfService.getTrnsf(user.admin_id)
            setTrnsfData(response.data)
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=> {
        getTrnsf()
    },[decode])
    
    return(
        <div className="transfer_page">
            <NavBar/>
            <div className="transfer_right">
                <div className="worker_header">
                    <p className="worker_heading">Рейси</p>
                    <div className="profile">
                        <div className="profile_left">
                            <p className="name">{user?.name} {user?.surname}</p>
                            <p className="role_user">{user?.role}</p>
                        </div>
                        <div className="profile_right">
                            <img className="profile_img" src={`http://localhost:8000/${user?.picture}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className="transfer_add_btn">
                        Створити рейс
                </div>
                <div className="transfer_window">
                    {trnsfData?.map((trnsf,index) =>(
                        <TransferCard transfer = {trnsf}/>
                    ))}
                </div>
            </div>
        </div>
    )
}