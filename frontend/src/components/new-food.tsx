import { FormEvent, useState } from "react";
import { Food } from "../model/food";
import { saveFood } from "../services/foodService";

export function NewFood() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)

    function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const food: Food = {
            name: name,
            price: price,
            description: description,
        };

        saveFood(food);

        setName("");
        setDescription("");
        setPrice(0);

        alert("Comida salva com sucesso!");
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