import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="m-auto">
        <Image
          src="/logo.png"
          alt="Denapella logo"
          width={200}
          height={200}
        />
       
      </div>
    </div>
  );
}
