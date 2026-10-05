import { OpenAPI } from '@/modules/api';

OpenAPI.BASE = import.meta.env.VITE_API_URL || '';
