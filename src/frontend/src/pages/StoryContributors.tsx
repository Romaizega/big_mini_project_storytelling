import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchContributors,
  addContributor,
  deleteContributor
} from '../features/contributors/contributorSlice'

interface Props {
  storyId: number
}

const StoryContributors = ({ storyId }: Props) => {
  const dispatch = useAppDispatch()
  const { list, status, error } = useAppSelector((state) => state.contributors)
  const [userId, setUserId] = useState<number | ''>('')

  useEffect(() => {
    dispatch(fetchContributors(storyId))
  }, [dispatch, storyId])

  const handleAdd = () => {
    if (userId) {
      dispatch(addContributor({ story_id: storyId, user_id: Number(userId) }))
        .then(() => dispatch(fetchContributors(storyId)))
      setUserId('')
    }
  }

  const handleDelete = (id: number) => {
    dispatch(deleteContributor(id))
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Contributors</h3>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {list.map((contributor) => (
          <li key={contributor.id} className="flex justify-between items-center bg-base-200 p-2 rounded">
            <span>{contributor.username}</span>
            <button
              onClick={() => handleDelete(contributor.id)}
              className="btn btn-xs btn-error"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="input input-bordered"
          placeholder="User ID"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

export default StoryContributors
