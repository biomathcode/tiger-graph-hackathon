import './App.css';
import Map from './components/Map';
import Navbar from './components/Navbar';
import { styled } from './styles/stitches.config';
import Helmet from 'react-helmet';

import { Suspense } from 'react';


const MapContainer = styled('div', {
  padding: '30px',
  marginTop:'20px', 
  width: 'calc(100vw - 60px)', 
  height:'calc(100vh - 200px)', 
  overflow:'hidden', 
})


function App() {
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Health System CheckBoard</title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    <div className="App">
      <Navbar/>
      <MapContainer >
        <Suspense fallback={<p>Loading...</p>}>
        <Map/>

        </Suspense>
      </MapContainer>
    
      

    </div>
    </>

  );
}

export default App;
