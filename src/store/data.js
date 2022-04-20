import { atom } from "recoil";

export const selected = atom({
    key: 'selected', 
    default: "1"
})

export const sidebar = atom({
    key: 'sidebar', 
    default: false
})


export const fetchSelected = atom ({
    key: 'fetchSelected', 
    get: async ({get}) => {
        const response = await fetch({
            method:'POST',
            headers: "applicaiton/json", 
            body: JSON.stringify({id: get(selected)})
        })
        const data = response.json()

        return data
      },
})

export const personData = atom({
    key: 'personData', 
    get: async ({get}) => {
        const response = await fetch('http://127.0.0.1:8000/persons', {
            headers: {
                'Content-Type': 'application/json'
              },
        })
        const resData = await response.json()

        console.log(resData)
        
        return resData
    },
  
})

export const hospitalData = atom({
    key: 'hospitalData', 
    get: async ({get}) => {
        const response = await fetch('http://127.0.0.1:8000/hospitals', {
            headers: "application/json", 
        })
        const resData = await response.json();

        console.log(resData)

        return resData
    },
   
})

