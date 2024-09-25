'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Date from "./utils/displayDate";

interface Sensor{
  id: number;
  sensorId: number;
  lastValue: number | null;
  name: string;
  description: string | null;
  status: string | null;
  lastUpdate: number | Date;
}

export default function Datas() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.68.120:4000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSensors(data.results);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setInterval(() => {
      fetchData();
    }, 1000)
  }, []);

  if (loading) return(
    <div className="flex flex-col justify-center h-screen w-full gap-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center mt-10 md:mt-0">
        <h1 className="text-3xl font-semibold">Counter App Denapella</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 md:px-32 w-full">
        <Skeleton className="h-44 w-full rounded-lg" />
        <Skeleton className="h-44 w-full rounded-lg" />
        <Skeleton className="h-44 w-full rounded-lg" />
        <Skeleton className="h-44 w-full rounded-lg" />
      </div>
    </div>
  )
  if (error) return(
    <div className="">Error: {error}</div>
  )

  return(
    <div className="flex flex-col justify-center min-h-screen w-full gap-4 md:gap-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center mt-10 md:mt-0">
        <h1 className="text-3xl font-semibold">Counter App Denapella</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 md:px-32 w-full">
        {sensors.map((data) => (
        <Link key={data.id} href={`/view/sensor?id=${data.sensorId}`} className="flex flex-col gap-2 bg-gradient-to-br from-dark-2 to-dark border-dark border-2 shadow-lg rounded-lg p-10 text-center hover:-translate-y-4 hover:scale-105 duration-300">
          <p className="text-lg font-semibold">{data.name}</p>
          <h1 className="text-6xl font-bold">{data.lastValue}</h1>
          <h2 className="text-sm">
            <p>Last Update</p>
            <Date dateString={data.lastUpdate}></Date>
          </h2>
        </Link>
        ))}
      </div>
    </div>
  )
}