interface Props {
  message: string;
}

export default function ErrorState({ message }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-20 text-center animate-fadeIn">
      <p className="text-red-500 text-lg font-medium">{message}</p>
      <a
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
      >
        Retry
      </a>
    </div>
  );
}
