import React,{useState, useEffect, useRef} from 'react'
import axios from  "axios"



function  CreateExercise() {
   
    const [createExercise, setcreateExcercise] = useState({
        username:'',
        description: '',
        duration: '',
        date:''
    })


    
    const [k1, setk1] = useState({hits:[]});

    
    
    useEffect(() => {

        async function all_users(){
            const response = await axios.get('http://localhost:5000/users/')

            setk1({hits:[...response.data, ...k1.hits]})
           console.log(k1)
        }

       all_users()
        
    }, [])
  

    const formsubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: createExercise.username,
            description: createExercise.description,
            duration: createExercise.duration,
            date: createExercise.date
          }
        
        axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
    }
    return (
        <div>
        <h3>Create New Exercise Log</h3>
      <form onSubmit={formsubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
          required
          className="form-control">
          
          {!k1.hits}{
            
            k1.hits.map(function(user) {
              return <option 
                key={user.username}
                value={user.username}>{user.username}
                </option>;
            })
        
          }
      </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  id="hell" type="text"
              required
              className="form-control"
              value={createExercise.description}
              onChange={(e) => setcreateExcercise({...createExercise,description:e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={createExercise.duration}
              onChange={(e) => setcreateExcercise({...createExercise,duration:e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
          <input  type="date"
          required
          className="form-control"
          value={createExercise.date}
          onChange={(e) => setcreateExcercise({...createExercise,date:e.target.value})}
          />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>

      </div>
    )
}

export default  CreateExercise
