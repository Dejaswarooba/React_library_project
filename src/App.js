import { Header } from "./components/header";
import "./styles.css";
import { SearchName } from "./components/SearchName";

export default function App() {
  return (
    <>
      <Header />
      <div className="App">
        <SearchName />
      </div>
    </>
  );
}
