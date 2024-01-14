import { useEffect, useState } from 'react';

import api from '@/lib/apiClient';

function App() {
  const [greeting, setGreeting] = useState('loading...');

  useEffect(() => {
    console.log(api.hi.$path()); // TODO: これでpathを取得できるので、swrで使えそう
    api.hi.$get().then((res) => {
      setGreeting(res.hello);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>{greeting}</p>
    </>
  );
}

export default App;
