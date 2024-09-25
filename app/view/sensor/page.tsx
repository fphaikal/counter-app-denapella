'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Date from "@/app/utils/displayDate";
import { HomeIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Data {
  id: number;
  timestamp: number | Date;
  value: number;
}

export default function Page({
  searchParams,
}: {
  searchParams: { [id: string]: string | string[] | undefined }
}) {
  const router = useRouter();
  const id = Number(searchParams.id);
  const [datas, setDatas] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (sensorId: number) => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await fetch(`http://192.168.68.120:4000/api/sensor?id=${sensorId}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setDatas(data.results);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id); // Fetch data for the current sensor ID
    const interval = setInterval(() => fetchData(id), 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [id]); // Depend on 'id'

  // Function to handle navigation
  const handleNavigation = (newId: number) => {
    router.push(`/view/sensor?id=${newId}`);
    fetchData(newId); // Fetch new data immediately
  };

  if (loading) {
    return (
      <div className="flex flex-col p-20 min-h-screen gap-5">
        <div className="flex gap-2">
          <h1 className="text-3xl font-semibold">Sensor {id}</h1>
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  }

  if (id > 4) {
    return (
      <div className="flex flex-col p-20 gap-2 justify-center items-center h-screen">
        <h1 className="text-4xl font-semibold">Invalid Sensor Id</h1>
        <p className="text-lg">Sensor {id} does not exist</p>
        <Button className="mt-4" asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-20 gap-5">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-3xl font-semibold">Sensor {id}</h1>
          <div className="flex gap-2">
            {id > 1 && (
              <button onClick={() => handleNavigation(id - 1)}>
                <ChevronLeft />
              </button>
            )}
            <Link href="/">
              <HomeIcon />
            </Link>
            {id < 4 && (
              <button onClick={() => handleNavigation(id + 1)}>
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
        <Table>
          <TableCaption>A list of your recent sensor datas {id}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Data tidak ada
                </TableCell>
              </TableRow>
            ) : (
              datas.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    <Date dateString={data.timestamp} />
                  </TableCell>
                  <TableCell>{data.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}
