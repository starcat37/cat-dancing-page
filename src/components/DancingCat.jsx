import { useState, useEffect } from 'react'
import catSvg from '../assets/images/cat.svg'
import './DancingCat.css'

function DancingCat() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState('normal')

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const changeSpeed = (speed) => {
    setAnimationSpeed(speed)
  }

  useEffect(() => {
    const catElement = document.querySelector('.cat-wrapper.dancing .cat-image')
    if (catElement) {
      catElement.style.animationDuration = animationSpeed === 'slow' ? '4s' :
                                           animationSpeed === 'fast' ? '1s' : '2s'
    }
  }, [animationSpeed, isAnimating])

  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      event.preventDefault()
      toggleAnimation()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isAnimating])

  return (
    <div className="dancing-cat-container">
      <div className={`cat-wrapper ${isAnimating ? 'dancing' : ''}`}>
        <img src={catSvg} alt="Dancing Cat" className="cat-image" />
      </div>
      <div className="controls">
        <button
          onClick={toggleAnimation}
          className="dance-button primary"
          aria-label={isAnimating ? '애니메이션 멈추기' : '애니메이션 시작하기'}
        >
          {isAnimating ? '🛑 멈추기' : '💃 춤추기'}
        </button>

        <div className="speed-controls">
          <span className="speed-label">속도:</span>
          <button
            onClick={() => changeSpeed('slow')}
            className={`speed-button ${animationSpeed === 'slow' ? 'active' : ''}`}
            disabled={!isAnimating}
          >
            🐌 느리게
          </button>
          <button
            onClick={() => changeSpeed('normal')}
            className={`speed-button ${animationSpeed === 'normal' ? 'active' : ''}`}
            disabled={!isAnimating}
          >
            🚶 보통
          </button>
          <button
            onClick={() => changeSpeed('fast')}
            className={`speed-button ${animationSpeed === 'fast' ? 'active' : ''}`}
            disabled={!isAnimating}
          >
            🏃 빠르게
          </button>
        </div>
      </div>

      <div className="instructions">
        <p>💡 스페이스바를 눌러서도 애니메이션을 제어할 수 있어요!</p>
      </div>
    </div>
  )
}

export default DancingCat