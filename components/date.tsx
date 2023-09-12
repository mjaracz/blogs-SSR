import { parseISO, format } from 'date-fns';

export default function Date(props: { date: string }) {
  const date = parseISO(props.date);
  return <time dateTime={props.date}>{format(date, 'LLLL d, yyyy')}</time>
}