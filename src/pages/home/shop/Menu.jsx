import { useEffect, useState } from "react";
import Cards from "../../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };
  const handleSortChange = (option) => {
    setSortOption(option);
    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };
//   console.log(filteredItems);
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* menu shop  */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
           {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>
            {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/* product card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
       {/* Pagination */}
       <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Menu;









// import React, { useEffect,useState } from 'react'
// import Cards from"../../../components/Cards"
// import {} from "react-icons/fa"

// const Menu =()=>{
//     const [menu,setMenu] =useState([]);
//     const [filteredItems,setFilteredItems]= useState([]);
//     const [selectedCategory,setSelectedCategory]=useState("all");
//     const [sortOption,setSortOption] =useState("default");
//     const [currentPage,setcurrentPage] =useState(1);
//     const [itemsPerPage] = useState(8);
    
//     //leading data
//     useEffect(()=>{
//         //fetch data from the backend
//         const fetchData = async() =>{
//             try{
//                 const response = await fetch("../../menu.json");
//                 const data = await response.json();
//                 //console.log(data)
//                 setMenu(data);
//                 setFilteredItems(data);
//             }catch(error){
//                 console.log("Error fetching data",error)
//             }
//         };
//         //call the function
//         fetchData();
//     },[])



//     //filtering data based on category
//     const filterItems =(category) =>{
//         const filtered =
//         category === "alt" 
//         ? menu
//         :menu.filter((item)=>item.category=== category);
//         setFilteredItems(filtered);
//         setSelectedCategory(category);
//         setcurrentPage(1)
//     };

// //show all data
// const showAll=() =>{
//     setFilteredItems(menu);
//     setSelectedCategory("all");
//     setcurrentPage(1)
// }

// //sorting based onA-Z,Z-A , lOW-HIGH PRICING
// const handleSortChange =(option)=>{
//     setSortOption(option);

//     let sortedItems = [...filteredItems]

//     //logic
//     switch(option) {
//       case "A-Z":
//         sortedItems.sort((a,b) =>a.name.localeCompare (b.name))
        
//         break;
//       case "Z-A":
//         sortedItems.sort((a,b) =>a.name.localeCompare (a.name))
//         break;
//         case "low-to-high":
//         sortedItems.sort((a,b) => a.price - b.price)
//         break;
//         case "high-to-low":
//           sortedItems.sort((a,b) => b.price - a.price)
//         break;
//       default:
//         // code block
//         break;
//     }
//     setFilteredItems(sortedItems);
//     setcurrentPage(1)
// };
    
// //pagination logic
// const indexOfLastItem =currentPage + itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = filteredItems.slice(indexOfFirstItem,indexOfLastItem);
// const paginate =(pageNumber)=>setcurrentPage(pageNumber);


// return(
//         <div>
//             {/*menu banner*/}
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
//       <div className="py-48 flex flex-col items-center justify-center gap-8">

//         {/* img */}
//         {/* <div className="md:w-1/2">
//           <img src={bannerImg} alt="" />
//           <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
//             <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
//               <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
//               <div className="space-y-1">
//                 <h5>Spicy noodles</h5>
//                 <div className="rating rating-sm">
              
//                 <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     readOnly
//                   />
//                 <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     readOnly
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     checked
//                     readOnly
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-400"
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-400"
//                     readOnly
//                   />
                
//                 </div>
//                 <p className="text-red">$18.00</p>
//               </div>
//             </div>
//             <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
//               <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
//               <div className="space-y-1">
//                 <h5>Spicy noodles</h5>
//                 <div className="rating rating-sm">
//                 <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     readOnly
//                   />
//                 <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     readOnly
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-500"
//                     checked
//                     readOnly
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-400"
//                     readOnly
//                   />
//                   <input
//                     type="radio"
//                     name="rating-6"
//                     className="mask mask-star-2 bg-orange-400"
//                     readOnly
//                   />
                
//                 </div>
//                 <p className="text-red">$18.00</p>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* texts */}
//         <div className="text-center px-4 space-y-7">
//         <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//             For the Love of Delicious <span className="text-green">Food</span>
//           </h2>
//           <p className="text-[#4A4A4A] text-xl md-4/5 mx-auto">
//             come with family & feel the joy of mouthwatering 
//             food such as Greek Salad,Lasagne,Butternut pumpkin,Tokusen Wagyu,olivas
//             Relienas and more for a moderate const
            
//           </p>
//           <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
//             Order Now
//           </button>
//         </div>
        
//       </div>
//     </div>
//     {/*menu shop section*/}
//     <div className='section-container'>
//       {/* filtering  and sorting*/}
//       <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
//         {/*all categories*/ }
//         <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
//           <button onClick={showAll}
//           className={selectedCategory==="all" ? "active":"" }
//           >All</button>
//           <buttono onClick={()=>filterItems("salad")}
//           className={selectedCategory==="salad" ? "active":"" }
//           >Salad</buttono>
//           <button onClick={()=>filterItems("pizza")}
//           className={selectedCategory==="pizza" ? "active":"" }
//           >pizza</button>
//           <button onClick={()=>filterItems("soup")}
//           className={selectedCategory==="soup" ? "active":"" }
//           >soups</button>
//           <button onClick={()=>filterItems("dessert")}
//           className={selectedCategory==="dessert" ? "active":"" }
//           >Dessert</button>
//           <button onClick={()=>filterItems("drinks")}
//           className={selectedCategory==="drinks" ? "active":"" }
//           >Drinks</button>
//         </div>

//         {/*sorting and filtering*/ }
//         <div className='flex justify-end mb-4 rounded-sm'>
//           <div className='bg-black p-2'>
//             <faFilter className="h-4 w-4 text-white"/>
//           </div>
//           {/* sorting option*/ }
//           <select name="sort"id="sort"
//           onChange={(e) => handleSortChange(e.target.value)}
//           value={sortOption}
//           className='bg-black text-white px-2 py-1 rounded-sm'
//           >
//             <option value="default">Default</option>
//             <option value="A-Z">A-Z</option>
//             <option value="Z-A">Z-A</option>
//             <option value="low-to-high">Low to High</option>
//             <option value="high-to-low">High to Low</option>

//           </select>
//         </div>
//       </div>
//        {/* products card*/}
//        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
//         {
//          currentItems.map((item) =>(
//            <Cards key={item._id} item={item}/>
//          ))

// }
//        </div>
//        {/* pagination section*/}
//        <div>
//         {
//           Array.from({length:Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) =>{
//             <button 
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={`mx-1 px-3 py-1 rounded-full${currentPage=== index + 1 ? "bg-green text-white":"bg-gray-200"}`}
//             >
//               {index + 1}

//             </button>
//           })
//         }
//        </div>

//     </div>
//         </div>
//     )
// }
// export default Menu














