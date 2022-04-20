// person 
import { styled } from "../styles/stitches.config";

import { useRecoilState, useRecoilValue } from "recoil";
import { hospitalData, selected, sidebar } from "../store/data";
import { Suspense } from "react";

const CancelButton = styled('button', {
  position: 'absolute', 
  right: '250px', 
  top: "10px", 
  border: 'none', 
  padding: '10px', 
  cursor: 'pointer', 
  backgroundColor: '$gray1',
  '&:hover': {
    backgroundColor: '$gray2'
  }
})


const SidebarContainer = styled('div', {
    width: "250px",
zIndex: '99999999', 
  height: "calc(100vh )",
  position: "absolute",
  borderRight:'1px solid rgba(255,255,255,0.5)', 
  top: "calc(50px + 2px)",
  right:" -300px",
  transform: "translateX(0)" ,
  transition: '.3s ease all',
  backgroundColor: "$gray2",
  alignContent:'center', 
  alignItems:'center', 
  textAlign:'center', 
  variants: {
      open: {
          true: {
            transform: "translateX(-300px)",
          }, 
          false: {
            transform: "translateX(0)",
          }
      },
    
  }
})

const HospitalView = ({data}) => {
  return (
    <div>
      <h3>{data.attributes?.name}</h3>
      <p>Capacity:  {data.attributes?.capacity}</p>
      <p>Filled:  {data.attributes?.filled}</p>

    </div>
  )
}
const PersonView = ({data, hospital}) => {

  


  const link =`https://maps.google.com/?ll=` + data.attributes?.latitude + ',' + data.attributes?.longitude 
 
  return (
    <div style={{display: 'flex', 'flexDirection': 'column'}}>
      <h3>{data.attributes?.name}</h3>
      <p>{data.attributes?.email}</p>
      <p> Infected : { data.attributes?.is_infected ? 'yes' : 'no'}</p>
      <a target="_blank"  rel="noreferrer" href={link}>View on google maps</a>

      <form style={{display: 'flex', flexDirection:'column', padding:'10px'}}>
        <select>
          {/* {
            hospital && 
            hospital.map((el) => {
return (
  <option key={el.name} value={el.v_id}>{el.name}</option>
)
            })
          } */}
          <option>Deen Dayal </option>
        </select>
        <input placeholder="health Status"/>
        <input placeholder="symptoms indicate"/>
        <input type="submit"/>

      </form>


    </div>
  )
}


const Sidebar = () => {
  
  const [state, setState] = useRecoilState(sidebar)

  const data  = useRecoilValue(selected);



    
    return (
      

        <SidebarContainer open={state ? "true": "false"}>
            <CancelButton onClick={() => setState(false)}  >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </CancelButton>

            <Suspense fallback={<p>Loading</p>}>

            {data.v_type === "hospital" ? <HospitalView data={data}/> : <PersonView data={data}  /> }

            </Suspense>

           

        </SidebarContainer>


    )
}
export default Sidebar;