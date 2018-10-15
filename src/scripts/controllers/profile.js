import profileTpl from '../views/profile.html'
import Backs from '../utils/back';

const render = () => {
  $('#root').html(profileTpl)
  new Backs(".laye-back i").init()
}

export default {
  render
}