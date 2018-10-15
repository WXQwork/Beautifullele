import Router from "./utils/router"
import positionController from './controllers/position'
import searchController from './controllers/search'
import profileController from './controllers/profile'
import adminController from './controllers/admin'
import newGoodsController from './controllers/new-goods'
<<<<<<< HEAD
import detailController from './controllers/details'
=======
import registerController from './controllers/register'
>>>>>>> c61a30921ee8238426a823d8d95fbcdde36289dd

const router = new Router()
router.init()
router.route('#position', positionController.render)
router.route('#search', searchController.render)
router.route('#profile', profileController.render)
router.route('#admin', adminController.render)
router.route('#top2', newGoodsController.render)
<<<<<<< HEAD
router.route("#top3",detailController.render)
=======
router.route('#register',registerController.render)
>>>>>>> c61a30921ee8238426a823d8d95fbcdde36289dd
