import React, { useEffect, useState } from "react";
import "./dist/dashBoard.css";
import { NavBar } from "../../components/NavBar/navBar";
import truckServices from "../../service/truckService";
import { TruckDashCard } from "../../components/dashTruck/card";
import { Preloader } from "../../components/preloader/preloader";
import { Chart } from "../../components/Chart/chatr";


export function DashBoard({ decode }) {
  const user = decode;
  const [trucks, setTrucks] = useState(null);

  const fetchData = async () => {
    try {
      const response = await truckServices.getTrucks(user.admin_id,1);
      setTrucks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

  }, [decode]);

  return (
    <div className="dash_board_space">
      <NavBar />
      <div className="dash_board">
        <div className="dash_header">
          <p className="page_heading">Головна панель</p>
          <div className="profile">
            <div className="profile_left">
              <p className="name">
                {user?.name} {user?.surname}
              </p>
              <p className="role_user">{user?.role}</p>
            </div>
            <div className="profile_right">
              <img
                className="profile_img"
                src={`http://localhost:8000/${user?.picture}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="work_space">
          <div className="graph">
            <Chart/>
          </div>
          <div className="sub_menu">
            <div className="truck_menu">
              {trucks && trucks.length > 0 ? (
                trucks.map((truck) => (
                  <TruckDashCard key={truck.id} truck={truck} />
                ))
              ) : (
                <Preloader/>
              )}
            </div>
            <div className="notification_menu"></div>
            <div className="last_menu"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
