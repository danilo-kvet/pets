import { object, string, number, array, SchemaOf } from "yup";
import { AnimalPayload } from "../types/animal";

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
}) as SchemaOf<AnimalPayload>;
