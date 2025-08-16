import { Vault } from "obsidian";
import { join } from "path";
import { notify } from "./misc";

/**
 * Creates a text file in the vault.
 * @param {Vault} vault The Obsidian vault.
 * @param {string} name The file name for the file to create.
 * @param {string} contents The contents of the file.
 * @param {boolean} parents Whether to create the parent folders if they don't exist.
 * @param {boolean} modify Whether to modify the file if it already exists.
 * @returns A list of all the files in the vault.
 */
export async function createFile(
  vault: Vault,
  name: string,
  contents: ArrayBuffer,
  parents?: boolean,
  modify?: boolean,
): Promise<void>;
export async function createFile(
  vault: Vault,
  name: string,
  contents: string,
  parents?: boolean,
  modify?: boolean,
): Promise<void>;
export async function createFile(
  vault: Vault,
  name: string,
  contents: string | ArrayBuffer,
  parents: boolean = true,
  modify: boolean = true,
): Promise<void> {
  try {
    if (parents) {
      const path = name.split("/");
      path.pop();
      await createPath(vault, join(...path));
    }
    if (typeof contents === "object") await vault.createBinary(name, contents);
    else if (typeof contents === "string") await vault.create(name, contents);
  } catch (error) {
    try {
      const file = vault.getFileByPath(name);
      if (file !== null && modify) {
        if (typeof contents === "object")
          await vault.modifyBinary(file, contents);
        else await vault.modify(file, contents);
      }
    } catch (error) {
      notify("Failed to create file.");
    }
  }
}

/**
 * Returns a list of all the files in the folder.
 * @param {Vault} vault The Obsidian vault.
 */
export async function getFolderFiles(vault: Vault, path: string) {
  const folder = vault.getFolderByPath(path);
  if (!folder) {
    notify("No files found in the folder.");
    return;
  }
  return Array.from(folder.children);
}

/**
 * Create a path in the vault if the path doesn't exist.
 * @param {Vault} vault The Obsidian vault.
 * @param {string} path The path to create.
 */
export async function createPath(vault: Vault, path: string) {
  try {
    await vault.createFolder(path);
  } catch (error) {}
}
