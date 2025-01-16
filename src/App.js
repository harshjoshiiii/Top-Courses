import React from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards"
import Filter from "./components/Filter"
import { apiUrl, filterData  } from "./data";
import { useState,useEffect } from "react";
import Spinner from "./components/Spinner";
import {toast} from "react-toastify";


const App = () => { 
  //Use state ka use isliye kr rhe h qki API ka data isme dalna hai.
  const [courses, setCourses] = useState(null);
  //loading ko set krdo true.
  const [loading, setLoading] = useState(true);
  //ye category initially All pr hogi.
  const [category, setCategory] = useState(filterData[0].title);

 //fetch data 
  async function fetchData() {
    //jb tk data aa rha hai loading bala icon krdo.
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //ye data dal diya useState jo bnaya tha usme.
      setCourses(output.data);
    }
    catch(error) {
        toast.error("Network Issue!!!");
    }
    //jb data aa  jaye to loading bala icon hta do.
    setLoading(false);
  }

  //useEffect ka use krke fetch data call krdenge basically first render pr kr denge.
  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          //loading true hai spiner dikhao ya card dikhao.
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }
        </div>
      </div>


    </div>
  );
};

export default App;
