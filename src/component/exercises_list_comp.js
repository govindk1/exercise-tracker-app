import React, {useState, useEffect} from 'react'
import axios from 'axios'
var moment = require('moment');

const ExercisesList = () => {

    const [k1, setk1] = useState({hits:[]});

    useEffect(() => {

        async function all_exercises(){
            const response = await axios.get('http://localhost:5000/exercises/')
            
            
            setk1({hits:[...response.data]})
            
        }
            
       all_exercises()
        
    }, [])

    
    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

          {!k1.hits.length}{
    
            k1.hits.map((exercise) =>  {

                

                return(
                    <tr key={k1.id}>
                    <td key={k1.id}>{exercise.username}</td>
                    <td key={k1.id}>{exercise.description}</td>
                    <td key={k1.id}>{exercise.duration}</td>
                    <td key={k1.id}>{moment(exercise.date).utc().format('MM/DD/YYYY')}</td>
                    
                </tr>
                )}
            )
          }
            
          </tbody>
        </table>
        </div>
    )
}

export default ExercisesList
