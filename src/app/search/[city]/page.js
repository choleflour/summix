import { Renderer } from "./Renderer";

export default async function Search ({params})  {
    const city = (await params).city;

    return <div>
        <Renderer city={city} />
    </div>
}
