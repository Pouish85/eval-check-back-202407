import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Region } from "./Region";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    countryCode: string;

    @Field()
    @Column()
    countryName: string;

    @Field()
    @Column()
    countryFlag: string;

    @Field(() => Region)
    @ManyToOne(() => Region, (region) => region.countries)
    region: Region;
}
