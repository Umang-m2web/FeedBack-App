import Card from './shared/Card'
import { useState, useEffect } from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'
import { useContext } from 'react'
function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [mesage, setMessage] = useState('')
  const { Add_Feedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setBtnDisabled(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text Must Be At Least 10 Character')
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const New_Feedback = {
        text,
        rating,
      }

      // called when exiting feedback is updated otherwise else...

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, New_Feedback)
      } else {
        Add_Feedback(New_Feedback)
      }
      setText('')
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2> How Would You Rate Your Service With Us ? </h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="Write a review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            ADD
          </Button>
        </div>
        {mesage && <div className="message">{mesage}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
