# Live Demo
deployed-Link:
https://edvoraridesapp-e8sbs4aa0-kaustub1234.vercel.app/

https://user-images.githubusercontent.com/56251255/158033462-3effb154-3a48-49c1-931a-b0d60950188b.mp4


# RideApp 
This application was an internship task by edvora company the problem statement
is described as follows:
api url: https://assessment.api.vweb.app/rides

Ride: [
  {
    id: 001,
    origin_station_code: 23,
    station_path: [23, 42, 45, 48, 56, 60, 77, 81, 93],
    destination_station_code: 93,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
  {
    id: 002,
    origin_station_code: 20,
    station_path: [20, 39, 40, 42, 54, 63, 72, 88, 98],
    destination_station_code: 98,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
  {
    id: 003,
    origin_station_code: 13,
    station_path: [13, 25, 41, 48, 59, 64, 75, 81, 91],
    destination_station_code: 91,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
]

https://assessment.api.vweb.app/user
user:  {
    station_code: 40,
    name: "Dhruv Singh",
    profile_key: “url”,
 }
Nearest ride: A nearest ride is a ride that includes your station code or a number closest to your station code in the station_path array.For example, your station code is 40. So any ride that has your station code as nearest number in station_path array.

That would be  id 002 the most nearest as it has your station code 40 in the station_path array. 
Then id 003 has 41 from station_path array is nearest to your station code 40. 

Then id 001 has 42 from station_path array nearest to your station code 40. Hence it would be 002 > 003 > 001.
Please note: You cannot use the same ride twice

Distance : Nearest station for your ride is your station code. 
Example:For id 002, your station code is 40 and your ride also stops at your station so 
the distance is 40-40 = 0for id 001, your station code is 40 and your ride stops at station 42, so the distance is 42-40 = 2

Upcoming ride: It shows all rides which has date in future. 
Past ride: It shows all rides which has date in past. Filters
Every ride has state and city. You need to get state and city from every ride object and create a list of state & city for the filters dropdown. 
State : It shows rides from that state only. City: It shows rides from selected city only. If a state is already selected then the city dropdown will have cities from selected state only. 

# Feature
- Nearest Rides
- Upcoming Rides
- Past Rides

## Installation

after navigating to the project directory first install all the node modules:

```bash
 npm install 

```
    
## Starting the app

All commands to start and debug the app are outlined in the package.json file. To simply get it running run the following command while in your project repository.

```bash
 npm start

```

## for installation of live server

```bash
npm install -g live-server
npm live-server
```

