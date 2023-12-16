import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Routing from './Components/Routes/Routes.tsx'

function App() {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        limit={8}
      />

      <article className='Root-wrapper overflow-hidden h-screen'>
        <main className='h-full w-full overflow-y-auto'>
          <Routing />
        </main>
      </article>
    </>
  );
}

export default App;
