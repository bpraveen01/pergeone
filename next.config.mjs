const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default { output: "export", basePath: base, trailingSlash: true, images: { unoptimized: true } };
