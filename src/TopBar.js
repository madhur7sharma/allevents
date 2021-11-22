import classes from './All.module.css'
import { useEffect, useState } from 'react'
import axios from "axios";
import TopBottomBar from './TopBottomBar';
import List from './List';
import { Spinner } from "react-bootstrap";

export default function TopBar() {

    const categoryUrl = 'https://allevents.s3.amazonaws.com/tests/categories.json'
    const [product , setProduct] = useState(null)
    useEffect(() => {
        axios.get(categoryUrl)
            .then(response => {
                setProduct(response.data)
            })
    }, [categoryUrl])

    const [category, setCategory] = useState('')
    if(localStorage.getItem('url')=== undefined || localStorage.getItem('url')=== null || localStorage.getItem('url') === '')
    {
        localStorage.setItem('url','https://allevents.s3.amazonaws.com/tests/all.json')
    }

    const [url, setUrl] = useState(localStorage.getItem('url')) 

    useEffect(()=>{
        if(category)
        {
            product.map((item)=>{
                if(item.category === category)
                {
                    setUrl(item.data)
                }
            })
        }
    },[category])

    

    useEffect(()=>{
        if(category)
        {
            product.map((item)=>{
                if(item.category === category)
                {
                    if(url)
                    {
                        localStorage.setItem('url',item.data)
                    }
                }
            })
        }
    }) 

    
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

    const [listView, setListView] = useState(localStorage.getItem('listView')==='true')
    
    

    return (
        <>
            <div className={classes.topDiv}> 
                <div className={classes.TopBarDiv}>
                    {
                        product ?
                        product.map((item,pos) => {
                            return(
                                <>
                                    {
                                        url === item.data ?
                                        <span key={pos} onClick={()=>(setCategory(item.category),setEventName(''))} className={classes.menuItemsTrue}>{item.category}</span>
                                        :
                                        <span key={pos} onClick={()=>(setCategory(item.category),setEventName(''))} className={classes.menuItems}>{item.category}</span>
                                    }
                                </>
                            )
                        })
                        :
                        <div className="flex items-center">
                            <Spinner animation="border" variant="light" />
                            <p className="ml-4 text-lg uppercase">Loading categories...</p>
                        </div>
                    }
                    <div className="ml-auto hidden md:block">
                        <img className="w-52" src="https://allevents.in/img/ae-logo-website.png" alt="logo"/>
                    </div>
                </div>
                <div>
                    <TopBottomBar listView={listView} setListView={setListView}/>
                </div>
            </div>
            {
                !listView ?
                <div>
                    {
                        productData && eventName === '' ?
                        <div className={classes.mainDiv}>
                            {
                                productData.item.map((item,pos)=>{
                                    return(
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
                                    )
                                })
                            }
                        </div>
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
                        <div className="mt-48 flex flex-col items-center">
                            <Spinner animation="border" variant="dark" />
                            <p className="mt-4 text-xl uppercase">Loading Events...</p>
                        </div>
                    }
                </div>
                :
                <List url={url}/>
            }
        </>
    )
}



