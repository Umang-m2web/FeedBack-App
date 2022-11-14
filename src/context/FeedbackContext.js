import { createContext, useState, useEffect } from 'react'
const FeedbackContext = createContext()
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sord=id&_order=desc')
    const data = await response.json()
    console.log(data)
    setFeedback(data)
    setIsLoading(false)
  }
  // add feedback
  const Add_Feedback = async (newFeedback) => {
    const response = await fetch('http://localhost:58020/feedback', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    console.log(data)
    setFeedback([data, ...feedback])
    setIsLoading(false)
  }
  // delete feedback
  const deletefeedBack = async (id) => {
    if (window.confirm('Are You Sure You Want To Delete ?')) {
      await fetch('http://localhost:58020/feedback/' + id, {
        method: 'delete',
      })
      setFeedback(feedback.filter((item) => item.id !== id))
      setIsLoading(false)
    }
  }
  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  // update feedback
  const updateFeedback = async (id, updItem) => {
    // console.log(id, updItem)
    const response = await fetch('http://localhost:58020/feedback/' + id, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(updItem),
    })
    const updData = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updData } : item))
    )
    setIsLoading(false)
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback, // fetching feedback
        Add_Feedback, // add feedback
        deletefeedBack, // delete
        editFeedback, // edit feedback function
        feedbackEdit,
        isLoading, // for loader
        updateFeedback, // update feedback function
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext
