export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [id: string]: string | string[] | undefined }
}) {
  const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id;

  return (
    <h1>My Page {params.slug}</h1>
  )
}