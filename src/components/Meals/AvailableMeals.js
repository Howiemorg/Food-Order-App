import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import useHttp from "../Hooks/use-http";

const AvailableMeals = () => {
  const { error, isLoading, sendRequest: fetchData } = useHttp();

  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const getMeals = (data) => {
      const meals = [];
      for (const meal in data) {
        meals.push(<MealItem
          id={meal}
          key={meal}
          name={data[meal].name}
          description={data[meal].description}
          price={data[meal].price}
        />)
      }

      setMealsList(meals);
    };

    fetchData(
      {
        url: "https://react-http-633e4-default-rtdb.firebaseio.com/meals.json",
      },
      getMeals
    );
  }, [fetchData]);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>Couldn't fetch meals</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
