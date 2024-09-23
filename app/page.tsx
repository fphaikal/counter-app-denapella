import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-screen w-full gap-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold">Counter App Denapella</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 px-32">
        <Link href={'/view/sensor?id=1'} className="flex flex-col bg-gradient-to-br from-dark-2 to-dark border-dark border-2 shadow-lg rounded-lg p-10 text-center hover:-translate-y-4 hover:scale-105 duration-300">
          <p className="text-lg">Sensor 1</p>
          <h1 className="text-6xl font-bold">10</h1>
        </Link>
        <Link href={'/view/sensor?id=2'} className="flex flex-col bg-gradient-to-br from-dark-2 to-dark border-dark border-2 shadow-lg rounded-lg p-10 text-center hover:-translate-y-4 hover:scale-105 duration-300">
          <p className="text-lg">Sensor 2</p>
          <h1 className="text-6xl font-bold">10</h1>
        </Link>
        <Link href={'/view/sensor?id=3'} className="flex flex-col bg-gradient-to-br from-dark-2 to-dark border-dark border-2 shadow-lg rounded-lg p-10 text-center hover:-translate-y-4 hover:scale-105 duration-300">
          <p className="text-lg">Sensor 3</p>
          <h1 className="text-6xl font-bold">10</h1>
        </Link>
        <Link href={'/view/sensor?id=4'} className="flex flex-col bg-gradient-to-br from-dark-2 to-dark border-dark border-2 shadow-lg rounded-lg p-10 text-center hover:-translate-y-4 hover:scale-105 duration-300">
          <p className="text-lg">Sensor 4</p>
          <h1 className="text-6xl font-bold">10</h1>
        </Link>
      </div>
    </div>
  );
}
