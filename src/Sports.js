import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './All.module.css'
import { Spinner } from "react-bootstrap";

export default function Sports() {

    const urlALL = 'https://allevents.s3.amazonaws.com/tests/sports.json'
    const [product , setProduct] = useState(null)
    
    useEffect(() => {
        axios.get(urlALL)
            .then(response => {
                setProduct(response.data)
            })
    }, [urlALL])

    const [eventName, setEventName] = useState('')

    if(product)
    {
        const SportsEvents = product.item.map((item , pos) => {
            return(
                <>
                    <div className="flex flex-col flex-warp items-center w-72 h-96 bg-blue-100 rounded-2xl overflow-hidden" key={pos}>
                        <div className="p-2">
                            <img src={item.thumb_url} alt="event-banner" />
                        </div>
                        <div className="-mt-2 px-2 text-center font-bold">
                            <h3>{item.eventname_raw}</h3>
                        </div>
                        <div className="mt-2">
                            <button onClick={()=>setEventName(item.eventname_raw)} className="bg-blue-500 text-white font-bold py-2 px-16  rounded shadow border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Details</button>
                        </div>
                    </div>
                </>
            )
        })
        return (
            <>
                {
                    eventName == '' ?
                    <div className={classes.mainDiv}>
                        {SportsEvents}
                    </div>
                    :
                    <>
                        {
                            product.item.map((item,pos) => {
                                if(item.eventname_raw === eventName)
                                {
                                    return(
                                        <div key={pos} className="flex flex-col text-center rounded-lg shadow border-solid border-2 border-blue-200 mx-10 my-10 p-10 mt-56 items-center">
                                            <div>
                                                <img className="rounded-lg mb-5" src={item.banner_url} alt="Event Banner"/>
                                            </div>
                                            <p className="font-bold text-2xl mb-5">{item.eventname_raw}</p>
                                            <p className="text-lg mb-2">Event Start Time: &nbsp;{item.start_time_display}</p>
                                            <p className="text-lg mb-2">Event End Time: &nbsp;{item.end_time_display}</p>
                                            <p className="font-bold mt-2 text-lg">Location</p>
                                            <p className="text-lg mb-2">{item.location}</p>
                                            <p className="font-bold text-lg mt-2">Venue</p>
                                            <p className="text-lg mb-2">City: {item.venue.city}</p>
                                            <p className="text-lg mb-2">State: {item.venue.state}</p>
                                            <p className="text-lg mb-2">Country: {item.venue.country}</p>
                                            <button className="mt-5 bg-blue-500 text-white font-bold py-2 px-16 rounded shadow border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"><a target="_blank" rel="noopener noreferrer" href={item.tickets.ticket_url}>Book Tickets</a></button>
                                            <button className="mt-5 bg-blue-500 text-white font-bold py-2 px-16 rounded shadow border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300" onClick={()=>setEventName('')}>Hide Details</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    </>
                }
            </>
        )
    }
    return(
        <div className="flex flex-col items-center">
            <p className="mt-64 mx-auto font-bold uppercase text-xl">Loading Events Please Wait...</p>
            <Spinner className="mt-4 mx-auto" animation="border" variant="dark" />
        </div>
    )
    
}