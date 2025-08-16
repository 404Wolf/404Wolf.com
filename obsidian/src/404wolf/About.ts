import MyPlugin from "src/main";

interface SpecialObjectNames {
  basicAbout: string;
  extendedAbout: string;
  resume: string;
}

interface SpecialObject {
  objectId: string;
  contents: string;
}

export default class About {
  private constructor(
    public plugin: MyPlugin,
    private basicAbout: SpecialObject,
    private extendedAbout: SpecialObject,
  ) {}

  static async new(plugin: MyPlugin): Promise<About> {
    const specialObjectNames = await About.getSpecialObjectNames(plugin);

    const basicAbout = {
      objectId: specialObjectNames.basicAbout,
      contents: await About.getSpecialObject(
        plugin,
        specialObjectNames.basicAbout,
      ),
    };

    const extendedAbout = {
      objectId: specialObjectNames.extendedAbout,
      contents: await About.getSpecialObject(
        plugin,
        specialObjectNames.extendedAbout,
      ),
    };

    return new About(plugin, basicAbout, extendedAbout);
  }

  getBasicAboutData = () => {
    return this.basicAbout.contents;
  };

  setBasicAboutData = (data: string) => {
    this.basicAbout.contents = data;
  };

  getExtendedAboutData = () => {
    return this.extendedAbout.contents;
  };

  setExtendedAboutData = (data: string) => {
    this.extendedAbout.contents = data;
  };

  save = async (basicAbout: boolean = true, extendedAbout: boolean = true) => {
    if (basicAbout) {
      await About.saveSpecialObject(
        this.plugin,
        this.basicAbout.objectId,
        this.basicAbout.contents,
      );
    }

    if (extendedAbout) {
      await About.saveSpecialObject(
        this.plugin,
        this.extendedAbout.objectId,
        this.extendedAbout.contents,
      );
    }
  };

  private static saveSpecialObject = async (
    plugin: MyPlugin,
    objectId: string,
    contents: string,
  ) => {
    const resp = await fetch(`${plugin.settings.domain}/api/objects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        object: objectId,
        secret: plugin.settings.secret,
      },
      body: JSON.stringify({ data: contents, dataType: "str" }),
    });
    if (!resp.ok) throw new Error("Failed to save object");
  };

  static getSpecialObject = async (plugin: MyPlugin, objectId: string) => {
    const response = await fetch(`${plugin.settings.domain}/api/objects`, {
      headers: {
        object: objectId,
        secret: plugin.settings.secret,
      },
    });
    const contents = await response.json();
    return contents.data;
  };

  static getSpecialObjectNames = async (
    plugin: MyPlugin,
  ): Promise<SpecialObjectNames> => {
    return fetch(`${plugin.settings.domain}/api/objects/special`).then(
      (response) => response.json(),
    );
  };
}
