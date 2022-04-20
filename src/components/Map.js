import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useState, useEffect} from 'react';
import { useMapEvents } from 'react-leaflet';
import { useRecoilState } from 'recoil';
import {selected, sidebar } from '../store/data';
import L from 'leaflet';
import Person from '../asserts/personOutline.png';

import Hospital from '../asserts/hospital.png';





const DefaultLocation = {lat: 28.5934, lng: 77.2223}

function LocationMarker() {
    const [position, setPosition] = useState(DefaultLocation)
    


    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }

const Map = () => {

  const [persons, setPersons] = useState([]);

  const [hospitals, setHospitals] = useState([]);

  const [select, setSelect] = useRecoilState(selected);

  const [side, setSide] = useRecoilState(sidebar)

  
  const hospitalIcon = new L.Icon({
    iconUrl:Hospital,
    iconRetinaUrl: Hospital ,
    iconSize: [48,48 ],
    shadowSize: [48, 48],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })



  const carIcon = new L.Icon({
    iconUrl:Person,
    iconRetinaUrl: Person ,
    iconSize: [30,30 ],
    shadowSize: [48, 48],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })



  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/persons', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => res.json())

      const resHospitals = await fetch('http://127.0.0.1:8000/hospitals', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => res.json())
      setHospitals(resHospitals)
      setPersons(response)
    }
    fetchData()
  },[])

  
    return (
        <MapContainer center={DefaultLocation} zoom={13} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {persons && 
  persons.map((person)=> {
    return (
      <Marker icon={carIcon} 
      eventHandlers={{click:() => {
        setSelect(person)
        setSide(true)
       } }} 
      
      key={person.v_id} position={[person.attributes.latitude, person.attributes.longitude]}>
        <Popup>
          <div>{person.attributes.name}</div>
          <div>{person.attributes.email}</div>
         
        </Popup>
      </Marker>
    )
  })
  }
  
  {hospitals && 
  hospitals.map((hospital)=> {
    return (
      <Marker eventHandlers={{click:() => {
        setSelect(hospital)
        setSide(true)
       } }}  icon={hospitalIcon}  key={hospital.v_id} position={[hospital.attributes.latitude, hospital.attributes.longitude]}>
        <Popup>
          <div>{hospital.attributes.name}</div>         
        </Popup>
      </Marker>
    )
  })
  }
  <LocationMarker/>

</MapContainer>
    )
}

export default Map;