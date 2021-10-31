import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Animal } from ".";

@Entity()
export default class Group {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column()
  scientific_name!: string;

  @OneToMany(() => Animal, (animal) => animal.group)
  animals?: Animal[];
}
