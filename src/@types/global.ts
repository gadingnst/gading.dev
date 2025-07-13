import { type NextPage } from 'next';

export type NextPageComponent<T> = NextPage<T>;

export interface NextPageProps<T = Record<string, string>> {
  params: Promise<T>;
  searchParams: Promise<{
    [key: string]: string|string[]|undefined;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpResponseJson<T = any, E = string[]> {
  code: number;
  message?: string;
  payload?: T;
  errors?: E;
}
