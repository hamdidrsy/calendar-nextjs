import React from 'react'
import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onDismiss
}) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">!</span>
        <p className="error-text">{message}</p>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="error-btn retry">
            Tekrar Dene
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="error-btn dismiss">
            Kapat
          </button>
        )}
      </div>
    </div>
  )
}
