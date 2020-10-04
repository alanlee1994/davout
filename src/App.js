import React , {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';
import DataStatistics from './components/DataStatistics';
import { Grid } from 'semantic-ui-react';

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
      <Grid divided='vertically'>
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
