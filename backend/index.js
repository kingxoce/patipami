const express = require("express");

const cors = require("cors");

const mysql = require("mysql");


const app = express();app.use(express.json());
app.use(cors());
const db = mysql.createConnection({   
     host: "localhost",    
     user: "root",    
     password: "master12",    
     database: "airtime1"})

app.get("/clientes-get", (req, res) => {    const sql = "SELECT * FROM CLIENTE";    db.query(sql, (err, data) => {        if(err) return res.json("Error");        return res.json(data);    });});

app.get("/paquete-get", (req, res) => {    const sql = "SELECT idpaquete,detalle,descripcion,incluye_vuelo,incluye_alimento,incluye_alojamiento,incluye_guia,incluye_transporte,precio,duracion,cuotas from paquete";    db.query(sql, (err, data) => {        if(err) return res.json("Error");        return res.json(data);    });});
  

app.get("/actividad-get", (req, res) => {    const sql = "SELECT idactividad,detalle1,detalle2,paquete.detalle FROM airtime1.actividad join paquete on actividad.PAQUETE_idpaquete=paquete.idpaquete";    db.query(sql, (err, data) => {        if(err) return res.json("Error");        return res.json(data);    });});
 

app.put('/updatep/:id', (req, res) => {   
    const sql = "UPDATE paquete  SET detalle = ?, descripcion = ?,incluye_vuelo = ?,incluye_alimento = ?,incluye_alojamiento = ?,incluye_guia = ?,incluye_transporte = ?,precio = ?,duracion = ?,cuotas = ? WHERE idpaquete = ?;  ";    
   const values = [req.body.detalle,req.body.desc,req.body.vuelo,req.body.alimento,req.body.aloja,req.body.guia,req.body.trans,req.body.precio,req.body.dias,req.body.cuotas]  
    const id = req.params.id;    
    console.log(values);    
    db.query(sql, [...values,id], (err, data) => { 
    if(err) return res.json("Error");        
    return res.json(data);    })})


    app.delete('/deleteproducto/:id', (req, res) => {   
        const sql = "DELETE FROM paquete WHERE idpaquete = ?";    
        const id = req.params.id;        
        db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");        
        return res.json(data);    })})

        app.delete('/deleteactividad/:id', (req, res) => {   
            const sql = "DELETE FROM actividad WHERE idactividad = ?";    
            const id = req.params.id;        
            db.query(sql, [id], (err, data) => {
            if(err) return res.json("Error");        
            return res.json(data);    })})


app.get("/login/:user/:cont", (req, res) => {  
    const sql = "SELECT usuario.idusuario,usuario.usuario,usuario.ROL_idrol, cliente.idcliente FROM USUARIO join cliente on usuario.idusuario=cliente.USUARIO_idusuario  WHERE usuario=? and contraseña=?";
    const user = req.params.user;  
    const cont = req.params.cont;
    console.log(user,cont);  
    db.query(sql,[user,cont],(err, data) => {      
    if(err) return res.json("Error");    
    return res.json(data);})});


    app.get("/issolventemora/:id", (req, res) => {  
        const sql = "SELECT IF(detalle like 'Mora%', 'Tiene Mora', 'No tiene mora') AS estado FROM edc where CLIENTE_idcliente=? and cargo IS NOT NULL and detalle Not like 'Compra%' limit 1;";
        const id= req.params.id;    
        db.query(sql,[id],(err, data) => {      
        if(err) return res.json("Error");    
        return res.json(data);})});


        app.get("/issolventepago/:id", (req, res) => {  
            const sql = "SELECT IF(estado=0, '1', '0') AS estado FROM edc where CLIENTE_idcliente=? and cargo IS NULL and estado=0 limit 1;";
            const id= req.params.id;    
            db.query(sql,[id],(err, data) => {      
            if(err) return res.json("Error");    
            return res.json(data);})});




            app.get("/pagar/:id", (req, res) => {  
                const sql = "CALL pagar(?);";
                const id= req.params.id;    
                db.query(sql,[id],(err, data) => {      
                if(err) return res.json("Error");    
                return res.json(data);})});    
                
                
                app.get("/mora/:id", (req, res) => {  
                    const sql = "CALL pagarmora(?);";
                    const id= req.params.id;    
                    db.query(sql,[id],(err, data) => {      
                    if(err) return res.json("Error");    
                    return res.json(data);})});    



