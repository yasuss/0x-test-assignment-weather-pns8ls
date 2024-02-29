import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getBackground } from './shared/lib/getBackground'

import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
rootElement.classList.add(getBackground())
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
