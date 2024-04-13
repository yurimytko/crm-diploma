import React,{useEffect, useState} from "react";

import workerService from "../../service/workerService";

import { NavBar } from "../../components/NavBar/navBar";


import "./dist/workers.css"
import { WorkerCard } from "../../components/workerCard/workerCard";
import { WorkerAdd } from "../../components/workerAdd/workerAdd";
import { WorkerUp } from "../../components/workerUpdate/workerUp";
import { Preloader } from "../../components/preloader/preloader";


export function Workers({decode}){

    const [workers, setWorkers] = useState([]);
    const [originalWorkers, setOriginalWorkers] = useState()

    const [value, setValue] = useState()

    const [loading, setLoading] = useState(false);

    const [worker, setWorker] = useState()

    const [fav, setFav] = useState(false)



    const user = decode


    const fetchWorkers = async () => {
        try {
            setLoading(true);
    
            const response = await workerService.getWorkers(user.admin_id);
    
            const filteredData = response.data.filter(worker => worker.id !== user.id);
    
            setWorkers(filteredData);
            setOriginalWorkers(filteredData);
            console.log(filteredData);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };


    const getFavWorkers = async() => {
        try{
            setLoading(true)
            const response = await workerService.gatFavWorkers(user.admin_id)
            setWorkers(response.data)
        }catch(e){

        } finally{
            setLoading(false)
        }
    }   

    const getOneWorker = async(id) => {
        const response = await workerService.getOneWorker(id)
        setWorker(response.data)
        console.log(response.data)

        const trucksAddElement = document.getElementById('worker_add');
        document.getElementById("add_menu_worker").style.display= "none"
        document.getElementById("up_menu_worker").style.display = "block"


        trucksAddElement.style.display = 'flex';
        
          
        setTimeout(() => {
          trucksAddElement.style.opacity = '1';
          document.getElementById("up_menu_worker").style.transform = "scale(1)"

            
        }, 100);
    }


    const onFav= () => {
        if (fav === false){
            getFavWorkers()
            setFav(true)
        }
        else{
            fetchWorkers()
            setFav(false)
        }
    }


    const workerkAdd = () => {
        const trucksAddElement = document.getElementById('worker_add');

        trucksAddElement.style.display = 'flex';
        document.getElementById("add_menu_worker").style.display= "block"
        document.getElementById("up_menu_worker").style.display = "none"


          
        setTimeout(() => {
          trucksAddElement.style.opacity = '1';
          document.getElementById("add_menu_worker").style.transform = "scale(1)"

            
        }, 100);
      };


    useEffect(()=> {
        fetchWorkers()
    },[decode])


    const wokerFilter = (e) => {
        const value = e.target.value
        setValue(value)
        console.log(value)
        if(value === ''){
            fetchWorkers()
        }
        else{
            const search = workers.filter((worker)=>
            worker.name.includes(value) || worker.name.toLowerCase().includes(value)||
            worker.phone.includes(value) || worker.email.includes(value)


        )
        setWorkers(search)
        }
    }




    const sortedWorkers = workers.sort((a, b) => a.id - b.id);

    return(
        <div className="worker_page">
            <NavBar/>
            <div className="workers_right">
            <div className="worker_header">
                <p className="worker_heading">Працівники</p>
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
            <div className="workers_window">
                <div className="search_control_panel_w">
                    <div className="search_con">
                        <input placeholder="пошук" onChange={wokerFilter} type="text" className="search"/>
                    </div>
                    <div className="control_con">
                        <div id="favorite_con"  className="favorite_con" onClick={onFav}>
                            <img id="fav_control" className="fav_control" src="./img/favorite.svg" alt="" />
                            <img  src="./img/fav_active.svg" alt="" />

                        </div>
                        <div className="add_con" onClick={workerkAdd}>
                            <img src="./img/add.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="gradient_line"></div>
                <div className="worker_space">
                {loading && <Preloader />}
            
                    {!loading && sortedWorkers.map((worker, index) => (
                        <WorkerCard getOneWorker={getOneWorker} data={worker} key={index} index={index} />
                    ))}
                    
                </div>

            </div>
            

            </div>
            <div id="worker_add" className="black_block">
                <WorkerAdd user = {decode}/>
                <WorkerUp worker= {worker} user = {decode}/>
            </div>
            
        </div>
    )
}