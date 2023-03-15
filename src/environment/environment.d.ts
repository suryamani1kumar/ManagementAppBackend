declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATA_BASE: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
