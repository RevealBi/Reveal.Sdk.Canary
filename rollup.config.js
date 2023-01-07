import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

import packageJson from './package.json' assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs"
            },
            {
                file: packageJson.module,
                format: "esm",
            },
            {
                name: "rvc",
                file: packageJson.unpkg,
                format: "umd"
            }
        ],
        plugins: [
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
        ]
    },
]