import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  is_superuser!: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
