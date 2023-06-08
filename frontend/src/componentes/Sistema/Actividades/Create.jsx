import React, { useEffect, useState,useRef} from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button'
import Cookies from 'universal-cookie';
import {  Form  } from "react-bootstrap";
import './Style.css'
import { Navigate, useNavigate} from 'react-router-dom';



function Create() {

    const [detalle1, setD1] = useState('')  
    const [detalle2, setD2] = useState('')  
    const [paquete, setPaquete] = useState('')
    const numberRegex = /^\d+$/;
    const [productos, setProductos] = useState([]);


    const det1Ref = useRef();
    const det2Ref = useRef();
    const paqRef = useRef();






    const cookies = new Cookies();   
    const [rol, setrol]=useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setrol(cookies.get('ROL'));
        },[])







    





    const peticionesGet= async()=>{
        await axios.get('http://localhost:4000/paquete-get')
        .then(response=>{
            setProductos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        peticionesGet();
    },[])




    function handleSubmit(event) {  
        event.preventDefault();        
        
        if (!det1Ref.current.value||!det2Ref.current.value||!paqRef.current.value) {
          alert("Por favor, Llene todos los campos");
          return;
        }
        
        if (numberRegex.test(det1Ref.current.value)) {
            alert("Titulo invalido");
            return(navigate(`/Actividades/create/`));
          }


          if (numberRegex.test(det2Ref.current.value)) {
            alert("Detalle invalido");
            return(navigate(`/Actividades/create/`));
          }
        
        
        axios.post('http://localhost:4000/actividad-post', {detalle1,detalle2,paquete})
        .then(res => {
        alert("INGRESADO CON EXITO");  
        console.log(res); 
        navigate('/Actividades');         
        }).catch(err => console.log(err));  
          } 

  return (
    <div className="create">
        <Form onSubmit={handleSubmit}>
            <h2>Nueva actividad</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Titulo de la actividad</Form.Label>
                <Form.Control  onChange={e => setD1(e.target.value)} ref={det1Ref} type="text" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescripcion">
                <Form.Label>Detalle de la actividad</Form.Label>
                <Form.Control onChange={e => setD2(e.target.value)} ref={det2Ref} type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicVuelo">
                <Form.Label>Paquete al que pertenece</Form.Label>
                <Form.Select onChange={e => setPaquete(e.target.value)} ref={paqRef} aria-label="Seleccione una opción">
                    <option>Seleccione una opción</option>
                    
                    {productos &&
                        productos.map((producto)=>(
                            
                            <option value={producto.idpaquete}>{producto.detalle}</option>
                            
                        
                        ))}
                   
                </Form.Select>
            </Form.Group>
            <Button
                variant="success"
                onClick={handleSubmit}
                
                >
            INGRESAR
            </Button>
        </Form>
    </div>
  );
}

export default Create;