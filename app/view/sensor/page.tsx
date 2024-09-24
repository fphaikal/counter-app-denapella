'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Date from "@/app/utils/displayDate";

interface Data{
  id: number;
  timestamp: number | Date;
  value: number;
}

export default function Page({
  searchParams,
}: {
  searchParams: { [id: string]: string | string[] | undefined }
}) {
  const id = Number(searchParams.id);

  const [datas, setDatas] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch(`http://localhost:4000/api/sensor?id=${id}`)
        if(!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json();
        setDatas(data.results)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    setInterval(() => {
      fetchData()
    }, 5000)
  })
  if (id > 4) {
    return (
      <>
        <div className="flex flex-col p-20 gap-2 justify-center items-center h-screen">
          <h1 className="text-4xl font-semibold">Invalid Sensor Id</h1>
          <p className="text-lg">Sensor {id} does not exist</p>
          <Button className="mt-4" asChild>
            <Link href="/">
              Go back to home
            </Link>
          </Button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col p-20 min-h-screen gap-5">
          <div className="flex gap-2">
            <h1 className="text-3xl font-semibold">Sensor {id}</h1>
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
              {datas.map((data) => (
                <TableRow key={data.id}>
                  <TableCell><Date dateString={data.timestamp} /></TableCell>
                  <TableCell>{data.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    )
  }
}