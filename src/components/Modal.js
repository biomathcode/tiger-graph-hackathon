import { styled } from "@stitches/react";

import * as Dialog from "@radix-ui/react-alert-dialog";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGeolocation from 'react-hook-geolocation';
import MapPicker from 'react-google-map-picker';


const Overlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "99999999",
});

const Trigger = styled(Dialog.Trigger, {
  padding: "5px 10px 5px 10px",
  width: "200px",
  height: "fit-content",
  maxHeight: "fit-content",
  backgroundColor: "$gray3",
  outline: "none",
  border: "none",
  cursor: "pointer",
  marginRight: "25px",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "$gray6",
  },

  "& svg": {
    display: "inline-block",
    verticalAlign: "bottom",
    height: "13px",
    marginLeft: "5px",
    marginRight: "5px",
  },
});

const Content = styled(Dialog.Content, {
  minWidth: 300,
  width: 500, 
  maxWidth: 700,
  background: "white",
  padding: 30,
  borderRadius: 4,
});


const DefaultLocation = {lat: 28.5934, lng: 77.2223}

const DefaultZoom = 10;

const HospitalForm = ({geo,  setData, handleOpen}) => {
  const { register, handleSubmit } = useForm();


  const [location, setLocation] = useState({lat: geo?  Number(geo.lat): DefaultLocation.lat, lng: geo ? Number(geo.lng): DefaultLocation.lng});
  const [zoom, setZoom] = useState(DefaultZoom);
  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }



    const onSubmit = async (data, e) => {
      setData(data)
  
      const newdata = {
        name: data.name, 
        filled: Number(data.filled),
        capacity: Number(data.capacity),
        longitude: Number(location.lng), 
        latitude: Number(location.lng), 
      }
  
      const response = await fetch("http://127.0.0.1:8000/hospitals ", {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newdata)  ,
        method: "POST",
      }).then((e) => e.json()).catch((e) => console.log(e))
  
      console.log(response)
    };


    const onError = (errors, e) => {
      console.log(errors);
    };

    return (
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="subfield">
          <label htmlFor="name">Name</label>
          <input {...register("name")} placeholder="Full Name" />
        </div>

        <div className="subfield">
          <label htmlFor="capacity">Capacity</label>
          <input {...register("capacity")} placeholder="capacity" />
        </div>

        <div className="subfield">
          <label htmlFor="filled">Filled</label>
          <input {...register("filled")} placeholder="filled beds" />
        </div>

        <label>Latitute:</label><input type='text'  {...register("latitude")}   value={location.lat} disabled/>
      <label>Longitute:</label><input type='text' {...register('longitude')} value={location.lng} disabled/>
  
      <MapPicker
    
    defaultLocation={location}
      zoom={zoom}
      mapTypeId="roadmap"
      style={{height:'400px',margin: '10px' }}
      onChangeLocation={handleChangeLocation} 
      onChangeZoom={handleChangeZoom}
      apiKey='AIzaSyAEyyvAWTHCsqXiqNtzqIFTyXTRQexcxsE'/>
        <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>

        <input type="submit" />
        <button onClick={handleOpen}>cancel</button>

        </div>
       
      </form>
    );
  };

const PersonForm = ({geo, setData, handleOpen}) => {
    const { register, handleSubmit } = useForm();


    console.log(geo)
  
  
  const [location, setLocation] = useState({lat: geo?  Number(geo.lat): DefaultLocation.lat, lng: geo ? Number(geo.lng): DefaultLocation.lng});
      const [zoom, setZoom] = useState(DefaultZoom);
      function handleChangeLocation (lat, lng){
        setLocation({lat:lat, lng:lng});
      }
      
      function handleChangeZoom (newZoom){
        setZoom(newZoom);
      }
  
      const onSubmit = async (data, e) => {
        console.log(data)
        setData(data)
        const newdata = {
          name: data.name, 
          email: data.email, 
          age: Number(data.age), 
          longitude: Number(location.lng), 
          latitude: Number(location.lat), 
          is_infected: data.is_infected === "true"
        }
        const response = await fetch("http://127.0.0.1:8000/persons ", {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newdata)  ,
          method: "POST",
        }).then((e) => e.json()).catch((e) => console.log(e))
    
        console.log(response)
      };
      const onError = (errors, e) => {
        console.log(errors);
      };
      return (
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="subfield">
            <label htmlFor="name">Name</label>
            <input {...register("name")} placeholder="Full Name" />
          </div>
          <div className="subfield">
            <label htmlFor="age">Age</label>
            <input {...register("age")} type="number" placeholder="age" />
          </div>
          <div className="subfield">
            <label htmlFor="email">Email</label>
            <input {...register("email")} placeholder="email" />
          </div>
  
          <div className="subfield">
            <label>Infected</label>
            <select {...register("is_infected")} >
              <option label="yes" value="true" />
              <option label="no" value="false" />
            </select>
          </div>
  
          <label>Latitute:</label><input type='text'  {...register("latitude")}   value={location.lat} disabled/>
      <label>Longitute:</label><input type='text' {...register('longitude')} value={location.lng} disabled/>
  
      <MapPicker
    
    defaultLocation={location}
      zoom={zoom}
      mapTypeId="roadmap"
      style={{height:'400px',margin: '10px' }}
      onChangeLocation={handleChangeLocation} 
      onChangeZoom={handleChangeZoom}
      apiKey='AIzaSyAEyyvAWTHCsqXiqNtzqIFTyXTRQexcxsE'/>
      
    
          <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-around'}}>
  
          <input type="submit" />
          <button onClick={handleOpen}>cancel</button>
  
          </div>
        </form>
      );
    };



export default function Modal({ open, setOpen, type, label }) {
  const [data, setData] = useState({});

  const [geo, setGeo] = useState(null)
  
  const geolocation = useGeolocation()


  useEffect(() => {
    setGeo({lat: geolocation.latitude, lng: geolocation.longitude })
  },[])
  

  function handleOpen() {
    setOpen(!open);
  }


  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Trigger>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        {label}
      </Trigger>

      <Dialog.Portal>
        <Overlay>
          {!geolocation.error && 
           <Content>
           {type === "person" && <PersonForm geo={geo} setData={setData} handleOpen={handleOpen} />}
           
           {type === "hospital" && <HospitalForm geo={geo} setData={setData} handleOpen={handleOpen}/>}
         </Content>
          }
         
        </Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
