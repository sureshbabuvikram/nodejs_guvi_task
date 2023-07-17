// enabling CORS for some specific origins only.
let corsOptions = {
    origin : ['http://localhost:5500'],
 }
   
 app.use(cors(corsOptions))

//domain
 const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

//all
app.use(cors({
    origin: '*'
}));

//methods
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));