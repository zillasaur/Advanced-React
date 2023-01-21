import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    // setting initial values
    name: 'Nice Shoes',
    price: 1234,
    description: 'Sick Kicks',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={(e) => handleChange(e)}
        />
      </label>
    </form>
  );
}
