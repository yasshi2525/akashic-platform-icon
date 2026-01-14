import { Assets, Container, Sprite } from "pixi.js";
import { ColorReplaceFilter, GlowFilter, OutlineFilter } from "pixi-filters";
import { colors } from "@mui/material";
import {
  AssetsParameters,
  SingleFrameAssets,
} from "@yasshi2525/pixi-image-packer";

const styleFolder = {
  size: 256,
  padding: 4,
  scaleY: 1.15,
  offsetY: -0.075,
  frame: colors.blueGrey[200],
  stroke: 1,
  outline: colors.blueGrey[900],
};
const styleBody = {
  size: 256,
  padding: 48,
  scaleY: 1,
  offsetY: 0.035,
  body: colors.blue[500],
  stroke: 12,
  frame: colors.blue[200],
  outline: colors.blue[900],
};

const icon = async (): Promise<SingleFrameAssets> => {
  const data = new Container();
  const folder = Sprite.from(
    await Assets.load("images/folder-open-outline.svg"),
  );
  folder.scale.set(
    (styleFolder.size - styleFolder.padding * 2) / folder.width,
    ((styleFolder.size - styleFolder.padding * 2) / folder.height) *
      styleFolder.scaleY,
  );
  folder.position.set(
    styleFolder.padding,
    styleFolder.padding + styleFolder.offsetY * folder.height,
  );
  folder.filters = [
    new ColorReplaceFilter({
      originalColor: 0x000000,
      targetColor: styleFolder.frame,
    }),
    new OutlineFilter({
      color: styleFolder.outline,
      thickness: styleFolder.stroke,
      quality: 1,
    }),
    new GlowFilter({ color: styleFolder.outline, quality: 1 }),
  ];
  data.addChild(folder);
  const body = Sprite.from(await Assets.load("images/game-controller.svg"));
  body.scale.set(
    (styleBody.size - styleBody.padding * 2) / body.width,
    ((styleBody.size - styleBody.padding * 2) / body.height) * styleBody.scaleY,
  );
  body.position.set(
    styleBody.padding,
    styleBody.padding + styleBody.offsetY * body.height,
  );
  body.filters = [
    new ColorReplaceFilter({
      originalColor: 0x000000,
      targetColor: styleBody.body,
    }),
    new OutlineFilter({
      color: styleBody.outline,
      thickness: styleBody.stroke,
      quality: 1,
    }),
    new OutlineFilter({
      color: styleBody.frame,
      thickness: 1,
      quality: 1,
    }),
    new GlowFilter({ color: styleBody.outline, quality: 1 }),
  ];
  data.addChild(body);
  return {
    name: "icon",
    data,
    width: 256,
    height: 256,
  };
};

export = async (): Promise<AssetsParameters> => [await icon()];
