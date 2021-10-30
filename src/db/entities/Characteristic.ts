import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Animal } from ".";

@Entity()
export default class Characteristic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Animal)
  @JoinTable({
    name: "animal_characteristic",
    joinColumn: { name: "characteristic_id" },
    inverseJoinColumn: { name: "animal_id" },
  })
  animals!: Animal[];
}
