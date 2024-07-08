import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { Region } from "../entities/Region";

@Resolver(Country)
export default class CountryResolver {
    @Query(() => [Country])
    async countries() {
        return await Country.find({
            relations: { region: true },
        });
    }

    @Query(() => [Country])
    async countriesByRegion(@Arg('regionId') regionId: number) {
        return await Country.find({
            relations: { region: true },
            where: { region: { id: regionId} },
        });
    }

    @Query(() => Country, { nullable: false })
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
        @Arg("countryFlag") countryFlag: string,
        @Arg('regionId') regionId: number
    ) {
        const region = await Region.findOne({where : {id: regionId}});
        if (!region) {
            throw new Error('Region not found');
        }
        const country = new Country();
        country.countryCode = countryCode;
        country.countryName = countryName;
        country.countryFlag = countryFlag;
        country.region = region;
        await Country.save(country);
        return country;
    }
}
