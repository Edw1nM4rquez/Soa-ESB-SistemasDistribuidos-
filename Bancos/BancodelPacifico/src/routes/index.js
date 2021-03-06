const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('../../node_modules/uuid/dist/v4');
const aux = 0;
const cores = require('cors');
const { v4: uuidv4 } = require('uuid')

const jsonbooks = fs.readFileSync('src/books.json', 'utf-8')
let books = JSON.parse(jsonbooks);

const jsoncuenta = fs.readFileSync('src/cuenta.json', 'utf-8')
let cuentas = JSON.parse(jsoncuenta);


const jsontransacciones = fs.readFileSync('src/transaccion.json', 'utf-8')
let transacciones = JSON.parse(jsontransacciones);



router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });

});

router.get('/user', (req, res) => {
  /*  res.render('transaccion.ejs', {
        cuentas
    });*/
    res.send(cuentas);
});

//metodo get para recuperar las transacciones
router.get('/transaccion',(req,res)=>{
    
    res.send(transacciones)
});

//metodo post para realizar los depositos.
router.post('/postDeposito', (req, res) => {

    console.log("Parametros", req.body);

    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancoorigen = req.body.banorigen;

    console.log("Monto"+monto+"tipo"+tipo+"banco destino"+bancoorigen);

    let newTransaccion = {
        "transaccion": {
            id: uuidv4(),
            monto,
            tipo,
            bancoorigen
            
        }
    }

    let updateCuenta = {
        "cuenta": {
            id: cuentas[0].cuenta.id,
            titular: cuentas[0].cuenta.titular,
            ci: cuentas[0].cuenta.ci,
            banco: cuentas[0].cuenta.banco,
            monto: parseFloat(cuentas[0].cuenta.monto) + parseFloat(monto)
        }

    }

    cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 521452);
    const jsnCuentas = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentas, 'utf-8');

    cuentas.push(updateCuenta);
    const jsnCuentasE = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentasE, 'utf-8');

    transacciones.push(newTransaccion);
    const jsonTransacciones = JSON.stringify(transacciones);
    fs.writeFileSync('src/transaccion.json', jsonTransacciones, 'utf-8');
    res.redirect('/');
    
});

//metodo post para realizar el deposito.
router.post('/postRetiro', (req, res) => {
    console.log("RETIRO");
    console.log("Parametros", req.body);
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancoorigen = req.body.banorigen;

    if (parseFloat(monto) > parseFloat(cuentas[0].cuenta.monto)) {
        console.log('NO TIENE FONDOS');
        res.send(500,'showAlert') 
        //window.alert('NO TIENE SUFICIENTES FONDOS');
        //res.send();


    } else {

        let newTransaccion = {
            "transaccion": {
                id: uuidv4(),
                monto,
                tipo,
                bancoorigen
            }
        }

        let updateCuenta = {
            "cuenta": {
                id: cuentas[0].cuenta.id,
                titular: cuentas[0].cuenta.titular,
                ci: cuentas[0].cuenta.ci,
                banco: cuentas[0].cuenta.banco,
                monto: parseFloat(cuentas[0].cuenta.monto) - parseFloat(monto)
            }

        }

        cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 521452);
        const jsnCuentas = JSON.stringify(cuentas);
        fs.writeFileSync('src/cuenta.json', jsnCuentas, 'utf-8');

        cuentas.push(updateCuenta);
        const jsnCuentasE = JSON.stringify(cuentas);
        fs.writeFileSync('src/cuenta.json', jsnCuentasE, 'utf-8');

        transacciones.push(newTransaccion);
        const jsonTransacciones = JSON.stringify(transacciones);
        fs.writeFileSync('src/transaccion.json', jsonTransacciones, 'utf-8');

        res.send(req.body);
    }

    res.send();
});

// metodo post para comprobar los fondos de las cuentas bancarias en los bancos antes 
// de realizar una transfrencia interbancaria.
router.post('/comprobarFondos', (req, res) => {
    console.log("Parametros", req.body);
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancodest = req.body.bandest;
    var bancoorigen = req.body.banorigen;

    if (parseFloat(monto) > parseFloat(cuentas[0].cuenta.monto)) {
        console.log('NO TIENE FONDOS');


    } else {

        let newTransaccion = {
            "transaccion": {
                id: uuidv4(),
                monto,
                tipo,
                bancodest,
                bancoorigen
            }
        }

        let updateCuenta = {
            "cuenta": {
                id: cuentas[0].cuenta.id,
                titular: cuentas[0].cuenta.titular,
                ci: cuentas[0].cuenta.ci,
                banco: cuentas[0].cuenta.banco,
                monto: parseFloat(cuentas[0].cuenta.monto) - parseFloat(monto)
            }

        }

        cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 521452);
        const jsnCuentas = JSON.stringify(cuentas);
        fs.writeFileSync('src/cuenta.json', jsnCuentas, 'utf-8');

        cuentas.push(updateCuenta);
        const jsnCuentasE = JSON.stringify(cuentas);
        fs.writeFileSync('src/cuenta.json', jsnCuentasE, 'utf-8');

        transacciones.push(newTransaccion);
        const jsonTransacciones = JSON.stringify(transacciones);
        fs.writeFileSync('src/transaccion.json', jsonTransacciones, 'utf-8');

        res.send(req.body);
    }

    res.send();
});


// metodo post para realizar la transferencia, en este metodo se inrementa
// el monto en la cuenta del banco destino
router.post('/transferencia', function (req, res) {
    var monto = req.body.monto;
    var tipo = req.body.tipo;
    var bancodest = req.body.bandest;
    var bancoorigen = req.body.banorigen;

     console.log("BANCO DEL PACIFICO = "+"tipo = "+tipo+", monto "+monto);
  
    let newTransaccion = {
        "transaccion": {
            id: uuidv4(),
            monto,
            tipo,
            bancodest,
            bancoorigen
        }
    }


    let updateCuenta = {
        "cuenta": {
            id: cuentas[0].cuenta.id,
            titular: cuentas[0].cuenta.titular,
            ci: cuentas[0].cuenta.ci,
            banco: cuentas[0].cuenta.banco,
            monto: parseFloat(cuentas[0].cuenta.monto) + parseFloat(monto)
        }

    }
    cuentas = cuentas.filter(cuenta => cuenta.cuenta.id != 521452);
    const jsnCuentas = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentas, 'utf-8');

    cuentas.push(updateCuenta);
    const jsnCuentasE = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsnCuentasE, 'utf-8');

    transacciones.push(newTransaccion);
    const jsonTransacciones = JSON.stringify(transacciones);
    fs.writeFileSync('src/transaccion.json', jsonTransacciones, 'utf-8');
    res.redirect('/');

});




router.post('/mi-cuentaBank', (req, res) => {
    const { titular, ci, banco, monto } = req.body;
    if (!titular || !ci || !banco || !monto) {
        res.status(400).send('Entries must have a title and description');
        return;
    }

    let newCuenta = {
        "cuenta": {
            id: uuidv4(),
            titular,
            ci,
            banco,
            monto
        }
    }
    cuentas.push(newCuenta);
    const jsonCuentas = JSON.stringify(cuentas);
    fs.writeFileSync('src/cuenta.json', jsonCuentas, 'utf-8');
    res.redirect('/');

});

module.exports = router;