import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { In } from "typeorm";
import { Country } from "../entities/Country";

@Resolver(Country)
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await Country.find({
            relations: { region: true },
        });
    }

    @Query(() => Country, { nullable: true })
    async country(@Arg("countryCode") countryCode: string) {
        return Country.findOne({
            relations: { region: true },
            where: { countryCode },
        });
    }

    @Mutation(() => Country)
    async createCountry(
        @Arg("countryCode") countryCode: string,
        @Arg("countryName") countryName: string,
        @Arg("countryFlag") countryFlag: string
    ) {
        const country = Country.create({
            countryCode,
            countryName,
            countryFlag,
        });
        return Country.save(country);
    }
}
