const db = require('../db/knex')

const getUserById = async(req, res) => {
  const id = Number(req.params.id)
  try {
    const user = await db('Users')
    .where({id}).first()
    if(!user){
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).json({message: "User found successfully", user})
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Server error"})    
  }
}

module.exports = { 
  getUserById,
}