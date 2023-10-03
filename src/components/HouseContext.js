import React, { useEffect, useState, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  console.log(housesData[0]);
  const [houses, setHouses] = useState(housesData.slice(0,6));
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);
  const [residence,setResidence]=useState("Residence type (any)");
  const [residencies,setResidencies]=useState([]);

 
  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    const allProperties = houses.map((house) => house.type);
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  useEffect(()=>{
    const allResidence=houses.map((house)=>house.Residence);
    const uniqueResidence=["Residence type (any)", ...new Set(allResidence)];
    setResidencies(uniqueResidence);
  },[])

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
    
      if(isDefault(country) && isDefault(property) && isDefault(price) && isDefault(residence))
   {
    return true;
   }
   if(house.country === country  && house.type === property && house.Residence === residence && housePrice>=minPrice && housePrice<=maxPrice){

    return true;
   }

   if(!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(residence)){

    return house.country===country;
   }
   if( !isDefault(property) && isDefault(country) && isDefault(price) && isDefault(residence)){

    return house.type===property;
   }
   if( !isDefault(price) && isDefault(property) && isDefault(country) && isDefault(residence)){

    if(housePrice>=minPrice && housePrice<=maxPrice){

      return true;
    }
   }
   if(isDefault(price) && isDefault(property) && isDefault(country) && !isDefault(residence)){
      return house.Residence === residence;
   }

   if(!isDefault(country) && !isDefault(property) &&  isDefault(price)  && !isDefault(residence))
   {

    return house.country === country && house.type===property && house.Residence === residence;
  
  }
  if(!isDefault(country) &&  isDefault(property) && !isDefault(price)  && !isDefault(residence)){
    if(housePrice>=minPrice && housePrice<=maxPrice){
       return house.country === country && house.Residence === residence;
    }
  }
  if(isDefault(country) &&  !isDefault(property) && isDefault(price)  && !isDefault(residence)){
    if(housePrice>=minPrice && housePrice<=maxPrice){
    return  house.type===property  && house.Residence=== residence;
    }
  }
   
  return false;
    });
    

    setTimeout(() => {
      return (
        newHouses.length < 1? setHouses([]):
        setHouses(newHouses),
      setLoading(false)
      );
     
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        residence,
        setResidence,
        handleClick,
        residencies,
        setResidencies,
        setHouses
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;

