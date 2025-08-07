import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../app/axios'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateStory } from '../features/stories/updateStorySlice'
import StoryContributors from './StoryContributors'

const EditStoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get(`/stories/${id}`)
        const story = res.data

        if (user?.id !== story.author_id) {
          setError('You are not authorized to edit this story.')
          return
        }

        setTitle(story.title)
        setContent(story.content)
        setLoading(false)
      } catch (err: any) {
        setError('Failed to load story')
      }
    }

    fetchStory()
  }, [id, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(updateStory({ id: Number(id), title, content }))
    if (updateStory.fulfilled.match(result)) {
      navigate('/dashboard')
    } else {
      setError(result.payload as string)
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full h-40"
        />
        <button className="btn btn-primary w-full" type="submit">Update Story</button>
      </form>

      <div className="mt-10 border-t pt-6">
        <StoryContributors storyId={Number(id)} />
      </div>
    </div>
  )
}

export default EditStoryPage
