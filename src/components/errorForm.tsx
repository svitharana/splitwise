interface Props {
  errorMsg: string;
}

export default function ErrorForm({ errorMsg }: Props) {
  return <span className="text-xs font-medium text-red-500">{errorMsg}</span>;
}
