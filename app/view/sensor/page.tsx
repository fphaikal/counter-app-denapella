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

const datas = [
  {
    data: "1",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    data: "2",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    data: "3",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    data: "4",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    data: "5",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    data: "6",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    data: "7",
    timestamp: "2024-20-10 10:00:00",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function Page({
  searchParams,
}: {
  searchParams: { [id: string]: string | string[] | undefined }
}) {
  const id = Number(searchParams.id);

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
                <TableRow key={data.data}>
                  <TableCell>{data.timestamp}</TableCell>
                  <TableCell>{data.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    )
  }
}