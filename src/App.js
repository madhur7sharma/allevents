import { useState } from "react";
import All from "./All";
import Business from "./Business";
import ListAll from "./ListView/ListAll";
import ListMusic from "./ListView/ListMusic";
import ListBusiness from "./ListView/ListBusiness";
import ListSports from "./ListView/ListSports";
import ListWorkshop from "./ListView/ListWorkshop";
import Music from "./Music";
import Sports from "./Sports";
import TopBar from "./TopBar";
import TopBottomBar from "./TopBottomBar";
import Workshop from "./Workshop";
import classes from './All.module.css'

function App() {

  const [listView, setListView] = useState(localStorage.getItem('listView')==='true')

  const [allEvents, setAllEvents] = useState(localStorage.getItem('allevents')==='true')
  const [music, setMusic] = useState(localStorage.getItem('music')==='true')
  const [business, setBusiness] = useState(localStorage.getItem('business')==='true')
  const [sports, setSports] = useState(localStorage.getItem('sports')==='true')
  const [workshop, setWorkshop] = useState(localStorage.getItem('workshop')==='true')

  return (
    <>
      <div className={classes.topDiv}>
        <TopBar allEvents={allEvents} setAllEvents={setAllEvents} music={music} setMusic={setMusic} business={business} setBusiness={setBusiness} sports={sports} setSports={setSports} workshop={workshop} setWorkshop={setWorkshop}/>
        <TopBottomBar listView={listView} setListView={setListView}/>
      </div>
      {
        listView ?
        <>
          {
            allEvents ? 
            <ListAll/>
            : music ?
            <ListMusic/>
            : business ?
            <ListBusiness/>
            : sports ? 
            <ListSports/>
            : workshop ? 
            <ListWorkshop/>
            :
            null
          }
        </>
        :
        <>
          {
            allEvents ? 
            <All/>
            : music ?
            <Music/>
            : business ?
            <Business/>
            : sports ? 
            <Sports/>
            : workshop ? 
            <Workshop/>
            :
            null
          }
        </>
      }
      
    </>
  );
}

export default App;
