import React, { useState } from 'react'

export const AllNotes = (props) => { 
  const [isExpanded, setExplanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    command: ""
})  

  function handleChange(event){
    const {name, value} = event.target
  }

  return (
    <div>AllNotes</div>
  )
}
