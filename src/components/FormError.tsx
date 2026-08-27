type FormErrorProps = {
  message?: string;
};

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className="mt-1 ml-3 text-sm text-red-500">
      {message}
    </p>
  );
}