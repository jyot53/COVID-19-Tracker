import React from 'react';
import {Container,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import state_data from '../Utility/cowin_state.json';
import numeral from 'numeral';
const StateData = () => {
    // const [stateData, setStateData] = useState([])
    // const getData = async () => {
    //     await fetch('../Utility/cowin_state.json',{
    //         headers: { 'Content-Type': 'application/json','Accept': 'application/json'}
    //     }).then(response => {response.json()}).then((data) => {setStateData(data);});
    // }

    // useEffect(()=>{
    //     console.log(stateData);
    //     getData();
    // },[])
    return (
        <div className="state-div">
            <Container >
            <h1 className="state-heading">State Wise Covid-19 Data of India</h1>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="state-table-head">
          <TableRow>
            <TableCell><span>State</span></TableCell>
            <TableCell align="right"><span> Confirmed </span></TableCell>
            <TableCell align="right"><span>Recovered</span></TableCell>
            <TableCell align="right"><span>Deaths</span></TableCell>
            <TableCell align="right"><span>Active</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state_data.map((state) => (
            <TableRow
              key={state.State_code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <p className="state_namecell">{state.State}</p>
              </TableCell>
              <TableCell align="right" >{numeral(state.Confirmed).format('0,0')} </TableCell>
              <TableCell align="right">{numeral(state.Recovered).format('0,0')}</TableCell>
              <TableCell align="right">{numeral(state.Deaths).format('0,0')}</TableCell>
              <TableCell align="right">{numeral(state.Active).format('0,0')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </Container>
        </div>
        
        
    )
}

export default StateData