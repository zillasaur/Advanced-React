import { useState } from 'react';

export default function useForm(initial = {}) {
  // create state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  // return things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
  };
}
