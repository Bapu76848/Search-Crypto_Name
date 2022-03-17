import './App.css';
import React,{useEffect,useState} from 'react'
import axios from "axios";
import Coin from './components/Coin';

function App() {
  const [value,setValue] = useState('')
  const [coinList,setCoinList] = useState([])
  useEffect(()=>{
    axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((res)=>{
      setCoinList(res.data.coins)
    })
  },[])

  const filteredCoin = coinList.filter((coin)=>{
     return coin.name.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input type="text" placeholder='Search Crypto to Display below...' value={value} onChange={e=>setValue(e.target.value)}/>
      </div>
      <div className='cryptoDisplay'>{filteredCoin.map((coin)=>{
        return (
            <Coin name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol}/>
        )
      })}</div>
    </div>
  );
}

export default App;
