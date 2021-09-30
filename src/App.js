import React,{useState,useEffect} from 'react'
import {MenuItem,FormControl,Select,Card, CardContent,Grid} from '@material-ui/core'
import './App.css'
import Infobox from './Components/Infobox';
import Map from './Components/Map';
import Table from './Components/Table';
import Linegraph from './Components/Linegraph';
import StateData from './Components/StateData';
import VaccineData from './Components/VaccineData';
// import Bargraph from './Components/Bargraph';
import News from './Components/NewsVaccine';
import {sortData} from './Utility/utils';
import vaccine_data from './Utility/cowin_vaccine_data_state.json';
import "leaflet/dist/leaflet.css";
const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]); 
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [vaccineNews, setVaccineNews] = useState([]);
  // const [healthNews, setHealthNews] = useState([]);
  const [indianStates, setIndianStates] = useState([]);
  const [currIndianState, setCurrIndianState] = useState("India");


  useEffect(async ()=>{
    await fetch('https://disease.sh/v3/covid-19/all').then(response => response.json()).then((data)=> {
      setCountryInfo(data);
    });

    await fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1',{
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': 'cf7187b35cmsh5374cf6e8dc8d08p14fcc1jsn3991b86fbf4e'
      }
    }).then((response)=>response.json()).then((data)=>{

      console.log(data);
      setVaccineNews(data.news);
    })


    const allstates = vaccine_data.map((data)=>{
      return (
        data.State
      )
    })
    const uniqueStates = [...new Set(allstates)];
    setIndianStates(uniqueStates);

    // await fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1',{
    //   method: 'GET',
    //   headers: {
    //     'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    //     'x-rapidapi-key': 'cf7187b35cmsh5374cf6e8dc8d08p14fcc1jsn3991b86fbf4e'
    //   }
    // }).then((response)=>response.json()).then((data)=>{
    //   console.log(data.news);
    //   setHealthNews(data.news);
    // })

  },[]);

  useEffect(() => {
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>response.json()).then((data)=>{

        const resultcountries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));

        const sortedData = sortData(data);

        setTableData(sortedData);
        setCountries(resultcountries);
        setMapCountries(data);
      });
    };

    getCountriesData();

  },[]);

  const onCountryChange = async (event) => {
    const countrycode = event.target.value;
    

    const url = countrycode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url).then(response => response.json()).then((data)=> {
        // console.log(data);
        setCountry(countrycode);
        setCountryInfo(data);
        if(url == `https://disease.sh/v3/covid-19/countries/${countrycode}`){
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
        
    });

  }

  const onStateChange = (event)=>{
    const statechange = event.target.value;
    setCurrIndianState(statechange);
  }

  return (
    <>
    <div className="app">

      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select 
              variant="outlined" 
              onChange={onCountryChange} 
              value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country,index)=>{
                  return <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                })
              }
            </Select>  
          </FormControl>  
        </div>

        <div className="app_stats">
          {/* Infoboxes   */}
          <Infobox active={caseType==="cases"} onClick={e=> setCaseType('cases') } title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <Infobox active={caseType==="recovered"} onClick={e=> setCaseType('recovered') } title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <Infobox active={caseType==="deaths"} onClick={e=> setCaseType('deaths') } title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>


        {/* Map  */}
        {/* <Map center={mapCenter} zoom={mapZoom}/> */}
        <Map caseType={caseType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>

      </div>

      <Card className="app_right">
          <CardContent>
            <h3>Live Cases By Country</h3>
              {/* table   */}
              <Table countries={tableData}/>
            <h3>Worldwide New <span>{caseType} </span> </h3>
              {/* graph  */}
              <Linegraph caseType={caseType}/>
          </CardContent>
      </Card>
      
    </div>
    
    <section className="news">
      <h1>Vaccine News</h1>
      <News vaccineNews = {vaccineNews}/>    
    </section>

    {/* <div className="bargraph">
      <Card className="bargraph_left">
        <CardContent>
          <Bargraph/>
        </CardContent>
      </Card>
      
      <h1>Vaccinations data for india</h1>
              
    </div> */}

    <div className="stateIndia">
      <StateData/>
    </div>

    <div className="vaccineIndia">
          <FormControl className="app_dropdown">
            <Select 
              variant="outlined" 
              onChange={onStateChange} 
              value={currIndianState}>
              {
                indianStates.map((state,index)=>{
                  return <MenuItem key={index} value={state}>{state}</MenuItem>
                })
              }
            </Select>  
          </FormControl>
      <VaccineData state={currIndianState}/>
    </div>



              
  
  
  </>

    
  )
}

export default App
