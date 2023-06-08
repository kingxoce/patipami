import React, { useState, useRef} from 'react'
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ReporteFacturas.css'

function ReporteFacturas() {

    //variales de los parametros de fechas seleccionados
    const [fecha, setFecha] = useState('');

    //variable que se utiliza para navegar a otra pagina
    const navigate = useNavigate();

    //variables donde se almacenara el dato del input
    const fechaRef = useRef();


    //evento del bottom donde se llama al post y envia los parametros 
    function handleSubmit(event) {  
        event.preventDefault();;

        //conexion por axios hacia la url del backend y se mandan los parametros
        axios.post('http://localhost:4000/solvencias', {fecha})
        .then(res => {
        console.log(res); 
        //direccionar a la pagina deseada
        navigate('/TablaFacturas');         
        }).catch(err => console.log(err));

    }


  return (
    <div className="container Facturas">
        <Form onSubmit={handleSubmit}>
            <Row>
            {
            /* Titulo del reporte */
            }
                <h1>Reporte de Solvencia de mes</h1>
            </Row>
            <br></br>
            {
            /* input parametro a seleccionar */
            }
           <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Por mes (seleccione cualquier dia del mes)</Form.Label>
                    <Form.Control type="date" ref={fechaRef} name="dob" placeholder="Fecha Inicio" id="fechaInicio" onChange={(e) => setFecha(e.target.value)} />
                </Form.Group>
            </Row>
            <br></br>
            {
                /* boton que envia los parametros seleccionados */ 
            }
            <Link type="button" className="btn btn-primary" to={`/Tablasolvencias/${fecha}`}>Generar Reporte</Link>
        </Form>
    </div>
  );
}

export default ReporteFacturas;