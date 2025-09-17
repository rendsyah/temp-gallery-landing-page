import type { NextRequest } from 'next/server';
import type { Context } from '@/types/commons.types';
import { Api } from '@/libs/constants/api.const';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest, context: Context<{ filename: string[] }>) => {
  const { filename } = await context.params;

  const path = filename.join('/');
  const target = `${Api.API_MEDIA_URL}/${path}`;
  const response = await fetch(target);

  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=86400'); // 1 Days

  return new Response(response.body, {
    status: 200,
    headers,
  });
};
