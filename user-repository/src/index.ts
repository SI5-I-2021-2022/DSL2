import {WikiCssGenerator} from "./generator/wiki-css-generator";
import {wikiLarouseModel} from "./style-exemple/wiki-larousse";
import {SlayTheSpireModel} from "./style-exemple/wiki-fandom-slaythespire"
import { wikiColorChange } from "./style-exemple/wiki-change-color-responsive";

const cssGenerator = new WikiCssGenerator();
cssGenerator.generateCssFile(SlayTheSpireModel)
