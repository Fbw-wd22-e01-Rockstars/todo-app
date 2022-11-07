import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import Filebase64 from "react-file-base64"
import { useNavigate } from 'react-router-dom'

function Dashboard({authorized}) {

    const user = localStorage.getItem("profile")

    const [image, setImage] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(false);

    const navigate = useNavigate()
    

    // Component will mount
    useEffect(() => {
      if (!authorized) {
        navigate("/signin")
      }
    }, [])

    // Component will demount
    useEffect(() => {
      console.log("component is demounted")
      // it isa way to do something, when we are demounting this component
      return(() => {
        // we clear those effects or memories that are no more required in our APP
      })
    }, [])

    const postRequestHandler = async (e) => {
        e.preventDefault();
        const data = { title, description, image };
        await axios.post(`${process.env.REACT_APP_BE_URL}/dashboard/create-todo`, data, {headers: { // first parameter = URL where we want to display, second = the data we want to pass, third = configurations
          "authorization": `Bearer ${localStorage.getItem("toDoToken")}`
        }});
        console.log(data);
        setMessage(true);
        setTitle("");
        setDescription("");
        setImage("");
      };

    return (
        <div>
      {authorized ? (
        <form action="post" onSubmit={postRequestHandler}>
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              placeholder="Title of the task"
            />
          </div>
          <div>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <Filebase64
              multiple={false}
              onDone={({ base64 }) => {
                setImage(base64);
              }}
            />
          </div>

          <button type="submit">Insert</button>
          <hr />
          {message ? (
            <h3 style={{ color: "green" }}>Data inserted successfully!</h3>
          ) : (
            ""
          )}
        </form>
      ) : (
        "Log in first!"
      )}
    </div>
    )
}

export default Dashboard
