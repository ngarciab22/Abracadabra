import express from 'express'; 
import path from 'path'; 

const app = express(); 
const PORT = 3000; 
const __dirname = path.resolve(); 

const users = [ //Array de usuarios
    'Jorge',
    'Pedro',
    'Luis',
    'Carlos',
    'Miguel',
    'Ana',
    'Luisa',
]

app.use(express.static('assets')); //Configura Express para entrar al directorio 'assets'

//Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor👋')
})

//Ruta para obtener json de usuarios
app.get('/abracadabra/users', (req, res) => {
    res.json(users) // Envía la lista de usuarios en formato JSON
})

//Middleware para verificar si el usuario está autorizado para jugar
app.use('/abracadabra/juego/:user', (req, res, next) => {
    const user = req.params.user
    const validUser = users.map(u => u.toLowerCase()).includes(user.toLowerCase())
    validUser ? next() : res.sendFile(__dirname + '/assets/img/who.jpeg'); //Si el usuario no es válido se muestra img who.jpeg
})

//Ruta para mostrar el juego a un usuario autorizado
app.get('/abracadabra/juego/:user', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Ruta para mostrar la imagen del conejo o Voldemort
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = Math.floor(Math.random() * 4) + 1;
    const n = +req.params.n;
    const imagen = (n === numero) ? '/assets/img/conejito.jpg' : '/assets/img/voldemort.jpg';
    res.sendFile(__dirname + imagen); // Envía la imagen correspondiente
})

//Ruta genérica que muestra mensaje de error para solicitudes a rutas no definidas
app.get('*', (req, res) => {
    res.send('Lo sentimos. Esta página no existe.') 
})

app.listen(PORT, () => console.log(`Server corriendo en http://localhost:${PORT}`));


