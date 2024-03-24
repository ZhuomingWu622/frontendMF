import { atom } from "jotai";
import { VideoPostItem } from "./type";

export const videoItemListAtom = atom<VideoPostItem[]>([]);