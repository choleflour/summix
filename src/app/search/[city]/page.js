import { Renderer } from "./renderer";

export default async function Search ({params})  {
    const city = (await params).city;

    return <div>
        {city}
        <Renderer city={city} />
    </div>
}
