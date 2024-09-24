import  { parseISO, format} from 'date-fns'

export default function Date({ dateString }: any) {
  const date = parseISO(dateString);

  return (
    <time>{format(date, 'd-L-y k:m:s')}</time>
  )
}