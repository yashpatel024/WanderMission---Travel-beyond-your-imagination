import React, { useEffect, useState } from "react";
import { GetImageURLbyID } from "./getImageURLbyID";

export function GetCartData() {

    const [items, setItems] = useState([])
    const link = '/wandermission/user/cart/get';

    useEffect(() => {
        fetch(link)
            .then((Response) => Response.json())
            .then((service) => {
                const data = JSON.parse(JSON.stringify(service))
                setItems(data)
            });
    });

    return (
        items.map((value) => (
            value.services
        ))

    );

}

