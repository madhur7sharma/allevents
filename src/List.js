import { useEffect, useState } from 'react'
import axios from "axios";
import classes from './ListView.module.css'

export default function List({url}) {

    
    const [productData, setProductData] = useState(null)

    const urlAll = `${url}`

    useEffect(() => {
        if(urlAll !== '')
        {
            axios.get(urlAll)
                .then(response => {
                    setProductData(response.data)
                })
        }
    }, [urlAll])

    const [eventName, setEventName] = useState('')
    

    return (
        <>
            <div className={classes.mainDiv}>
                {
                    productData && eventName === '' ?
                    productData.item.map((item,pos)=>{
                        return(
                            <div className="flex flex-col sm:flex-row items-center justify-evenly w-full min-h-24 bg-blue-100 rounded-2xl overflow-hidden p-4" key={item.event_id}>
                                <div className="px-2 text-center text-lg">
                                    <h3>{item.eventname_raw}</h3>
                                </div> 
                                <div className="px-2 text-center text-lg mt-2 sm:mt-0 font-bold">
                                    <h3>{item.label}</h3>
                                </div> 
                                <div className="px-2 text-center mt-2 sm:mt-0 text-lg">
                                    <h3>{item.venue.city}, {item.venue.state}</h3>
                                </div>
                                <div>
                                    <button onClick={()=>setEventName(item.eventname_raw)} className="mt-2 sm:mt-0 bg-blue-500 text-white font-bold py-2 px-16 rounded shadow border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Details</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    productData && eventName !== '' ?
                    <>
                        {
                            productData.item.map((item) => {
                                if(item.eventname_raw === eventName)
                                {
                                    return(
                                        <div key={item.event_id} className="flex flex-col text-center rounded-lg shadow border-solid border-2 border-blue-200 mx-10 my-10 p-10 mt-56 items-center">
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
                    :
                    null
                }
            </div>
        </>
    )
}



