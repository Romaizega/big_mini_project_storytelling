import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStory } from '../features/stories/createStorySlice'
import { type RootState, type AppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'
import StoryContributors from './StoryContributors'

const CreateStoryPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [createdStoryId, setCreatedStoryId] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status, error } = useSelector((state: RootState) => state.createStory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(createStory({ title, content }))
    if (createStory.fulfilled.match(result)) {
      setCreatedStoryId(result.payload.id)
     
    }
  }

  const handleFinish = () => {
    navigate('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Story</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!!createdStoryId}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!!createdStoryId}
        />
        {!createdStoryId && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Creating...' : 'Create Story'}
          </button>
        )}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
      </form>

      {createdStoryId && (
        <div className="mt-10">
          <StoryContributors storyId={createdStoryId} />
          <button
            onClick={handleFinish}
            className="btn btn-success mt-6"
          >
            Finish & Go to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}

export default CreateStoryPage
