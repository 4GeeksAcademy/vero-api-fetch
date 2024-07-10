import React, { useState, useEffect } from "react";

const Home = () => {
    //declaracion de estados
    let [tarea, setTarea] = useState("")
    let [lista, setLista] = useState([])
    let [tareasModificada, setTareaModificada] = useState ("")

    //FUNCION CREAR USUARIO
    function crearUsuario() {

        fetch('https://playground.4geeks.com/todo/users/Vero519', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

        })

            .then((respose) => {
                if (respose.status === 201 || respose.status === 400) {
                    obtenerTareas()
                }
                return respose.json()
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }
    //ME GUARDA LAS TAREAS
    function guardarTareas() {

        fetch('https://playground.4geeks.com/todo/todos/Vero519', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "label": tarea,
                "is_done": false
            })

        })

            .then((respose) => {
                if (respose.status === 201) {
                    obtenerTareas()
                }
                return respose.json()
            })


            .then((data) => console.log(data))
            .catch((error) => console.log(error))
        setTarea("")
    }

    //ESTA FUNCION OBTIENE TODAS LAS TAREAS
    function obtenerTareas() {
        fetch('https://playground.4geeks.com/todo/users/Vero519', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            // .then((respose) => respose.json())
            .then((respose) => {
                if (respose.status == 404) {
                    crearUsuario()
                }
                return respose.json()
            })
            .then((data) => setLista(data.todos))
            .catch((error) => console.log(error))
    }
    // ESTA FUNCION ME ELIMINA DESDE LA API
    function eliminarDesdeApi(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((respose) => {
                if (respose.status == 204) {
                    obtenerTareas()
                }
                return respose.json()
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))

    }
    //FUNCION ACTUALIZAR TAREA
    function actulizarLista(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: `PUT`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "label": tareasModificada,
                "is_done": false
            })
        })
            .then((reponse) => {
                console.log(reponse.status)
                if (reponse.status == 200) {
                    obtenerTareas()

                }
                return reponse.json()
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))


    }




    useEffect(() => {
        //crearUsuario();
obtenerTareas()
    }, [])

    return (
        <div className="container">
            <div className="text-center">
                <label htmlFor="inputValue" className="form-label fs-1 text-secondary">todos</label>
                <div className="d-flex">
                    <input type="text" id="inputValue" className="form-control fs-3" value={tarea} onChange={(e) => setTarea(e.target.value)} />
                    <button type="button" className="btn btn-outline-success" onClick={guardarTareas}>Agregar a la lista</button>
                </div>
                <div className="card fs-3 text-start mt-4">
                    <ul className="list-group list-group-flush">
                        {lista.map(item => (
                            <li className="list-group-item" key={item.id}>
                                <span >{item.label}</span>
                                <button className="btn btn-outline-danger float-end" onClick={() => eliminarDesdeApi(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <button type="button" className="btn btn-outline-primary float-end mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="fa fa-pen"></i>
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input type="text" id="inputValue" className="form-control fs-3"
                                                    value={tareasModificada}
                                                onChange={(e) => setTareaModificada(e.target.value)} 
                                                />

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => actulizarLista(item.id)}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default Home;