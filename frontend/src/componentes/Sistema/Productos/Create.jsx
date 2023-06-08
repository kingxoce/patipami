import React, { useEffect, useState,useRef} from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button'
import Cookies from 'universal-cookie';
import {  Form  } from "react-bootstrap";
import './Style.css'
import { Navigate, useNavigate} from 'react-router-dom';


function Create() {


    const [detalle, setDetalle] = useState('')  
    const [desc, setDesc] = useState('')  
    const [vuelo, setVuelo] = useState('')
    const [alimento, setAlimento] = useState('')  
    const [aloja, setAloja] = useState('')
    const [guia,setGuia] = useState('') 
    const [trans,setTrans] = useState('')
    const [dias,setDias] = useState('') 
    const [precio,setPrecio] = useState('')  
    const [cuotas,setCuotas] = useState('') 
    
    const detalleRef = useRef();
    const descRef = useRef();
    const vueloRef = useRef();
    const alimentoRef = useRef();
    const alojaRef = useRef();
    const guiaRef = useRef();
    const transRef = useRef();
    const precioRef = useRef();
    const cuotasRef = useRef();
    const diasRef = useRef();


    const cookies = new Cookies();   
    const [rol, setrol]=useState('');
    const navigate = useNavigate();
    const numberRegex = /^\d+$/;
    useEffect(()=>{
        setrol(cookies.get('ROL'));
        },[])


        function handleSubmit(event) {  
            event.preventDefault();        
            
            if (!diasRef.current.value||!cuotasRef.current.value||!precioRef.current.value||!transRef.current.value||!detalleRef.current.value||!descRef.current.value||!vueloRef.current.value||!alimentoRef.current.value||!alojaRef.current.value||!guiaRef.current.value) {
              alert("Por favor, Llene todos los campos");
              return;
            }
            
            if(diasRef.current.value<1){
    
                alert("Duracion invalida");
                return(navigate(`/Productos/create/`));
            
                 }

                 if(precioRef.current.value<1){

                    alert("Precio invalido");
                return(navigate(`/Productos/create/`));
                
                     }

                     if(cuotasRef.current.value<1){

                        alert("Cuotas invalidas");
                         return(navigate(`/Productos/create/`));
                    
                     }
            
                     if (numberRegex.test(detalleRef.current.value)) {
                        alert("Detalle invalido");
                        return(navigate(`/Productos/create/`));
                      }


                      if (numberRegex.test(descRef.current.value)) {
                        alert("Descripcion invalida");
                        return(navigate(`/Productos/create/`));
                      }


            axios.post('http://localhost:4000/paquete-post', {detalle,desc,vuelo,alimento,aloja,guia,trans,dias,precio,cuotas})
            .then(res => {
            alert("INGRESADO CON EXITO");  
            console.log(res); 
            navigate('/Productos');         
            }).catch(err => console.log(err));  
              } 


    

                   
                    

  return (
    <div className="create">
        <Form onSubmit={handleSubmit}>
            <h2>Nuevo Producto</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control  onChange={e => setDetalle(e.target.value)} ref={detalleRef}  type="text" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescripcion">
                <Form.Label>Descripción del Producto</Form.Label>
                <Form.Control onChange={e => setDesc(e.target.value)} ref={descRef} type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicVuelo">
                <Form.Label>Incluye Vuelo?</Form.Label>
                <Form.Select onChange={e => setVuelo(e.target.value)} ref={vueloRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAlimento">
                <Form.Label>Incluye Alimento?</Form.Label>
                <Form.Select onChange={e => setAlimento(e.target.value)} ref={alimentoRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAlojamiento">
                <Form.Label>Incluye Alojamiento?</Form.Label>
                <Form.Select onChange={e => setAloja(e.target.value)} ref={alojaRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGuia">
                <Form.Label>Incluye Guía?</Form.Label>
                <Form.Select onChange={e => setGuia(e.target.value)} ref={guiaRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTransporte">
                <Form.Label>Incluye Transporte?</Form.Label>
                <Form.Select onChange={e => setTrans(e.target.value)} ref={transRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecio">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control onChange={e => setPrecio(e.target.value)} ref={precioRef}  type="number" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDuracion">
                <Form.Label>Duración en  días</Form.Label>
                <Form.Control onChange={e => setDias(e.target.value)} ref={diasRef} type="number" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCuotas">
                <Form.Label>Cuotas Disponibles</Form.Label>
                <Form.Control onChange={e => setCuotas(e.target.value)} ref={cuotasRef} type="number" 
                />
            </Form.Group>
            <Button
                variant="success"
                onClick={handleSubmit}
                >
                Ingresar
            </Button>
        </Form>
    </div>
  );
}

export default Create;