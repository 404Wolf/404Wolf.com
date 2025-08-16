import * as path from "path";
import About from "src/404wolf/About";
import MyPlugin from "src/main";
import { notify } from "src/utils/misc";
import { createFile } from "src/utils/vault";

export async function sync(plugin: MyPlugin) {
  const about = await About.new(plugin);

  const basicAbout = about.getBasicAboutData();
  const extendedAbout = about.getExtendedAboutData();

  notify("Syncing About data to the vault.");

  createFile(
    plugin.app.vault,
    path.join(plugin.settings.path, "About", "Basic About.md"),
    basicAbout,
  );
  createFile(
    plugin.app.vault,
    path.join(plugin.settings.path, "About", "Biography.md"),
    extendedAbout,
  );

  notify("Sync complete.");
}

export async function push(plugin: MyPlugin) {
  const about = await About.new(plugin);
  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile) {
    notify("No active file found. Please open a file to push the data.");
    return;
  }

  notify("Pushing data to the active");
  if (activeFile.name === "Biography.md")
    about.setExtendedAboutData(await plugin.app.vault.read(activeFile));
  else if (activeFile.name === "Basic About.md")
    about.setBasicAboutData(await plugin.app.vault.read(activeFile));
  else {
    notify("Please open the file you want to push the data to.");
    return;
  }
  await about.save();
  notify("Pushed the new bios.");
}
