import Map from "../components/Map";
import Nav from "../components/Nav";
export default function Dashboard() {
    return (
        <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="absolute inset-0">
                <Map />
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-10">
                <Nav />
            </div>
        </div>
    )
}