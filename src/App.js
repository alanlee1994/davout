import React , {useEffect, useState} from 'react';
import './App.css';
import DataTable from './components/DataTable';
import DataStatistics from './components/DataStatistics';
import Navbar from './components/Navbar';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [priceData, setPriceData] = useState([{}]);
  useEffect(()=>{
    let interval = setInterval(() => {
    fetch('/pricedata')
    .then((res) => res.json())
    .then((data) => {
      setPriceData(data);
    });}, 5000);
    return () => clearInterval(interval);
  }, []);

  const [statisticData, setStatisticData] = useState([{}]);
  useEffect(()=>{
    let interval = setInterval(() => {
      fetch('/statistics')
      .then((res) => res.json())
      .then((data) => {
        setStatisticData(data);
      });
    }, 5000);
    console.log(interval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Grid columns={2}>
        <Grid.Row columns={2}>
          <Grid.Column>
              <DataTable data={priceData} />
          </Grid.Column>
          <Grid.Column>
              <DataStatistics data={statisticData} />
          </Grid.Column>
        </Grid.Row>       
      </Grid>
    </div>

  );
}

export default App;
