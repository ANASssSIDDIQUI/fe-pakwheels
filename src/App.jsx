import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import AddNewListing from "./pages/AddNewListing";
import Navbar from "./components/NavBar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<CarListing />} />
      <Route path="/details/:id" element={<CarDetails />} />
      <Route path="/add-new" element={<AddNewListing />} />
    </Route>
  )
);

function App() {
  return( 
    <><Navbar /><RouterProvider router={router} /></>
  )
  
}

export default App;
