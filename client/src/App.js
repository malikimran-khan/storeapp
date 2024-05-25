import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import Login from './components/forms/Login'
import Signup from './components/forms/Signup'
import InsertData from './components/InsertData'
import Laptop from './components/devices/laptop/Laptop'
import Mobail from './components/devices/mobail/Mobail'
import Iphone from './components/devices/Iphones/Iphone'
import Desktop from './components/devices/desktop/Desktop'
import Tabs from './components/devices/tabs/Tabs'
import Laptopmodify from './components/devices/laptop/Laptopmodify'
import Laptopupdate from './components/devices/laptop/Laptopupdate'
import Mobailmodify from './components/devices/mobail/Mobailmodify'
import Mobailupdate from './components/devices/mobail/Mobailupdate'
import Iphonemodify from './components/devices/Iphones/Iphonemodify'
import Iphoneupdate from './components/devices/Iphones/Iphoneupdate'
import Fetchscreen from './components/fetch/Fetchscreen'
import Buynow from './components/devices/laptop/Buynow'
import IphoneBuy from './components/devices/Iphones/IphoneBuy'
import MobailBuy from './components/devices/mobail/MobailBuy'
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/insertdata' element={<InsertData/>}></Route>
        <Route path='/laptop' element={<Laptop/>}></Route>
        <Route path='/mobail' element={<Mobail/>}></Route>
        <Route path='/iphone' element={<Iphone/>}></Route>
        <Route path='/desktop' element={<Desktop/>}></Route>
        <Route path='/tabs' element={<Tabs/>}></Route>
        <Route path='/laptopmodify' element={<Laptopmodify/>}></Route>
        <Route path='/laptopupdate/:id' element={<Laptopupdate/>}></Route>
        <Route path='/mobailmodify'  element={<Mobailmodify/>}></Route>
        <Route path='/mobailupdate/:id' element={<Mobailupdate/>}></Route>
        <Route path='/iphonemodify' element={<Iphonemodify/>}></Route>
        <Route path='/iphoneupdate/:id' element={<Iphoneupdate/>}></Route>
        <Route path='/fetchscreen' element={<Fetchscreen/>}></Route>
        <Route path='/buynow/:id' element={<Buynow/>}></Route>
        <Route path='/iphonebuy/:id' element={<IphoneBuy/>}></Route>
        <Route path='/mobailbuy/:id' element={<MobailBuy/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
