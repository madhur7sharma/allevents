import classes from './All.module.css'
import { useEffect } from 'react'

export default function TopBar({allEvents, setAllEvents, music, setMusic, business, setBusiness, sports, setSports, workshop, setWorkshop,}) {

    const AllEvents = () => {
        setAllEvents(true)
        setMusic(false)
        setBusiness(false)
        setSports(false)
        setWorkshop(false)
    }
    const Music = () => {
        setAllEvents(false)
        setMusic(true)
        setBusiness(false)
        setSports(false)
        setWorkshop(false)
    }
    const Business = () => {
        setAllEvents(false)
        setMusic(false)
        setBusiness(true)
        setSports(false)
        setWorkshop(false)
    }
    const Sports = () => {
        setAllEvents(false)
        setMusic(false)
        setBusiness(false)
        setSports(true)
        setWorkshop(false)
    }
    const WorkShops = () => {
        setAllEvents(false)
        setMusic(false)
        setBusiness(false)
        setSports(false)
        setWorkshop(true)
    }

    const savedValue = JSON.parse(localStorage.getItem('allevents'))

    useEffect(() => {
        if(music)
        {
          localStorage.setItem('allevents',false)
          localStorage.setItem('music',true)
          localStorage.setItem('business',false)
          localStorage.setItem('sports',false)
          localStorage.setItem('workshop',false)
        }
        else if(business)
        {
          localStorage.setItem('allevents',false)
          localStorage.setItem('music',false)
          localStorage.setItem('business',true)
          localStorage.setItem('sports',false)
          localStorage.setItem('workshop',false)
        }
        else if(sports)
        {
          localStorage.setItem('allevents',false)
          localStorage.setItem('music',false)
          localStorage.setItem('business',false)
          localStorage.setItem('sports',true)
          localStorage.setItem('workshop',false)
        }
        else if(workshop)
        {
          localStorage.setItem('allevents',false)
          localStorage.setItem('music',false)
          localStorage.setItem('business',false)
          localStorage.setItem('sports',false)
          localStorage.setItem('workshop',true)
        }
        else if(!savedValue)   //for world
        {
          setAllEvents(true)
          localStorage.setItem('allevents',true)
          localStorage.setItem('music',false)
          localStorage.setItem('business',false)
          localStorage.setItem('sports',false)
          localStorage.setItem('workshop',false)
        }
      })
    

    return (
        <div className={classes.TopBarDiv}>
            {
                allEvents ? 
                <span onClick={AllEvents} className={classes.menuItemsTrue}>All Events</span>
                :
                <span onClick={AllEvents} className={classes.menuItems}>All Events</span>
            }
            {
                music ?
                <span onClick={Music} className={classes.menuItemsTrue}>Music</span>
                :
                <span onClick={Music} className={classes.menuItems}>Music</span>
            }
            {
                business ?
                <span onClick={Business} className={classes.menuItemsTrue}>Business</span>
                :
                <span onClick={Business} className={classes.menuItems}>Business</span>
            }
            {
                sports ?
                <span onClick={Sports} className={classes.menuItemsTrue}>Sports</span>
                :
                <span onClick={Sports} className={classes.menuItems}>Sports</span>
            }
            {
                workshop ?
                <span onClick={WorkShops} className={classes.menuItemsTrue}>WorkShops</span>
                :
                <span onClick={WorkShops} className={classes.menuItems}>WorkShops</span>
            }
            <div className="ml-auto hidden md:block">
                <img className="w-52" src="https://allevents.in/img/ae-logo-website.png" alt="logo"/>
            </div>
        </div>
    )
}
