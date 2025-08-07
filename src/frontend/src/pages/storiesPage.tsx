import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchStories } from '../features/stories/storieSlice'

const StoriesPage = () => {
  const dispatch = useAppDispatch()
  const { stories, status, error } = useAppSelector((state) => state.stories)

  useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stories</h1>
      {stories.map((story) => (
        <div key={story.id} className="mb-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{story.title}</h2>
          <p>{story.content}</p>
        </div>
      ))}
    </div>
  )
}

export default StoriesPage
