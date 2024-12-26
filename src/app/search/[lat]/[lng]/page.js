import { Renderer } from "./Renderer";
export default async function Search ({params})  {
    // const city = (await params).city;
    const lat = (await params).lat;
    const lng = (await params).lng;
    console.log("Search", lat, lng);

    if (!lat || !lng) {
        return <div>Loading location...</div>;
    }

    const userLocation = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
    };

    return <div>
        <Renderer userLocation={userLocation} />
    </div>
}
