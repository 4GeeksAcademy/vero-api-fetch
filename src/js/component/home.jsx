import React, { useState,useEffect } from "react";


//create your first component
const Home = () => {
	//declaracion de estados
	let [tarea, setTarea] = useState("")
	let [lista, setLista] = useState([])

	function crearUsuario (){

		fetch('https://playground.4geeks.com/todo/users/Vero519',{
			method:'POST',
			headers: {
				"Content-Type" :"application/json"
			}

		})
		
		.then((respose)=> respose.json())
		.then((data)=> console.log(data))
		.catch((error)=> console.log(error))
	}

	function obtenerTareas (){

		fetch('https://playground.4geeks.com/todo/users/Vero519',{
			method:'GET',
			headers: {
				"Content-Type" :"application/json"
			}

		})
		
		.then((respose)=> respose.json())
		.then((data)=> setLista(data.todos))
		.catch((error)=> console.log(error))
	}

	const agregarTarea = () => {
		if (tarea.trim() !== "") {
			const nuevaLista = {
				id: tarea.length + 1,
				texto: tarea
			};

			setLista([...lista, nuevaLista]);
			setTarea("");
		}
	}
	const eliminarTarea = (id) => {
		setLista(lista.filter(elemento => elemento.id !== id));
	}
useEffect(()=>{
	crearUsuario()
	obtenerTareas()
},[])


	return (


		<div className="container">
			<div className="text-center">

				<label htmlFor="inputValue" className="form-label fs-1 text-secondary">todos</label>
				<div className="d-flex">
					<input type="text" id="inputValue" className="form-control fs-3" value={tarea} onChange={(e) => setTarea(e.target.value)} onKeyDown={(e) => e.key == "Enter" && agregarTarea()} />
					<button type="button" className="btn btn-primary" onClick={agregarTarea}>Agrgar a la lista</button>
				</div>
				<div className="card fs-3 text-start">
					<ul className="list-group list-group-flush">
						{lista.map(item => (
							<li className="list-group-item" key={item.id}>
								<span >{item.label}</span>
								<button className="btn btn-ligth float-end" onClick={() => eliminarTarea(item.id)}>x</button>
							</li>
						))}
					</ul>
				</div>
				<div id="passwordHelpBlock" className="form-text">
					<ul>

					</ul>
				</div>

			</div>
		</div>
	);
};

export default Home;
