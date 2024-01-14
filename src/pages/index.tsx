import { useEffect, useState } from 'react';

import api from '@/lib/apiClient';
import { Header } from '@/components/Header';

function App() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState('loading...');

  useEffect(() => {
    console.log(api.hi.$path()); // TODO: これでpathを取得できるので、swrで使えそう
    api.hi.$get().then((res) => {
      setGreeting(res.hello);
    });
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{greeting}</p>
    </>
  );
}

export default App;
