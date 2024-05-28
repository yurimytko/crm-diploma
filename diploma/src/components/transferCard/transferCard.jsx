import React from "react";

import "./dist/transferCard.css"

export function TransferCard({transfer}){

    const isoDate = transfer.dispatch_time
    const date = new Date(isoDate);

    const options = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    };

const formattedDate = date.toLocaleDateString('uk-UA', options);
console.log(formattedDate);



    return(
        <div className="trnsf_card">
            <div className="card_top">
                <img className="transfer_img" src={`http://localhost:8000/${transfer.driver.picture}`} alt="" />
                <div className="transfer_driver_name">{transfer.driver.name} {transfer.driver.surname}</div>
                <div className="transfer_status">В рейсі</div>
                <div className="transfer_driver_phone">{transfer.driver.phone}</div>
            </div>
            <div className="card_bottomn">
                <p>Час відправлення: <span className="formatted_date">{formattedDate}</span></p>
                <div className="car_client_info">
                    <div className="t_truck_info">
                        <p className="i_heading">Інформація про вантажівку</p>
                        <p>Модель: <span className="formatted_date">{transfer.truck.model}</span></p>
                        <p>Марка: <span className="formatted_date">{transfer.truck.brand}</span></p>
                        <p>Номера: <span className="formatted_date">{transfer.truck.license}</span></p>
                        <p>Вантаж: <span className="formatted_date">{transfer.cargo}({transfer.cargo_weight})</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}