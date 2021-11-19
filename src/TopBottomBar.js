import classes from './All.module.css'
import { useEffect } from 'react'

export default function TopBottomBar({listView, setListView}) {

    useEffect(() => {
        if(listView)
        {
          localStorage.setItem('listView',true)
        }
        else
        {
            localStorage.setItem('listView',false)
        }
      })


    return (
        <div className={classes.topBottomBar}>
            {
                listView ?
                <span className={classes.menuItems}><button onClick={()=>setListView(false)}>Grid View</button></span>
                :
                <span className={classes.menuItemsTrue}><button onClick={()=>setListView(false)}>Grid View</button></span>
            }
            {
                listView ?
                <span className={classes.menuItemsTrue}><button onClick={()=>setListView(true)}>List View</button></span>
                :
                <span className={classes.menuItems}><button onClick={()=>setListView(true)}>List View</button></span>
            }
        </div>
    )
}
