const h = (type, attrs, children) => {
  const el = document.createElement(type)

  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key])
  })

  el.innerHTML = children

  return el
}

function render () {
  const prevMinimap = document.querySelector('.minimap')
  prevMinimap && prevMinimap.remove()

  const minimap = h('div', {
    class: 'minimap'
  }, document.body.innerHTML)

  document.body.appendChild(minimap)

  // move to top-right coner
  const height = minimap.offsetHeight
  const width = minimap.offsetWidth
  minimap.style.top = `${-0.5 * (height - 0.1 * height)}px`
  minimap.style.right = `${-0.5 * (width - 0.1 * width)}px`

  // prevent <a> default
  Array.prototype.forEach.call(minimap.querySelectorAll('a'), a => {
    a.addEventListener('click', e => {
      e.preventDefault()
    }, false)
  })

  // scroll
  // minimap.addEventListener('mousedown', e => {
  //   document.body.scrollTop = e.clientY * 10 - window.innerHeight / 2
  // }, false)
  minimap.addEventListener('click', e => {
    document.body.scrollTop = e.clientY * 10 - window.innerHeight / 2
  }, false)
}

render()

// observer
const observer = new MutationObserver(mutations => {
  mutations[0].addedNodes[0] && render()
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})
