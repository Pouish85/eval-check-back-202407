import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Country } from "./Country";

@ObjectType()
@Entity()
export class Region {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Country])
  @OneToMany(() => Country, country => country.region)
  countries: Country[];
}
