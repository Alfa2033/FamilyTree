const { express } = require('../dependencies/Dependencies')
const TreeController = require('../controllers/TreeController')

const tree = new TreeController()
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hola')
})

router.post('/addperson', (req, res) => {
    const response = tree.AddPerson(req.body.Name)
    res.status(response.StatusCode).json(response)
})

router.post('/addchild', (req, res) => {
    const response = tree.AddChild(req.body.ParentId, req.body.ChildId)
    res.status(response.StatusCode).json(response)
})

router.post('/addpartnert', (req, res) => {
    const response = tree.AddPartner(req.body.PersonId, req.body.ParnertId)
    res.status(response.StatusCode).json(response)
})

router.get('/gettree', (req, res) => {
    const response = tree.GetTree()
    res.status(response.StatusCode).json(response)
})

router.get('/getpersons', (req, res) => {
    const response = tree.GetPersons()
    res.status(response.StatusCode).json(response)
})

module.exports = router