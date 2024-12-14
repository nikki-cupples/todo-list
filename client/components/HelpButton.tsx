import { useState } from 'react'

function HelpButton() {
  const [isHelpVisible, setIsHelpVisible] = useState(false)

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible)
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <button
        onClick={toggleHelp}
        className="rounded-lg bg-blue-200 px-4 py-2 text-blue-900 shadow hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-500"
        aria-expanded={isHelpVisible}
        aria-controls="help-text"
      >
        Help
      </button>
      {isHelpVisible && (
        <>
          <p
            id="help-text"
            className="mt-2 rounded border border-blue-300 bg-blue-100 p-3 text-sm text-blue-700 shadow-lg"
          >
            Double-click on a task to edit it. Remember to save your changes!
          </p>
          <p
            id="help-text"
            className="mt-2 rounded border border-blue-300 bg-blue-100 p-3 text-sm text-blue-700 shadow-lg"
          >
            Tick to complete, cross to delete.
          </p>
        </>
      )}
    </div>
  )
}

export default HelpButton
