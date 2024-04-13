import React, {useState, useEffect, useRef} from "react";
import { NavBar } from "../../components/NavBar/navBar";

import truckServices from "../../service/truckService";

import "./dist/trucks.css"
import { TruckCard } from "../../components/truckCard/card";
import { TrucksAdd } from "../../components/trucksAdd/truckAdd";
import { Preloader } from "../../components/preloader/preloader";
import { TruckUp } from "../../components/TruckUpdate/truckUp";

export function TrucksPage({decode}){


    const user = decode;
    const [loading, setLoading] = useState(false);
    const [trucks, setTrucks] = useState(null);
    const [allTrucks, setAllTrucks] = useState(null)
    const [originalTrucksData, setOriginalTrucksData] = useState(null);
    const [allFavTruck, setAllFavTrucks] = useState(null);
    const [fav,setFav] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState()
    const [value, setValue] = useState("")
    const trucksContainerRef = useRef(null);
    const [oneTruck, setOneTruck] = useState()

  
    const fetchData = async () => {
      try {
          setLoading(true);
          const response = await truckServices.getTrucks(user.admin_id, page);
          setTrucks(response.data.data);
          setOriginalTrucksData(response.data.data);
          setTotalPages(response.data.totalPages);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
  };


      const fetchAllData = async() => {
        try{
          const response = await truckServices.getAlLTrucks(user.admin_id)
          setAllTrucks(response.data)
        }catch(e){
          console.log(e)
        }
      }

      const faetchFavorite = async() => {
        setLoading(true)
        try{
          const response = await truckServices.getFavTrucks(user.admin_id)
          setTrucks(response.data)
        }catch(e){
          console.log(e)
        } finally{
          setLoading(false)
        }
      }


    const onFavorite = async() => {
        if(fav === false){
            faetchFavorite()



            setFav(true)
        }
        else{
            setPage(1)
            fetchData()
            document.getElementById('favorite_con').style.background = '#1F2833'
            document.getElementById('favorite_con').style.border = '0.4vh solid #6CF3E9'
            document.getElementById('fav_control').style.opacity = '1'
            setFav(false)
        }
        
      }




      const handleScroll = async () => {
        const { scrollTop, clientHeight, scrollHeight } = trucksContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight && page < totalPages) {
            console.log('Низ блока достигнут');
            setPage(prevPage => prevPage + 1); 
        }
    };


      useEffect(()=> {
        if (trucksContainerRef.current) {
          trucksContainerRef.current.addEventListener('scroll', handleScroll);
        }      
        return () => {
          if (trucksContainerRef.current) {
            trucksContainerRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      })


      useEffect(() => {
        if(fav === false){
          const fetchDataOnScroll = async () => {
            try {
                const response = await truckServices.getTrucks(user.admin_id, page);
                if (Array.isArray(response.data.data)) {
                    setTrucks(prevTrucks => [...prevTrucks, ...response.data.data]);
                    setOriginalTrucksData(prevOriginalTrucksData => [...prevOriginalTrucksData, ...response.data.data]);
                    console.log(trucks)
                } else {
                    console.error("response.data.data is not an array");
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        if (page > 1) {
            fetchDataOnScroll();
        }
        if(page ===1){
          fetchData()
        }
        }

    }, [page]);



      useEffect(() => {
        fetchData()
        fetchAllData()
      }, [decode]);


      const openTruckAdd = () => {
        const trucksAddElement = document.getElementById('trucks_add');

        trucksAddElement.style.display = 'flex';
          
        setTimeout(() => {
          trucksAddElement.style.opacity = '1';
          document.getElementById("add_menu_truck").style.transform = "scale(1)"

            
        }, 100);
      };



    const filterSearch = (e) => {
      const value = e.target.value
      setValue(value)
      console.log(value)
      if(value === ""){
        setPage(1)
        fetchData()
      }
      else{
        const search = allTrucks.filter((truck) =>
            truck.brand.toLowerCase().includes(value) ||
            truck.model.toLowerCase().includes(value) ||
            truck.license.toLowerCase().includes(value)
          );
          setTrucks(search);
      }
    }




    let currentDate = new Date();
    useEffect(() => {

      let currentHours = currentDate.getHours();
      let currentMinutes = currentDate.getMinutes();
      let currentSeconds = currentDate.getSeconds();
    
      console.log(currentHours + ":" + currentMinutes + ":" + currentSeconds);
    }, [currentDate]);


    const openUpMenu = async(id) => {
      const response = await truckServices.getTrucksById(id)
      console.log(response.data)
      setOneTruck(response.data)
    }
    


    return(
        <div className="trucks_page">
            <NavBar/>
            <div className="trucks_work_space">
                <div className="dash_header">
                    <p className="page_heading">Вантажівки</p>
                    <div className="profile">
                        <div className="profile_left">
                            <p className="name">
                                {user?.name} {user?.surname}
                            </p>
                            <p className="role_user">{user?.role}</p>
                        </div>
                        <div className="profile_right">
                            <img className="profile_img" src={`http://localhost:8000/${user?.picture}`} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="search_control_panel">
                    <div className="search_con">
                        <input placeholder="пошук" type="text" className="search" onChange={filterSearch}/>
                    </div>
                    <div className="control_con">
                        <div id="favorite_con" onClick={onFavorite}  className="favorite_con">
                            <img id="fav_control" className="fav_control" src="./img/favorite.svg" alt="" />
                            <img  src="./img/fav_active.svg" alt="" />

                        </div>
                        <div className="add_con" onClick={openTruckAdd}>
                            <img src="./img/add.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="trucks_con" ref={trucksContainerRef}>
                {loading ? (
                    <Preloader/>
                ) : trucks && trucks.length > 0 ? (
                    trucks.map((truck, index) => (
                        <TruckCard openUpMenu= {openUpMenu} key={index} fetchAllData={fetchAllData} data={truck} index={index} />
                    ))
                ) : (
                    <p>No trucks available</p>
                )}
                </div>
            </div>

            <div id="trucks_add" className="black_block">
              <TrucksAdd decode = {decode} fetchData ={fetchData}/>
              
            </div>
            <div id="trucks_up" className="black_block">
              <TruckUp truck = {oneTruck}/>
            </div>

        </div>
    )
}