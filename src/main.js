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

// Prevent default behavior for internal links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault()
    const path = link.pathname
    history.pushState(null, '', path)
    handleRoute()
  }
})

// Simple router
const router = {
  '/': () => fetch('/index.html'),
  '/privacy': () => fetch('/src/pages/privacy.html'),
  '/terms': () => fetch('/src/pages/terms.html'),
}

// Handle navigation
async function handleRoute() {
  const path = window.location.pathname
  const route = router[path] || router['/']
  
  try {
    const response = await route()
    if (!response.ok) throw new Error('Page not found')
    const html = await response.text()
    
    // Extract the content between <main> tags
    const mainContent = html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1]
    if (mainContent) {
      document.querySelector('main').innerHTML = mainContent
      // Update title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*)<\/title>/i)
      if (titleMatch) {
        document.title = titleMatch[1]
      }
      // Scroll to top
      window.scrollTo(0, 0)
    }
  } catch (error) {
    console.error('Navigation error:', error)
    window.location.href = '/404.html'
  }
}

// Listen for navigation events
window.addEventListener('popstate', handleRoute)

// Handle initial route
handleRoute()
