import './App.css';
import Navbar from './components/Navbar';
import NearestRides from './pages/NearestRides';
import PastRides from './pages/PastRides';
import UpcomingRides from './pages/UpcomingRides';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Headers';
import { useState, useEffect, useCallback } from 'react';

function App() {

  //ALL STATES FOR NearestRides, UpcomingRides, PastRides;
  const [auxNearRide, setAuxNearRide] = useState([]);
  const [auxPastRide, setAuxPastRide] = useState([]);
  const [auxUpcomingRide, setAuxUpcomingRide] = useState([]);
  const [nearestRides, setNearestRides] = useState([]);
  const [userData, setUserData] = useState({});
  const [pastRides, setPastRides] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [loc, setLoc] = useState([]);
  const [gotUserDetails, setGotUserDetails] = useState(false);

//Function for API fetch Of UserDetails
  const getUserDetails = useCallback(async () => {
    const response = await fetch("https://assessment.api.vweb.app/user");
    const Userdata = await response.json();
    setUserData(Userdata);
    setGotUserDetails(true)
  }, [])

  //useEffect to trigger the getUserDetails Function onloading
  useEffect(() => {
    getUserDetails()
  }, [getUserDetails]);

  let upcoming = [], past = [], location = [];
  //Function for API fetch Of RidesDetails
  const getRidesDetails = async () => {
    const response = await fetch("https://assessment.api.vweb.app/rides");
    const rideData = await response.json();
    const nearRide = rideData.map((e) => {
      const arr = [...e.station_path];
      let Distance = closestDiffs(arr, arr.length - 1, userData.station_code);
      return { ...e, Distance: Distance }
    })

    //Function to find the Distance of the station path array from the user station_code using nlogn time complexity
    function closestDiffs(arr, lastIndex, stationCode) {
      let firstIndex = 0;
      let closestElement;
      while (firstIndex < lastIndex) {
        const mid = Math.floor((firstIndex + lastIndex) / 2);
        const elementDiff = arr[mid] - stationCode;
        if (elementDiff >= 0) {
          closestElement = arr[mid];
          lastIndex = mid;
        } else if (elementDiff < 0) {
          firstIndex = mid + 1;
        }
      }
      return closestElement - stationCode;
    }

    // sorting the ridesDetails array in asending order of the distance
    nearRide.sort((a, b) => a.Distance - b.Distance);
    
    //Comparing the ride date with the current date to create data array for upcoming and past rides ,
    // also creating location array which stores all the rides locationi.e.(state and city)
    const currDate = new Date();
    for (let i = 0; i < nearRide.length; i++) {
      const RideDate = new Date(nearRide[i].date)
      const locObj = { state: nearRide[i].state, city: nearRide[i].city };
      location.push(locObj);
      console.log(RideDate);
      if (currDate > RideDate) {
        past.push(nearRide[i]);
      } else {
        upcoming.push(nearRide[i]);
      }
    }
    setLoc(location);
    setUpcomingRides(upcoming);
    setAuxUpcomingRide(upcoming);
    setAuxPastRide(past);
    setPastRides(past);
    setAuxNearRide(nearRide);
    setNearestRides(nearRide);
  }

//useEffect to trigger the getRidesDetails function once we getUserDetails
  useEffect(() => {
    if (gotUserDetails) {
      getRidesDetails()
    }
  }, [gotUserDetails]);
//filtering function based on state or city
  const filterStateHandler = (filter, type) => {
    setNearestRides(auxNearRide)
    setPastRides(auxPastRide)
    setUpcomingRides(auxUpcomingRide)
    if (filter != 'All_state' && type == 'State') {
      setNearestRides((prevNearestRides => {
        return (prevNearestRides.filter((rides) => rides.state == filter));
      }))
      setPastRides((prevPastRides => {
        return (prevPastRides.filter((rides) => rides.state == filter));
      }))
      setUpcomingRides((prevUpcomingRides => {
        return (prevUpcomingRides.filter((rides) => rides.state == filter));
      }))
    } else if (filter != 'All_city' && type == 'City') {
      setNearestRides((prevNearestRides => {
        return (prevNearestRides.filter((rides) => rides.city == filter));
      }))
      setPastRides((prevPastRides => {
        return (prevPastRides.filter((rides) => rides.city == filter));
      }))
      setUpcomingRides((prevUpcomingRides => {
        return (prevUpcomingRides.filter((rides) => rides.city == filter));
      }))
    } else {
      setNearestRides(auxNearRide)
      setPastRides(auxPastRide)
      setUpcomingRides(auxUpcomingRide)
    }
  }

  return (
    <div className="App">
      <Navbar name={userData.name} imageurl={userData.url} />
      <Header onFilterState={filterStateHandler} location={loc} pastLength={pastRides.length} upcomingLength={upcomingRides.length} nearestLength={nearestRides.length} />
      <Routes>
        <Route path="/" element={<NearestRides nearestRidesData={nearestRides} />} />
        <Route path="/UpcomingRides" element={<UpcomingRides upcomingRides={upcomingRides} />} />
        <Route path="/PastRides" element={<PastRides pastRides={pastRides} />} />
      </Routes>
    </div>
  );
}

export default App;
