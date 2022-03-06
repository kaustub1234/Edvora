import { React, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import { NavLink } from 'react-router-dom'
import './Header.css'

const Headers = (props) => {
  console.log(props.location);
  const Location = [...props.location];
  let state = [], city = [];
  //creating the seprate city and state array
  for (const i of Location) {
    state.push(i.state)
    city.push(i.city)
  }

  //creating array of distinct state and city
  const stateSets = [...new Set(state.sort())];
  const citySets = [...new Set(city.sort())];
  const [showFilter, setShowFilter] = useState(false);
  const filterClickHandler = () => {
    setShowFilter(prevFilter => !prevFilter)
  }
  const stateChangeHandler = (event) => {
    const selectedState = event.target.value;
    props.onFilterState(selectedState, 'State');
  }
  const cityChangeHandler = (event) => {
    const selectedCity = event.target.value;
    props.onFilterState(selectedCity, 'City');
  }
  return (
    <div className='nav'>
      <NavLink to='/' className={navData => navData.isActive ? 'active nav_nearest' : 'nav_nearest'}>Nearest rides({props.nearestLength})</NavLink>
      <NavLink to='/UpcomingRides' className={navData => navData.isActive ? 'active nav_upcoming' : 'nav_upcoming'}>Upcoming rides({props.upcomingLength})</NavLink>
      <NavLink to='/PastRides' className={navData => navData.isActive ? 'active nav_past' : 'nav_past'}>Past rides({props.pastLength})</NavLink>
      <button className='nav_FilterButton' onClick={filterClickHandler}><FilterListIcon></FilterListIcon>&nbsp;Filter</button>
      {showFilter && <div className={'nav_Filter'}>
        <select onChange={stateChangeHandler} name="State_filter" id="cars">
          <option value='All_state'>All_state</option>
          {stateSets.map((e,idx) => {
            return (
              <option key={idx} value={e}>{e}</option>
            )
          })}
        </select>
        <hr/>
        <select onChange={cityChangeHandler} name="City_filter" id="cars">
          <option value='All_city'>All_city</option>
          {citySets.map((e, idx) => {
            return (
              <option key={idx} value={e}>{e}</option>
            )
          })}
        </select>
      </div>}
    </div>
  ) 
}

export default Headers