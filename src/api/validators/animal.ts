import { object, string, number, array } from "yup";

export default object({
  name: string().required(),
  age: number().required(),
  weight: number().required(),
  genre: string().required(),
  characteristics: array().of(
    object({
      name: string().required(),
    })
  ),
  group: object({
    name: string().required(),
    scientific_name: string().required(),
  }),
});
