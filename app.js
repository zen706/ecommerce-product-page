const { log } = console

const thumnails = [...document.querySelectorAll('.images .thumnails img')]
const bigImg = document.querySelector('.image-big')
const nav = document.querySelector('nav')
const underline = document.querySelector('.underline')
const aside = document.querySelector('aside')
const images = document.querySelector('.images')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const times = document.querySelector('.times')
const asideBigImg = document.querySelector('.aside-image-big')
const asideThumnails = [...document.querySelectorAll('aside .thumnails img')]
const quantity = document.querySelector('.quantity')
const minus = document.querySelector('.minus')
const plus = document.querySelector('.plus')
const addBtn = document.querySelector('.add-btn')
const cartCount = document.querySelector('.cart-count')
const cart = document.querySelector('.cart')
const cartBox = document.querySelector('.cart-box')
const empty = document.querySelector('.empty')
const items = document.querySelector('.items')
const checkoutBtn = document.querySelector('.checkout-btn')
const menu = document.querySelector('.menu')
const sidebar = document.querySelector('.sidebar')
const mobileImage = document.querySelector('.mobile-image')
const mobileNext = document.querySelector('.mobile-next')
const mobilePrev = document.querySelector('.mobile-prev')

let addCount = 0
let total = 0 // cartItem's total quantity
let index = 1
let list = []

const listFromLocalStorage = JSON.parse(localStorage.getItem('list'))

if (listFromLocalStorage) {
  list = listFromLocalStorage
  renderCart(list)
  list.map((obj) => {
    total += obj.quantity
  })
  cartCount.innerHTML = total
  cartCount.classList.add('show')
  empty.classList.add('hide')
  checkoutBtn.classList.add('show')
}

addBtn.addEventListener('click', () => {
  if (addCount === 0) return

  empty.classList.add('hide')
  checkoutBtn.classList.add('show')
  total += addCount
  cartCount.innerHTML = total
  cartCount.classList.add('show')

  const sneakers = {
    img: './images/image-product-1-thumbnail.jpg',
    name: 'fall limited edition sneakers',
    price: 125.0,
    quantity: addCount,
    id: new Date().getTime().toString(),
  }

  list.push(sneakers)
  localStorage.setItem('list', JSON.stringify(list))
  renderCart(list)
})

cartBox.addEventListener('click', (e) => {
  cart.classList.toggle('show')
})

function renderCart(list) {
  const cartList = list
    .map((object) => {
      return `<div class="item">
        <img src=${object.img} />
        <div class="title">
        <p class="name">${object.name}</p>
        <p>${`$${object.price}.00`} x ${object.quantity}<span>${`$${
        object.price * object.quantity
      }.00`}
  </span></p>
        </div>
        <i class="bi bi-trash" id=${object.id} data-quantity=${
        object.quantity
      }></i>
      </div>`
    })
    .join('')

  items.innerHTML = cartList
}

cart.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-trash')) {
    const filterList = JSON.parse(localStorage.getItem('list')).filter(
      (obj) => obj.id !== e.target.id
    )
    total -= e.target.dataset.quantity
    cartCount.innerHTML = total
    list = filterList
    localStorage.setItem('list', JSON.stringify(list))
    renderCart(list)
    if (list.length === 0) {
      localStorage.clear()
      checkoutBtn.classList.remove('show')
      empty.classList.remove('hide')
      cartCount.classList.remove('show')
    }
  }
})

menu.addEventListener('click', () => {
  sidebar.classList.add('show')
})
sidebar.addEventListener('click', (e) => {
  if (e.target.classList.contains('show')) {
    sidebar.classList.remove('show')
  } else if (e.target.classList.contains('bi-x')) {
    sidebar.classList.remove('show')
  }
})

minus.addEventListener('click', () => {
  if (addCount <= 0) return
  addCount--
  quantity.innerHTML = addCount
})

plus.addEventListener('click', () => {
  addCount++
  quantity.innerHTML = addCount
})

times.addEventListener('click', () => {
  aside.classList.remove('show')
})

prev.addEventListener('click', () => {
  if (index <= 1) {
    index = 4
  } else {
    index--
  }
  asideBigImg.src = `./images/image-product-${index}.jpg`

  asideThumnails.forEach((item) => {
    item.classList.remove('hold')
  })
  asideThumnails[index - 1].classList.add('hold')
})

next.addEventListener('click', () => {
  if (index >= 4) {
    index = 1
  } else {
    index++
  }
  asideBigImg.src = `./images/image-product-${index}.jpg`

  asideThumnails.forEach((item) => {
    item.classList.remove('hold')
  })
  asideThumnails[index - 1].classList.add('hold')
})

mobilePrev.addEventListener('click', () => {
  if (index <= 1) {
    index = 4
  } else {
    index--
  }
  mobileImage.style.backgroundImage = `url(./images/image-product-${index}.jpg)`
  bigImg.src = `./images/image-product-${index}.jpg`

  thumnails.forEach((thumnail) => {
    thumnail.classList.remove('hold')
  })
  thumnails[index - 1].classList.add('hold')
})

mobileNext.addEventListener('click', () => {
  if (index >= 4) {
    index = 1
  } else {
    index++
  }
  mobileImage.style.backgroundImage = `url(./images/image-product-${index}.jpg)`
  bigImg.src = `./images/image-product-${index}.jpg`

  thumnails.forEach((thumnail) => {
    thumnail.classList.remove('hold')
  })
  thumnails[index-1].classList.add('hold')
})



nav.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('link')) {
    const rect = e.target.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    const width = rect.width
    underline.style.width = `${width}px`
    underline.style.left = `${rect.left - navRect.left}px`
  } else {
    underline.style.width = 0
  }
})

bigImg.addEventListener('click', () => {
  aside.classList.add('show')
  asideBigImg.src = bigImg.src
  asideThumnails.forEach((item) => {
    item.classList.remove('hold')
  })
  asideThumnails[index - 1].classList.add('hold')
})

window.addEventListener('resize', () => {
  if (window.innerWidth <= 620) {
    aside.classList.remove('show')
  }

  const names = [...document.querySelectorAll('.name')]
  if (window.innerWidth <= 400) {
    names.forEach((name) => (name.innerHTML = `autumn limited edition...`))
  } else {
    names.forEach((name) => (name.innerHTML = `fall limited edition sneakers`))
  }
})

images.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (id) {
    thumnails.forEach((item) => {
      item.classList.remove('hold')
    })
    bigImg.src = `./images/image-product-${id}.jpg`
    e.target.classList.add('hold')
    index = id
    mobileImage.style.backgroundImage = `url('./images/image-product-${index}.jpg')`
  }
})

aside.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (id) {
    index = id
    asideThumnails.forEach((item) => {
      item.classList.remove('hold')
    })
    asideBigImg.src = `./images/image-product-${id}.jpg`
    e.target.classList.add('hold')
  }
  if (e.target.classList.contains('show')) {
    aside.classList.remove('show')
  }
})
