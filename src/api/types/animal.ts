interface Name {
  name: string;
}

interface Group extends Name {
  scientific_name: string;
}

export interface AnimalPayload {
  name: string;
  age: number;
  weight: number;
  genre: string;
  characteristics: Name[];
  group: Group;
}
