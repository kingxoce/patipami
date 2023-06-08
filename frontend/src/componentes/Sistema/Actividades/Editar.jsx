import React, { useEffect, useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import './Style.css'
import axios from "axios"
import { Navigate,useNavigate, useParams } from 'react-router-dom';

function Editar() {

    const [detalle1, setDetalle1] = useState('')  
    const [detalle2, setDetalle2] = useState('')  
    const [paque, setPaque] = useState('') 
    const [pq,setPq] = useState([])
    const [ac,setAc] = useState([])
    const navigate = useNavigate();
    const numberRegex = /^\d+$/;
    
    const det1Ref = useRef();
    const det2Ref = useRef();
    const paqRef = useRef();
    const {id} = useParams();

    useEffect(()=> {
      axios.get('http://localhost:4000/searchactividad/'+id)
      .then(res => setAc(res.data)
      .catch(err => console.log(err)));
      },[])
        

      ac.map((data)=> (det1Ref.current.placeholder=data.detalle1,
        det2Ref.current.placeholder=data.detalle2
        ));


        function handleSubmit(event) {  
            event.preventDefault();        
            
            if (!det1Ref.current.value||!det2Ref.current.value||!paqRef.current.value) {
             
                if(!det1Ref.current.value){
    
                    det1Ref.current.value=det1Ref.current.placeholder
                
                     }

                     if(!det2Ref.current.value){
    
                        det2Ref.current.value=det2Ref.current.placeholder
                    
                         }

                         

            }
            
            if (numberRegex.test(det1Ref.current.value)) {
                alert("Titulo invalido");
                return(navigate(`/Actividades/edit/${id}`));
              }
    
    
              if (numberRegex.test(det2Ref.current.value)) {
                alert("Detalle invalido");
                return(navigate(`/Actividades/edit/${id}`));
              }

            event.preventDefault();  
            
            axios.put('http://localhost:4000/updatea/'+id,{detalle1: det1Ref.current.value,detalle2: det2Ref.current.value,paquete: paqRef.current.value })
            .then(res => {
            alert("Actualizado CON EXITO");  
            console.log(res); 
            navigate('/Actividades');         
            }).catch(err => console.log(err));  



              } 



             




              const peticionesGet= async()=>{
                await axios.get('http://localhost:4000/paquete-get')
                .then(response=>{
                    setPq(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }

            useEffect(()=>{
                peticionesGet();
            },[])
                 


  return (
    <div className="editar">
        <Form onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Titulo de la actividad</Form.Label>
                <Form.Control  onChange={e => setDetalle1(e.target.value)} ref={det1Ref}  type="text" 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescripcion">
                <Form.Label>Descripción de la actividad</Form.Label>
                <Form.Control onChange={e => setDetalle2(e.target.value)} ref={det2Ref} type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicVuelo">
                <Form.Label>Paquete al que pertenece</Form.Label>
                <Form.Select onChange={e => setPaque(e.target.value)} ref={paqRef} >
                   
                   {ac &&
                   ac.map((act)=>(

                    <option value={act.idpaquete}>{act.detalle}</option>

                   ))
                      
                   }
                    
                    {pq &&
                        pq.map((producto)=>(
                            
                            <option value={producto.idpaquete}>{producto.detalle}</option>
                            
                        
                        ))}
                </Form.Select>
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