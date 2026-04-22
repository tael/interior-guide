import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">오류가 발생했어요</h2>
          <p className="text-sm text-gray-500 mb-6">페이지를 새로고침해주세요.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#03C75A] text-white rounded-full text-sm"
          >
            새로고침
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
