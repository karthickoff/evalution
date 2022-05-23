import React, { useEffect, useState } from 'react'
import Header from '../layout/header';
import axios from 'axios';
import upArrow from "../assets/uparrow.png";
import downArrow from "../assets/downarrow.png";
import "../styles/product.css";

export default function Product() {
    const [data, Setdata] = useState([]);
    const [sorttype, setSorttype] = useState('asc');
    const [sortcol, setSortcol] = useState('name');
    const finalList = [];
    var sorted = [];
    useEffect(() => {
        axios.get(` https://hplussport.com/api/products/order/price/sorc/qty/100`)
            .then(res => {
                const info = res.data;
                Setdata(info);

            })
    }, [])
    const handleSort = (e, col) => {
        // alert("change  to "+e+" "+col); 
        setSorttype(e)
        setSortcol(col)

    }
    const sortedData = data.sort((a, b) => {
        const isReversed = (sorttype === 'asc') ? 1 : -1;
        if (sortcol === "name") {
            return isReversed * (a.name.localeCompare(b.name))

        }
        else if (sortcol === "id") {
            return isReversed * (a.id.localeCompare(b.id))

        }
        else if (sortcol === "price") {
            return isReversed * (a.price.localeCompare(b.price))

        }
        else {
            return isReversed * (a.description.localeCompare(b.description))

        }

    })
    console.log("------------sorted Data-----------", sortedData);

    if (data) {

        for (var i = 0; i < data.length; i++) {
            finalList.push(
                <tr key={data[i].id}>
                    <td>{data[i].id}</td>
                    <td>{data[i].name}</td>
                    <td>{data[i].description}</td>
                    <td>{data[i].price}</td>


                </tr>
            )

        }
    }





    return (
        <div>
            <Header />
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Id {sorttype === 'asc' && sortcol === "id" ? <img className='arrows' src={downArrow} onClick={(e) => handleSort('desc', 'id')} /> : <img className='arrows' src={upArrow} onClick={(e) => handleSort('asc', 'id')} />}</th>
                            <th scope="col">Name{sorttype === "asc" && sortcol === "name" ? <img src={downArrow} onClick={(e) => handleSort('desc', 'name')} /> : <img src={upArrow} onClick={(e) => handleSort('asc', 'name')} />}</th>
                            <th scope="col">Description{sorttype === "asc" && sortcol === "description" ? <img src={downArrow} onClick={(e) => handleSort('desc', 'description')} /> : <img src={upArrow} onClick={(e) => handleSort('asc', 'description')} />}</th>
                            <th scope="col">price{sorttype === "asc" && sortcol === "price" ? <img src={downArrow} onClick={(e) => handleSort('desc', 'price')} /> : <img src={upArrow} onClick={(e) => handleSort('asc', 'price')} />}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {finalList}


                    </tbody>
                </table>
            </div>

        </div>
    )
}
