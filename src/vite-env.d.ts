/// <reference types="vite/client" />

interface ImportMetaEnv{
    readonly VITE_BACKEND_URL : string
    // mmore env variables..
}

interface ImportMeta{
    readonly env : ImportMetaEnv
}