import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// Simple router paths
const routes = {
  '/': {
    template: '/index.html',
    title: 'Spark - From Idea to MVP in 24 Hours'
  },
  '/privacy': {
    template: '/privacy.html',
    title: 'Privacy Policy - Spark'
  },
  '/terms': {
    template: '/terms.html',
    title: 'Terms & Conditions - Spark'
  }
}

// Handle navigation
async function handleRoute() {
  const path = window.location.pathname
  const route = routes[path] || routes['/']
  
  try {
    const response = await fetch(route.template)
    if (!response.ok) throw new Error('Page not found')
    const html = await response.text()
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const mainContent = doc.querySelector('main')
    
    if (mainContent) {
      document.querySelector('main').innerHTML = mainContent.innerHTML
      document.title = route.title
      window.scrollTo(0, 0)
    }
  } catch (error) {
    console.error('Navigation error:', error)
    window.location.href = '/404.html'
  }
}

// Handle link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault()
    const path = link.pathname
    history.pushState(null, '', path)
    handleRoute()
  }
})

// Handle browser back/forward
window.addEventListener('popstate', handleRoute)

// Handle initial load
handleRoute()
