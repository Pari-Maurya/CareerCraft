// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = ({ fullscreen = false, size = 'md', text = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-2 border-ink-200 border-t-ember-500 rounded-full animate-spin`} />
      {text && <p className="text-sm text-ink-500 font-body">{text}</p>}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-ink-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-ink-200 border-t-ember-500 rounded-full animate-spin" />
          <p className="font-display text-lg text-ink-700">CareerCraft</p>
        </div>
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner