import React, {useState, useEffect, useRef} from "react";
import { NavBar } from "../../components/NavBar/navBar";

import truckServices from "../../service/truckService";

import "./dist/trucks.css"
import { TruckCard } from "../../components/truckCard/card";
import { TrucksAdd } from "../../components/trucksAdd/truckAdd";
import { Preloader } from "../../components/preloader/preloader";

export function TrucksPage({decode}){


    const user = decode;
    const [trucks, setTrucks] = useState(null);
    const [originalTrucksData, setOriginalTrucksData] = useState([null]);
    const [fav,setFav] = useState(false);
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState()
    const trucksContainerRef = useRef(null);

  
    const fetchData = async () => {
        try {
          const response = await truckServices.getTrucks(user.admin_id, page);

          setTrucks(response.data.data);
          setOriginalTrucksData(response.data.data);
          console.log(response.data)
          setTotalPages(response.data.totalPages)
          return response.data
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
        const fetchDataOnScroll = async () => {
            try {
                const response = await truckServices.getTrucks(user.admin_id, page);
                if (Array.isArray(response.data.data)) {
                    setTrucks(prevTrucks => [...prevTrucks, ...response.data.data]); // добавляем данные к существующим данным
                    setOriginalTrucksData(prevOriginalTrucksData => [...prevOriginalTrucksData, ...response.data.data]);
                    console.log(trucks)
                } else {
                    console.error("response.data.data is not an array");
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        if (page > 1) { // если страница больше 1, это значит, что произошла прокрутка и нужно загрузить новые данные
            fetchDataOnScroll();
        }
        if(page ===1){
          fetchData()
        }
    }, [page]);



      useEffect(() => {

        fetchData()
        // handleScroll()
        // const handleScroll = () => {
        //   const { scrollTop, clientHeight, scrollHeight } = trucksContainerRef.current;
        //   if (scrollTop + clientHeight >= scrollHeight && page < totalPages) {
        //     console.log('Низ блока достигнут');
        //     setPage(prevPage => prevPage + 1); // Увеличение значения page на 1
        //   }
        // };
      
        // const fetchData = async () => {
        //   try {
        //     if (page <= totalPages) {
        //       const response = await truckServices.getTrucks(user.admin_id, page);
        //       if (page === 1) {
        //         setTrucks(response.data.data);
        //         setOriginalTrucksData(response.data.data);
        //         setTotalPages(response.data.totalPages);
        //         console.log(response.data);
        //       } else {
        //         setTrucks(prevTrucks => [...prevTrucks, ...response.data.data]);
        //         setOriginalTrucksData(prevTrucks => [...prevTrucks, ...response.data.data]);
        //       }
        //       console.log(response.data.data);
        //     }
        //   } catch (error) {
        //     console.log(error);
        //   } 
        // };
      
        // if (trucksContainerRef.current) {
        //   trucksContainerRef.current.addEventListener('scroll', handleScroll);
        // }
      
        // fetchData();
      
        // return () => {
        //   if (trucksContainerRef.current) {
        //     trucksContainerRef.current.removeEventListener('scroll', handleScroll);
        //   }
        // };
      }, [decode]);


      const openTruckAdd = () => {
        const trucksAddElement = document.getElementById('trucks_add');

        trucksAddElement.style.display = 'flex';
          
        setTimeout(() => {
          trucksAddElement.style.opacity = '1';
          document.getElementById("add_menu_truck").style.transform = "scale(1)"

            
        }, 100);
    



      

      };

    const sortedData = trucks?.sort((a, b) => a.id - b.id);

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
                {!sortedData ? (
                    <Preloader/>
                ) : sortedData.length > 0 ? (
                    sortedData.map((truck, index) => (
                        <TruckCard key={index} fetchData={fetchData} data={truck} index={index} />
                    ))
                ) : (
                    <p>No trucks available</p>
                )}
                </div>
            </div>

            <div id="trucks_add" className="black_block">
              <TrucksAdd decode = {decode} fetchData ={fetchData}/>
            </div>
        </div>
    )
}