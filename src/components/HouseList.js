import React ,{useContext } from 'react';

import {HouseContext} from './HouseContext'
import { housesData } from "../data";
import House from './House'
import { Link } from 'react-router-dom';
import {ImSpinner2} from 'react-icons/im'
const HouseList = () => {
  const { houses, loading,setHouses} = useContext(HouseContext);
  const addData = ()=>{
    const newHouse=[...houses]
    if (newHouse.length >= housesData.length) {
      return; 
    }
    const start=newHouse.length;
    const end=Math.min(start+3,housesData.length);
    for(let i=start;i<end;i++){
      newHouse.push(housesData[i]);
    }
    setHouses(newHouse);
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[500px]'>
        <ImSpinner2 className='animate-spin text-violet-700 text-4xl' />
      </div>
    );
  }

  if (houses.length < 1 ) {
    return <div className='text-center text-3xl  mt-48'>Sorry, nothing found</div>;
  }
  return <>
 <section className='mb-20 '> 
<div className='container mx-auto'>

  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14' >
    {houses.map((house,index)=>{
       return (
        <Link to={`/property/${house.id}`} key={index}>
          <House  house={house}/>
        </Link>
       )
    })}
  </div>
</div>

  </section>;
  <div className='flex justify-center items-center'>
  <button onClick={addData} className='bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded-lg mx-500  text-white text-lg'>Show More</button>
  </div>
  </>
};

export default HouseList;
