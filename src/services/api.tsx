const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }

  return response.json();
}