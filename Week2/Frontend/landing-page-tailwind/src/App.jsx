import { Header } from "./components/header"
import { Article } from "./components/article"
import { Cards } from "./components/cards"

export default function App() {
  return (
    <div className="App md:m-[4rem] sm:m-[1rem]">
      <Header />
      <Article />
      <Cards />
    </div>
  )
}