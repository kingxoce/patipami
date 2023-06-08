import React, { useEffect, useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import './Style.css'
import axios from "axios"
import { Navigate,useNavigate, useParams } from 'react-router-dom';

function Editar() {

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
    const navigate = useNavigate();
    const numberRegex = /^\d+$/;
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
    const {id} = useParams();


    const [pq,setPq] = useState([])
    useEffect(()=> {
      axios.get('http://localhost:4000/detalles/'+id)
      .then(res => setPq(res.data)
      .catch(err => console.log(err)));
  
      },[])
        

      pq.map((data)=> (detalleRef.current.placeholder=data.detalle,
        descRef.current.placeholder=data.descripcion,   
        precioRef.current.placeholder=data.precio,
        cuotasRef.current.placeholder=data.cuotas,
        diasRef.current.placeholder=data.duracion        ));


        function handleSubmit(event) {  
            event.preventDefault();        
            
            if (!diasRef.current.value||!cuotasRef.current.value||!precioRef.current.value||!transRef.current.value||!detalleRef.current.value||!descRef.current.value||!vueloRef.current.value||!alimentoRef.current.value||!alojaRef.current.value||!guiaRef.current.value) {
             
                if(!diasRef.current.value){
    
                    diasRef.current.value=diasRef.current.placeholder
                
                     }

                     if(!precioRef.current.value){
    
                        precioRef.current.value=precioRef.current.placeholder
                    
                         }

                         if(!cuotasRef.current.value){
    
                            cuotasRef.current.value=cuotasRef.current.placeholder
                        
                             }

                             if(!detalleRef.current.value){
    
                                 detalleRef.current.value=detalleRef.current.placeholder
                            
                                 }
                                 if(!descRef.current.value){
    
                                    descRef.current.value=descRef.current.placeholder
                                
                                     }    
                                     
                                     if(!vuelo){
    
                                        alert("Por favor, Llene todos los campos")
                                        return(navigate(`/Productos/edit/${id}`));
                                    
                                         }
                                         
                                         
                                         if(!guia){

                                            alert("Por favor, Llene todos los campos");
                                            return(navigate(`/Productos/edit/${id}`));
                                        
                                             }   


                                             if(!alimento){

                                                alert("Por favor, Llene todos los campos");
                                                return(navigate(`/Productos/edit/${id}`));
                                            
                                                 }   

                                                 if(!aloja){

                                                    alert("Por favor, Llene todos los campos");
                                                    return(navigate(`/Productos/edit/${id}`));
                                                
                                                     }   


                                                     if(!trans){

                                                        alert("Por favor, Llene todos los campos");
                                                        return(navigate(`/Productos/edit/${id}`));
                                                    
                                                         }   

            }
            
            if(diasRef.current.value<1){
    
                alert("Duracion invalida");
                return(navigate(`/Productos/edit/${id}`));
            
                 }

                 if(precioRef.current.value<1){

                    alert("Precio invalido");
                return(navigate(`/Productos/edit/${id}`));
                
                     }

                     if(cuotasRef.current.value<1){

                        alert("Cuotas invalidas");
                         return(navigate(`/Productos/edit/${id}`));
                    
                     }



                     if (numberRegex.test(detalleRef.current.value)) {
                        alert("Detalle invalido");
                        return(navigate(`/Productos/edit/${id}`));
                      }


                      if (numberRegex.test(descRef.current.value)) {
                        alert("Descripcion invalida");
                        return(navigate(`/Productos/edit/${id}`));
                      }

            event.preventDefault();  
            
            axios.put('http://localhost:4000/updatep/'+id,{detalle: detalleRef.current.value,desc: descRef.current.value,vuelo: vuelo,alimento: alimento,aloja: aloja,guia: guia,trans: trans,dias: diasRef.current.value,precio: precioRef.current.value,cuotas: cuotasRef.current.value})
            .then(res => {
            alert("Actualizado CON EXITO");  
            console.log(res); 
            navigate('/Productos');         
            }).catch(err => console.log(err));  



              } 

  return (
    <div className="editar">
        <Form onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>
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
                Actualizar
            </Button>
        </Form>
    </div>
  );
}

export default Editar;