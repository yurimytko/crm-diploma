import React, {useState, useEffect, useRef} from "react";
import { NavBar } from "../../components/NavBar/navBar";

import truckServices from "../../service/truckService";

import "./dist/trucks.css"
import { TruckCard } from "../../components/truckCard/card";

export function TrucksPage({decode}){


    const user = decode;
    const [trucks, setTrucks] = useState(null);
    const [originalTrucksData, setOriginalTrucksData] = useState([null]);
    const [fav,setFav] = useState(false);
    const [page,setPage] = useState(1)
    const [total, setTotal] = useState()

    const trucksContainerRef = useRef(null);

  
    const fetchData = async () => {
        try {
          const response = await truckServices.getTrucks(user.admin_id, page);

          setTrucks(response.data.data);
          setOriginalTrucksData(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.log(error);
        } 
      };


    const onFavorite = async() => {
        if(fav === false){
            const filteredItems = trucks.filter(item => item.isfavorite === true);
            setTrucks(filteredItems);
            document.getElementById('favorite_con').style.background = '#6CF3E9'
            document.getElementById('favorite_con').style.border = '0.4vh solid #1F2833'
            document.getElementById('fav_control').style.opacity = '0'
            console.log(filteredItems)


            setFav(true)
        }
        else{
            setTrucks(originalTrucksData)
            document.getElementById('favorite_con').style.background = '#1F2833'
            document.getElementById('favorite_con').style.border = '0.4vh solid #6CF3E9'
            document.getElementById('fav_control').style.opacity = '1'
            setFav(false)
        }
        
      }


      useEffect(() => {
        const handleScroll = () => {
          const { scrollTop, clientHeight, scrollHeight } = trucksContainerRef.current;
          if (scrollTop + clientHeight >= scrollHeight) {
            console.log('Низ блока достигнут');
            setPage(prevPage => prevPage + 1); // Увеличение значения page на 1
          }
        };
    
        const fetchData = async () => {
          try {
            const response = await truckServices.getTrucks(user.admin_id, page);
            if (page === 1) {
              setTrucks(response.data.data);
              setOriginalTrucksData(response.data.data)
            } else {
              setTrucks(prevTrucks => [...prevTrucks, ...response.data.data]);
              setOriginalTrucksData(prevTrucks => [...prevTrucks, ...response.data.data]);
              setTotal(response.data.totalPages)

            }
            console.log(response.data.data);
          } catch (error) {
            console.log(error);
          } 
        };
    
        if (trucksContainerRef.current) {
          trucksContainerRef.current.addEventListener('scroll', handleScroll);
        }
    
        fetchData();

    
        return () => {
          if (trucksContainerRef.current) {
            trucksContainerRef.current.removeEventListener('scroll', handleScroll);
          }
        };

      }, [decode, page]);

    const sortedData = trucks?.slice().sort((a, b) => a.id - b.id);

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
                        <input placeholder="пошук" type="text" className="search"/>
                        <div className="filter_con">
                            <img src="./img/filter.svg" alt="" />
                        </div>
                    </div>
                    <div className="control_con">
                        <div id="favorite_con" onClick={onFavorite}  className="favorite_con">
                            <img id="fav_control" className="fav_control" src="./img/favorite.svg" alt="" />
                            <img  src="./img/fav_active.svg" alt="" />

                        </div>
                        <div className="add_con">
                            <img src="./img/add.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="trucks_con" ref={trucksContainerRef}>
                    {sortedData && sortedData.length > 0 ? (
                        sortedData.map((truck, index) => (
                        <TruckCard key={index} fetchData={fetchData} data={truck} index={index} />
                        ))
                    ) : (
                        <p>No trucks available</p>
                    )}
                </div>
            </div>
        </div>
    )
}