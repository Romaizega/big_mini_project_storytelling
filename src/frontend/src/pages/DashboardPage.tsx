import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { fetchStories } from '../features/stories/storieSlice'
import { deleteStory } from '../features/stories/deleteStoryslice'
import { type RootState } from '../app/store'
import { Link } from 'react-router-dom'


const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { stories, status, error } = useSelector((state: RootState) => state.stories)
  const deleteStatus = useSelector((state: RootState) => state.deleteStory.status)

  useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  useEffect(() => {
  if (deleteStatus === 'succeeded') {
    dispatch(fetchStories())
  }
}, [deleteStatus, dispatch])

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this story?')) {
      dispatch(deleteStory(id))
    }
  }

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.username} 🎉</h1>
          <Link to="/create" className="btn btn-primary">+ New Story</Link>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4">All Stories</h2>

          {status === 'loading' && <p>Loading stories...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {status === 'succeeded' && stories.length === 0 && (
            <p className="text-gray-500">No stories found.</p>
          )}

          {status === 'succeeded' && stories.map((story) => (
            <div key={story.id} className="p-4 mb-4 border rounded shadow bg-white">
              <h3 className="text-lg font-bold">{story.title}</h3>
              <p className="text-sm text-gray-700">{story.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                Created: {new Date(story.created_at).toLocaleDateString()}
              </p>

              {user?.id === story.author_id && (
                <div className="mt-2 flex gap-2">
                  <Link
                    to={`/stories/${story.id}/edit`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(story.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
