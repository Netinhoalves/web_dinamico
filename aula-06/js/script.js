const switchMenu = () => {
  const menu = document.getElementById('menu')
  const actualStyle = menu.style.display
  if(actualStyle == 'block') {
    menu.style.display = 'none'
  }
  else {
    menu.style.display = 'block'
  }
}

const perfil = document.getElementById('perfil-menu')
  perfil.addEventListener('click', switchMenu)
  window.onclick = function(event) {
      const menu = document.getElementById('menu')
    if (event.target == menu) {
      switchMenu()
    }
  }

  const switchModal = () => {
    const modal = document.querySelector('.modal')
    const actualStyle = modal.style.display
    if(actualStyle == 'block') {
      modal.style.display = 'none'
    }
    else {
      modal.style.display = 'block'
    }
  }
  
  const profile = document.getElementById('profile')
  profile.addEventListener('click', switchModal)
  
  window.onclick = function(event) {
      const modal = document.querySelector('.modal')
    if (event.target == modal) {
      switchModal()
    }
  }

  const settings = document.getElementById('settings')
  settings.addEventListener('click', switchModal)
  
  window.onclick = function(event) {
      const modal = document.querySelector('.modal')
    if (event.target == modal) {
      switchModal()
    }
  }