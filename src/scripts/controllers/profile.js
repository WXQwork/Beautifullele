import profileTpl from '../views/profile.html'

const render = () => {
  $('#root').html(profileTpl)
  $(".laye-back i").on("tap",()=>{
    location.hash="#position";
  })
}

export default {
  render
}