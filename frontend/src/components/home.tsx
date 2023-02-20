import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Food } from "../model/food";
import { deleteFood, getAllFoods } from "../services/foodService";

export function Home() {
    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        updateFoodsList();
    }, [])

    function updateFoodsList() {
        getAllFoods()
            .then((response) => {
                if (!response.data._embedded) {
                    setFoods([]);
                    return;
                }

                setFoods(response.data._embedded.foodList);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function onDeleteClick(id: number) {
        deleteFood(id).then(() => {
            alert("Comida deletada com sucesso");
            updateFoodsList();
        });
    }

    return (
        <div className="container-fluid">
            {!foods.length && <h1>Sem comida registrada!</h1>}

            <div className="container">
                <div className="row">
                    {foods.map((food) => (
                        <div className="card col" style={{ width: "18rem" }} key={food.id}>
                            {/* <img src="..." className="card-img-top" alt="..." /> */}

                            <div className="card-body">
                                <h5 className="card-title">{food.name}</h5>
                                <p className="card-text">{food.description}</p>
                                <button className="btn btn-danger me-3" onClick={() => { onDeleteClick(food.id as number) }}>Deletar</button>
                                <Link to={`/updatefood/${food.id}`} className="btn btn-warning">Atualizar</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}