import React, { Component, ErrorInfo, ReactNode } from 'react'
import { KanbanBoard } from './components/KanbanBoard'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', minHeight: '100vh' }}>
          <h1 style={{ color: '#c00' }}>Something went wrong</h1>
          <pre style={{ background: '#fff', padding: '10px', overflow: 'auto' }}>
            {this.state.error?.toString()}
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App min-h-screen w-full" style={{ minHeight: '100vh' }}>
        <KanbanBoard />
      </div>
    </ErrorBoundary>
  )
}

export default App
