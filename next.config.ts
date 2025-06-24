import path from "path"
import { NextConfig } from "next"
import { Configuration } from "webpack"

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@": path.resolve(__dirname),
      }
    }
    return config
  },
}

export default nextConfig
