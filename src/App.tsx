import { useEffect, useState } from 'react';
import './App.css';
import { Ruta } from './types.d';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <BuscarRutas />
              </div>
            }
          />
          <Route
            path="/CrearRuta"
            element={
              <div>
                <CrearRuta />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center">LogiSync</h1>
        <nav>
          <ul className="flex space-x-4 justify-center mt-2">
            <li>
              <NavLink to="/" className="hover:underline">
                Buscar Rutas
              </NavLink>
            </li>
            <li>
              <NavLink to="/CrearRuta" className="hover:underline">
                Crear Ruta
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function CrearRuta() {
  const [formValues, setFormValues] = useState({
    company: '',
    vehicleType: '',
    startPoint: '',
    endPoint: '',
    initialDate: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRuta = JSON.stringify(formValues);

    try {
      console.log(newRuta);

      const response = await fetch('http://localhost:8000/api/v1/rutas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: newRuta,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success:', responseData);
      } else {
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send the request:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
        Crear tu próxima Ruta
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company">
            Compañía
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="text"
            placeholder="Nombre de tu compañía"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType">
            Tipo de Vehículo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleType"
            type="text"
            placeholder="Tipo de vehículo"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType">
            Inicio
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startPoint"
            type="text"
            placeholder="Punto de Inicio"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType">
            Destino
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endPoint"
            type="text"
            placeholder="Punto de Destino"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType">
            Fecha de Recoleccion
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="initialDate"
            type="date"
            placeholder="Fecha de Recoleccion"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleType">
            Precio
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Precio en Pesos MXN"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit">
            Crear mi ruta
          </button>
        </div>
      </form>
    </div>
  );
}

function BuscarRutas() {
  const [rutas, setRutas] = useState<Ruta | []>([]);
  const [selected, SetSelected] = useState<Ruta | null>(null);
  const [startFilter, setStartFilter] = useState('');
  const [endFilter, setEndFilter] = useState('');

  useEffect(() => {
    fetch('http://13.58.174.167:8000/api/v1/rutas')
      .then((res) => res.json())
      .then((data) => {
        const rutasArray = data.data.rutas;
        setRutas(rutasArray);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, []);

  function handleSelected(selection: Ruta) {
    SetSelected(selection);
  }

  const filteredRutas: Ruta[] = rutas.filter((ruta) => {
    return (
      (startFilter === '' ||
        ruta.startPoint.toLowerCase().includes(startFilter.toLowerCase())) &&
      (endFilter === '' ||
        ruta.endPoint.toLowerCase().includes(endFilter.toLowerCase()))
    );
  });

  return (
    <>
      <div className="max-w-md mx-auto mt-5 p-8 bg-white shadow-md rounded-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Selecciona el punto de Inicio
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Filtrar por Punto de inicio"
            onChange={(e) => setStartFilter(e.target.value)}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Selecciona el punto de Destino
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Filtrar por Punto de final"
            onChange={(e) => setEndFilter(e.target.value)}
          />
        </label>
      </div>
      <div className="flex grid-cols-2 justify-center">
        <div className="m-3 ">
          {filteredRutas.length > 0 ? (
            filteredRutas
              .sort((b, a) => a.company.localeCompare(b.company))
              .map((ruta) => {
                return (
                  <div
                    key={ruta._id}
                    className="relative rounded-xl overflow-auto p-8 border-solid border mx-auto text-center mt-1">
                    <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                      {ruta.company}
                    </h1>
                    <ul className="list-disc text-left">
                      <li>Topo de vehiculo: {ruta.vehicleType}</li>
                      <li>Punto de Inicio: {ruta.startPoint}</li>
                      <li>Punto de Destino: {ruta.endPoint}</li>
                      <li>
                        Fecha de inicio:{' '}
                        {ruta.initialDate.toLocaleString().slice(0, 10)}
                      </li>
                      <li>Precio: {ruta.price}</li>
                      <li>
                        {ruta.availability === true
                          ? '¡Disponible!'
                          : 'No Disponible'}
                      </li>
                    </ul>
                    <button
                      className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm mt-2"
                      onClick={() => handleSelected(ruta)}>
                      ¡Agendar!
                    </button>
                  </div>
                );
              })
          ) : (
            <div>
              <h1>No Existe ninguna ruta que se adecue a tus necesidades</h1>
              <h1>Solicita una ruta para que un transportista te ayude</h1>
              <button className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm mt-2">
                Solicitar una Ruta
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block fixed right-5 h-screen w-1/3 bg-white overflow-auto">
          <SelectedRuta selected={selected} />
        </div>
      </div>
    </>
  );
}

function SelectedRuta({ selected }: { selected: Ruta | null }) {
  return (
    <>
      {selected ? (
        <div className="m-5">
          <div className="relative rounded-xl overflow-auto p-8 text-center border-solid border">
            <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
              {selected.company}
            </h1>
            <ul className="border-solid list-disc text-left">
              <li>Topo de vehiculo: {selected.vehicleType}</li>
              <li>Punto de Inicio: {selected.startPoint}</li>
              <li>Punto de Destino: {selected.endPoint}</li>
              <li>Punto de Destino: {selected.endPoint}</li>
              <li>
                Fecha de inicio:{' '}
                {selected.initialDate.toLocaleString().slice(0, 10)}
              </li>
              <li>Precio: {selected.price}</li>
              <li>
                {selected.availability === true
                  ? '¡Disponible!'
                  : 'No Disponible'}
              </li>
            </ul>
            <button className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm mt-2">
              ¡Agendar Recoleccion!
            </button>
          </div>
        </div>
      ) : (
        <div>No Ruta Selected</div>
      )}
    </>
  );
}

export default App;
