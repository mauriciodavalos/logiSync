import { useEffect, useState } from 'react';
import './App.css';
import { Ruta } from './types.d';

function App() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/rutas')
      .then((res) => res.json())
      .then((data) => {
        const rutasArray = data.data.rutas;
        setRutas(rutasArray);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, []);

  return (
    <div>
      <Header />
      <section>
        <CrearRuta />
      </section>
      <hr className="border-t border-gray-400 my-4 w-10/12 mx-auto" />
      <section className="mt-5">
        <h1 className="text-3xl text-center font-bold">Rutas Disponibles</h1>
        <BuscarRutas rutas={rutas} />
      </section>
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
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
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

function BuscarRutas({ rutas }: { rutas: Ruta[] }) {
  const [selected, SetSelected] = useState<Ruta | null>(null);

  function handleSelected(selection: Ruta) {
    SetSelected(selection);
  }

  return (
    <>
      <div className="flex grid-cols-2">
        <div className="m-3 ">
          {rutas
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
            })}
        </div>
        <div className="hidden md:block fixed right-5 h-screen w-3/5 bg-white overflow-auto">
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
