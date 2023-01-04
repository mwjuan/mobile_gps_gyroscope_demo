import './App.css';
import MapComponent from './MapContainer';
import BMapComponent from './BMapComponent';
import TLYComponent from './TLYComponent';
import { Tabs } from 'antd';

function App() {
  return (
    <div className="App">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `陀螺仪`,
            key: '1',
            children: <TLYComponent></TLYComponent> 
          },
          {
            label: `高德地图`,
            key: '2',
            children: <MapComponent></MapComponent>
          },
          {
            label: `百度地图`,
            key: '3',
            children: <BMapComponent></BMapComponent> 
          }
        ]}
      />
    </div>
  );
}

export default App;
