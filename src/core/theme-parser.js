import {getImage, getJson} from "./requester";

const themeUrl = "https://wakfu.cdn.ankama.com/gamedata/theme/theme.json";
const themeImagePath = (name) => `https://wakfu.cdn.ankama.com/gamedata/theme/images/${name}.png`
const themeImageFileName = (path) => (path.split('theme/images/'))[1].split('.tga')[0];

class ThemeParserClass {
    _theme = undefined;
    _textures = new Map();
    _pixmaps = new Map();
    _colors = new Map();
    _themeElements = new Map();

    loadTheme() {
        if(this._theme) return;
        return new Promise(resolve => {
            getJson(themeUrl).then(result => {
                this._theme = result;
                this.loadTextures().then(() => {
                    this.loadPixmaps();
                    this.loadColors();
                    this.loadThemeElements();
                    resolve();
                })
            })
        });
    }

    loadTextures() {
        return new Promise(resolve => {
            const promises = []
            for (const texture of this._theme.textures) {
                const texturePathName = themeImageFileName(texture.path);
                const futureImage = getImage(themeImagePath(texturePathName));
                futureImage.then(result => {
                    this._textures.set(texture.id, result);
                    this._textures.set(texturePathName, result)
                });
                promises.push(futureImage)
            }
            Promise.all(promises).then(() => resolve());
        })
    }

    loadPixmaps() {
        for (const pixmap of this._theme.pixmaps) {
            pixmap.image = this._textures.get(pixmap.texture);
            this._pixmaps.set(pixmap.id, pixmap);
        }
    }

    loadColors() {
        for (const color of this._theme.colors) {
            this._colors.set(color.id, color);
        }
    }

    loadThemeElements() {
        for (const element of this._theme.themeElement) {
            // data copy
            const flattened = JSON.parse(JSON.stringify(element));
            flattened.pixmaps = [];
            this.flattenThemeElement(flattened, element)
            this._themeElements.set(element.id, flattened)
        }
    }

    flattenThemeElement(flattened, element) {
        if(element.specificPixmaps) {
            for (const pixmap of element.specificPixmaps) {
                pixmap.image = this._textures.get(pixmap.texture);
                flattened.pixmaps.push(pixmap);
            }
        }

        if(element.childrenThemeElements) {
            for (const sub of element.childrenThemeElements) {
                this.flattenThemeElement(flattened, sub);
            }
        }
    }

    getPixmaps() {
        return Array.from(this._pixmaps.values());
    }

    getColors() {
        return Array.from(this._colors.values());
    }

    getThemeElements() {
        return Array.from(this._themeElements.values());
    }

    getPixmap(name) {
        return this._pixmaps.get(name);
    }
}

export const ThemeParser = new ThemeParserClass();