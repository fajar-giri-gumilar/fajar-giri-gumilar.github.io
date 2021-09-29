let hash = window.location.hash.substring(1) || 'home'
const targets = ['home', 'about', 'portofolio', 'blog', 'team', 'contact']
targets.forEach(target => {
  const node = document.getElementById(target)

  if (node) {
    node.style.display = hash === target ? 'block' : 'none'
  }
})

const proxy = new Proxy({hash}, {
  set(self, key, val) {
    targets.forEach(target => {
      const node = document.getElementById(target)

      if (node) {
        node.style.display = 'none'
  
        if (node.classList.contains('bg-cyan-600')) {
          node.classList.replace('bg-cyan-600', 'bg-cyan-500')
        }
      }
    })

    const current = document.getElementById(val)
    current.style.display = 'block'

    self[key] = val

    return true
  },
})

const triggers = document.querySelectorAll('nav a').forEach(node => {
  const target = node.href.match(/#([a-zA-Z]+)/g).shift().substring(1)

  node.addEventListener('click', e => {
    proxy.hash = target
  })
})
