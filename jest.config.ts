import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "@tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
