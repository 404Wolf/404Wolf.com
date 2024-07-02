async function writeHelloWorld() {
  const vaultRoot = this.app.vault.adapter.getBasePath();
  const filePath = `${vaultRoot}/foo/bar.md`;

  // Ensure the directory exists
  await this.app.vault.adapter.mkdir(`${vaultRoot}/foo`);

  // Write 'hello world' to the file
  await this.app.vault.adapter.write(filePath, "hello world");
}
