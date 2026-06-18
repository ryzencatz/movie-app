import { useState } from "react"

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  return (<div className="border border-zinc-500 py-3 px-4 rounded-md bg-zinc-700">
    <h2 className="text-xl font-bold ">{title}</h2>
    <button onClick={() => setHasLiked(true)}>Like</button> 
  </div>)
}


const App = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-[10px] py-10">
      <Card title="Star Wars"/>
      <Card title="Avatar"/>
      <Card title="The Lion Car"/>
    </div>
  )
}

export default App