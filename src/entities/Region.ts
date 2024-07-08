import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Country } from "./Country";

@ObjectType()
@Entity()
export class Region extends BaseEntity{
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
