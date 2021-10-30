import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Characteristic, Group } from ".";

@Entity()
export default class Animal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  genre!: string;

  @Column()
  age!: number;

  @Column()
  weight!: number;

  @ManyToOne(() => Group, (group) => group.animals)
  @JoinColumn({ name: "group_id" })
  group!: Group;

  @ManyToMany(() => Characteristic)
  @JoinTable({
    name: "animal_characteristic",
    joinColumn: { name: "animal_id" },
    inverseJoinColumn: { name: "characteristic_id" },
  })
  characteristics!: Characteristic[];
}
