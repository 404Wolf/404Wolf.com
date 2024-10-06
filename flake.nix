{
  description = "Wolf's Personal Website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.corepack_22
            pkgs.bun
            pkgs.openssl
            pkgs.prisma-engines
            pkgs.swagger-cli
          ];
          shellHook = ''
            export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
            export PRISMA_MIGRATION_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
            export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
            export PATH="$PWD/node_modules/.bin/:$PATH"
            npx prisma generate
          '';
        };
      }
    );
}
