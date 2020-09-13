import React from "react";
import "Styles/App.scss";
import AppRouter from "AppRouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call it once in your app. At the root of your app is the best place
toast.configure();
function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
