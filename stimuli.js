/*
  EDIT THIS FILE WHEN YOU CHANGE AUDIO FILES OR STIMULUS COUNTS.

  Main item setup:
  - Items 1-52 each have a true and false recording available.
  - Each participant hears only one version of each item.
  - Those selected recordings are counterbalanced across the 4 main speakers.
  - File pattern:
    audio/<speaker_folder>/<speaker_prefix>_<clip_code>_audio.webm

  Examples:
  - audio/native_1/ha77v84840_1T_audio.webm
  - audio/native_1/ha77v84840_1F_audio.webm
  - audio/non_native_2/2j7bwre4ol_52T_audio.webm

  Filler setup:
  - Filler items are always read by one filler talker only.
  - Each participant hears only one version of each filler item.
  - Put those files in a dedicated filler folder.
  - File pattern:
    audio/<filler_folder>/<filler_prefix>_<clip_code>_audio.webm

  Examples:
  - audio/filler_talker/7brghu4wnv_F1T_audio.webm
  - audio/filler_talker/7brghu4wnv_F1F_audio.webm
*/

const AUDIO_FILE_EXTENSION = "webm";

const SPEAKERS = [
  {
    id: "native_1",
    folder: "native_1",
    display_name: "Native Speaker 1",
    accent_group: "native",
    filename_prefix: "ha77v84840",
  },
  {
    id: "native_2",
    folder: "native_2",
    display_name: "Native Speaker 2",
    accent_group: "native",
    filename_prefix: "ftqpxk732r",
  },
  {
    id: "non_native_1",
    folder: "non_native_1",
    display_name: "Non-native Speaker 1",
    accent_group: "non_native",
    filename_prefix: "6bqg3s4g4q",
  },
  {
    id: "non_native_2",
    folder: "non_native_2",
    display_name: "Non-native Speaker 2",
    accent_group: "non_native",
    filename_prefix: "2j7bwre4ol",
  },
];

const FILLER_SPEAKER = {
  id: "filler_talker",
  folder: "filler_talker",
  display_name: "Filler Talker",
  accent_group: "filler",
  filename_prefix: "7brghu4wnv",
};

const INCLUDE_FILLERS = FILLER_SPEAKER.filename_prefix !== "replace_with_filler_prefix";

const MAIN_ITEM_COUNT = 52;
const FILLER_ITEM_COUNT = 19;

function buildItemSet(options) {
  const items = [];

  for (let itemNumber = 1; itemNumber <= options.itemCount; itemNumber += 1) {
    const itemId = `${options.codePrefix}${itemNumber}`;

    items.push({
      item_id: itemId,
      item_number: itemNumber,
      code_prefix: options.codePrefix,
      statement_text: `Audio item ${itemId}`,
      stimulus_set: options.stimulusSet,
      is_filler: options.isFiller,
    });
  }

  return items;
}

const MAIN_ITEMS = buildItemSet({
  codePrefix: "",
  itemCount: MAIN_ITEM_COUNT,
  stimulusSet: "main",
  isFiller: false,
});

const FILLER_ITEMS = buildItemSet({
  codePrefix: "F",
  itemCount: FILLER_ITEM_COUNT,
  stimulusSet: "filler",
  isFiller: true,
});