app.post('/crearc', (req, res) => {    
    const sql = "INSERT INTO CLIENTE (nombres,apellidos,telefono,nit,correo,USUARIO_idusuario) VALUES (?)";    
    const values = [req.body.nombres,   req.body.apellidos,     req.body.telefono, req.body.nit,req.body.correo, req.body.usuario    ]    
    
    db.query(sql, [values], (err, data) => {        if(err) return res.json("Error");       
    return res.json(data);    })})


    app.post('/paquete-post', (req, res) => {    
        const sql = "INSERT INTO PAQUETE (detalle,descripcion,incluye_vuelo,incluye_alimento,incluye_alojamiento,incluye_guia,incluye_transporte,precio,duracion,cuotas) VALUES(?)";    
        const values = [req.body.detalle,req.body.desc,req.body.vuelo,req.body.alimento,req.body.aloja,req.body.guia,req.body.trans,req.body.precio,req.body.dias,req.body.cuotas]    
        console.log(values);
        db.query(sql, [values], (err, data) => {        if(err) return res.json("Error");       
        return res.json(data);    })})

        app.post('/actividad-post', (req, res) => {    
            const sql = "INSERT INTO actividad (detalle1,detalle2,PAQUETE_idpaquete) VALUES(?)";    
            const values = [req.body.detalle1,req.body.detalle2,req.body.paquete]    
            console.log(values);
            db.query(sql, [values], (err, data) => {        if(err) return res.json("Error");       
            return res.json(data);    })})

    app.delete('/deleteclient/:id', (req, res) => {   
        const sql = "DELETE FROM CLIENTE WHERE idcliente = ?";    
        const id = req.params.id;        
        db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");        
        return res.json(data);    })})


        app.delete('/deleteproducto/:id', (req, res) => {   
            const sql = "DELETE FROM paquete WHERE idpaquete = ?";    
            const id = req.params.id;        
            db.query(sql, [id], (err, data) => {
            if(err) return res.json("Error");        
            return res.json(data);    })})



        app.put('/updatec/:id', (req, res) => {   
            const sql = "UPDATE CLIENTE SET nombres = ? ,apellidos=?, telefono = ? , nit = ? , correo =?, USUARIO_idusuario=? where idcliente = ?";    
            const values = [req.body.nombres,   req.body.apellidos,     req.body.telefono, req.body.nit,req.body.correo, req.body.usuario]  
            const id = req.params.id;        
            db.query(sql, [...values, id], (err, data) => { 
            if(err) return res.json("Error");        
            return res.json(data);    })})


            app.put('/updatea/:id', (req, res) => {   
                const sql = "UPDATE ACTIVIDAD SET detalle1=?,detalle2=?,PAQUETE_idpaquete=? where idactividad = ?";    
                const values = [req.body.detalle1,   req.body.detalle2,     req.body.paquete  ]
                const id = req.params.id;  
                console.log(values);   
                db.query(sql, [...values, id], (err, data) => { 
                if(err) return res.json("Error");        
                return res.json(data);    })})


      



            


            app.get("/searchclient/:id", (req, res) => {  
                const sql = "SELECT * FROM CLIENTE WHERE idcliente=? ;";
                const id = req.params.id;  
                console.log(id);
                db.query(sql,[id],(err, data) => {      
                if(err) return res.json("Error");    
                return res.json(data);});});
                
                app.get("/searchactividad/:id", (req, res) => {  
                    const sql = "SELECT idactividad,detalle1,detalle2,paquete.detalle FROM actividad join paquete on actividad.PAQUETE_idpaquete=paquete.idpaquete WHERE idactividad=? ;";
                    const id = req.params.id; 
                    console.log(id);
                    db.query(sql,[id],(err, data) => {      
                    if(err) return res.json("Error");    
                    return res.json(data);});});


                    app.get("/detalles/:id", (req, res) => {  
                        const sql = "SELECT * FROM PAQUETE WHERE idpaquete=? ;";
                        const id = req.params.id;  
                        db.query(sql,[id],(err, data) => {      
                        if(err) return res.json("Error");    
                        return res.json(data);});});
                        
                        
                        
                    app.get("/actividad/:id", (req, res) => {  
                            const sql = "SELECT * FROM actividad where PAQUETE_idpaquete=?;";
                            const id = req.params.id;  
                            db.query(sql,[id],(err, data) => {      
                            if(err) return res.json("Error");    
                            return res.json(data);});});
    

                            app.get("/reporte_antiguedad/:fechaInicio/:fechaFin", (req, res) => {  
                                const sql = "select concat(cliente.nombres,' ',cliente.apellidos)as name, 200 mora, factura.fecha_vencimiento as fac_v,edc.fecha_vencimiento as pag_v,DATEDIFF(edc.fecha_vencimiento,CURDATE()) as dias, if(DATEDIFF(edc.fecha_vencimiento,CURDATE())>0,'Sin Retraso','Con Retraso') as ret FROM edc JOIN factura on edc.CLIENTE_idcliente=factura.CLIENTE_idcliente  join CLIENTE on edc.CLIENTE_idcliente=cliente.idcliente  where DATE_FORMAT(edc.fecha_vencimiento, '%Y-%m') >= DATE_FORMAT(?, '%Y-%m') and DATE_FORMAT(edc.fecha_vencimiento, '%Y-%m') <= DATE_FORMAT(?, '%Y-%m') and edc.estado=0;";
                                const fechaInicio = req.params.fechaInicio;  
                                const fechaFin = req.params.fechaFin;
                                //parametros almacenados en variables
                                //se envia el query y los parametros en un json a la ruta declara "/api/reporteFacturas/:fechaInicio/:fechaFin"
                                db.query(sql,[fechaInicio,fechaFin],(err, data) => {      
                                if(err) return res.json("Error");    
                                return res.json(data);});
                            });




                            app.get("/solvencias/:fecha", (req, res) => {  
                                const sql = "select concat(cliente.nombres,' ',cliente.apellidos)as name,factura.fecha_vencimiento as fac_v,edc.fecha_vencimiento as pag_v,DATEDIFF(edc.fecha_vencimiento,CURDATE()) as dias, if(DATEDIFF(edc.fecha_vencimiento,CURDATE())>0,'Sin Retraso','Con Retraso') as ret, if(edc.estado='0','No solvente del mes','Solvente del mes') as sol FROM edc JOIN factura on  edc.CLIENTE_idcliente=factura.CLIENTE_idcliente join CLIENTE on edc.CLIENTE_idcliente=cliente.idcliente where DATE_FORMAT(edc.fecha_vencimiento, '%Y-%m') = DATE_FORMAT(?, '%Y-%m') and edc.estado='0';";
                                const fecha = req.params.fecha;  
                                //parametros almacenados en variables
                                //se envia el query y los parametros en un json a la ruta declara "/api/reporteFacturas/:fechaInicio/:fechaFin"
                                db.query(sql,[fecha],(err, data) => {      
                                if(err) return res.json("Error");    
                                return res.json(data);});
                            });



                            app.get("/api/reporteFacturas/:fechaInicio/:fechaFin", (req, res) => {  
                                const sql = "";
                                //parametros almacenados en variables
                                const fechaInicio = req.params.fechaInicio;  
                                const fechaFin = req.params.fechaFin;
                                //se envia el query y los parametros en un json a la ruta declara "/api/reporteFacturas/:fechaInicio/:fechaFin"
                                db.query(sql,[fechaInicio,fechaFin],(err, data) => {      
                                if(err) return res.json("Error");    
                                return res.json(data);});
                            });
                            app.get("/EDC/:id", (req, res) => {  
                                const sql = "SELECT detalle,documento,cargo,abono,saldo,fecha,fecha_vencimiento from EDC WHERE CLIENTE_idcliente=? and estado=1 ORDER BY fecha ASC;  ";
                                //parametros almacenados en variables
                                const id = req.params.id;  
                                //se envia el query y los parametros en un json a la ruta declara "/api/reporteFacturas/:fechaInicio/:fechaFin"
                                db.query(sql,[id],(err, data) => {      
                                if(err) return res.json("Error");    
                                return res.json(data);});
                            });



/*app.get('/productos',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from sv_productos',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

app.get('/productos/incluye',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from incluye_detalle',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//peticion de usuarios a la BD
app.get('/usuarios-get',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from usuarios',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//peticion de clientes a la BD
app.get('/clientes-get',(req,res)=>{
    var conexion=mysql.createConnection(credenciales)
    conexion.query('select * from clientes',(error,result)=>{
        if(error){
            res.status(500).send(error)
        }else{
            res.status(200).send(result)
        }
    })
    conexion.end()
})

//insercion de usuarios a la BD
app.post('/usuarios-post', (req, res)=>{
    var conexion=mysql.createConnection(credenciales)
    const values = [
        req.body.usuario,
        req.body.email,
        req.body.password,
        req.body.tipo
    ]
    conexion.query('INSERT INTO usuarios (`usuario`, `email`, `password`, `tipo`) VALUES (?)',[values], (err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
    conexion.end()
})
*/
app.listen(4000, ()=>console.log('Bienvenido al Backend'))