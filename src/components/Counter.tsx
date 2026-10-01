import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
    >
      Clicked {count} times
    </button>
  );
}
