import Router from "./utils/router"
import positionController from './controllers/position'
import profileController from './controllers/profile'
import adminController from './controllers/admin'
import newGoodsController from './controllers/new-goods'
import detailController from './controllers/details'
import registerController from './controllers/register'
import searchController from './controllers/search'
import searchSousuoController from './controllers/searchsousuo'

const router = new Router()
router.init()
router.route('#position', positionController.render)
router.route('#search', searchController.render)
router.route('#profile', profileController.render)
router.route('#admin', adminController.render)
router.route('#top2', newGoodsController.render)
router.route("#details",detailController.render)
router.route('#register',registerController.render)
router.route('#searchsousuo', searchSousuoController.render)
