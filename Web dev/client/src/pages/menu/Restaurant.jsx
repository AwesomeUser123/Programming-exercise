import React, { useEffect, useState } from "react";
import "./Restaurant.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const orderMap = {
  supper: 1,
  "main dish": 2,
  "side dish": 3,
  dessert: 4,
};

const Restaurant = () => {

  const [foodData,setFoodData] = useState([])
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect( () =>{
    const fetchAllFood = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/api/foodget/getInfo")
        console.log(res.data)
        setFoodData(res.data)
        
      }catch(err){
        console.log(err)
      }
    }
    fetchAllFood()
  },[])


  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/mainmenu");  // <-- replace with the correct route you want
  };
  


  const handleTypeChange = (type) => {
    setTypeFilter(type);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  let displayedFood = [...foodData];

  if (typeFilter !== "all") {
    displayedFood = displayedFood.filter((food) => food.Type === typeFilter);
  }

  if (sortOrder === "asc") {
    displayedFood.sort((a, b) => a.Price - b.Price);
  } else if (sortOrder === "desc") {
    displayedFood.sort((a, b) => b.Price - a.Price);
  } else {
    displayedFood.sort((a, b) => orderMap[a.Type] - orderMap[b.Type]);
  }

  return (
    <div className="restaurant">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h1>Our Menu</h1>
      <div className="filters">
        <button onClick={() => handleTypeChange("all")}>All</button>
        <button onClick={() => handleTypeChange("supper")}>Supper</button>
        <button onClick={() => handleTypeChange("main dish")}>Main Dish</button>
        <button onClick={() => handleTypeChange("side dish")}>Side Dish</button>
        <button onClick={() => handleTypeChange("dessert")}>Dessert</button>

        <div className="sort-buttons">
          <button onClick={() => handleSortChange("asc")}>Sort ↑</button>
          <button onClick={() => handleSortChange("desc")}>Sort ↓</button>
        </div>
      </div>

      <div className="food-list">
        {displayedFood.map((food) => (
          <div className="food-card" key={food.FoodID}>
            {food.Tag && <span className="tag">{food.Tag}</span>}
            <img src={food.ImageLink} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{food.Description}</p>
            <div className="card-bottom">
              <span className="price">{food.Price.toLocaleString()} VND</span>
              <button className="detail-button" onClick={() => {
                setSelectedFood(food);
                setIsModalOpen(true);
              }}>
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedFood && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedFood.name}</h2>
            <p>{selectedFood["Detailed description"]}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};


export default Restaurant;
