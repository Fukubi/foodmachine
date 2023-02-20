import { FormEvent, useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Food } from "../model/food";
import { getFood, saveFood, updateFood } from "../services/foodService";

export async function loader({ params }: LoaderFunctionArgs) {
    const food = await getFood(Number(params.id));
    return food.data as Food;
}

export function UpdateFood() {
    const food = useLoaderData();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)

    useEffect(() => {
        setName((food as Food).name)
        setDescription((food as Food).description)
        setPrice((food as Food).price)
    }, [])

    function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const updatedFood: Food = {
            name: name,
            price: price,
            description: description,
        };

        updateFood(updatedFood, (food as Food).id as number);

        alert("Comida atualizada com sucesso!");
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <form className="mt-4 w-50 h-100" onSubmit={onFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control" 
                        placeholder="Nome da Comida" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description">Descrição</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className="form-control" 
                        placeholder="Descrição da Comida" 
                        cols={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description">Preço</label>
                    <input 
                        type="number" 
                        name="description" 
                        id="description" 
                        className="form-control" 
                        placeholder="0,00" 
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>

                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        </div>
    );
}