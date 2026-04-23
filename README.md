# Accent Credibility Experiment

This is a beginner-friendly `jsPsych` experiment for your modified version of the Lev-Ari and Keysar study.

It does all of the following:

- shows a consent form first
- shows instructions
- tells participants that the speakers did not create the statements
- tells participants that the speakers did not know whether the statements were true or false
- plays one audio recording for each stimulus
- presents each item only once, never both the `T` and `F` versions
- asks participants to judge whether the statement is true or false
- records reaction time for the judgment screen
- downloads a `.csv` data file at the end

## Folder structure

```text
2026-04-20-files-mentioned-by-the-user-why/
├── index.html
├── experiment.js
├── stimuli.js
├── style.css
└── audio/
    ├── filler_talker/
    ├── native_1/
    ├── native_2/
    ├── non_native_1/
    └── non_native_2/
```

## Exact setup steps in VS Code

1. Open this folder in VS Code.
2. Install the VS Code extension called `Live Server`.
3. Put your audio files into these folders:
   - `audio/filler_talker/`
   - `audio/native_1/`
   - `audio/native_2/`
   - `audio/non_native_1/`
   - `audio/non_native_2/`
4. Open `stimuli.js` and confirm the filename prefixes match your recordings.

The current setup expects:

- main item recordings `1T` to `52F` in the four main speaker folders
- filler item recordings `F1T` to `F19F` in `audio/filler_talker/`
- filenames in the form `<prefix>_<clip_code>_audio.webm`

Example:

```text
audio/native_1/ha77v84840_1T_audio.webm
audio/native_2/ftqpxk732r_1T_audio.webm
audio/non_native_1/6bqg3s4g4q_1T_audio.webm
audio/non_native_2/2j7bwre4ol_1T_audio.webm
audio/filler_talker/7brghu4wnv_F1T_audio.webm
```

5. If your filler folder name or filler filename prefix is different, edit `FILLER_SPEAKER` in `stimuli.js`.
6. Fillers stay off until you replace the placeholder filler prefix in `stimuli.js` with the real one.
7. If you change the number of main or filler items, edit `MAIN_ITEM_COUNT` or `FILLER_ITEM_COUNT` in `stimuli.js`.
8. Save the file.
9. In VS Code, right-click `index.html`.
10. Click `Open with Live Server`.
11. The experiment will open in your browser.
12. Run one full test yourself before collecting data.

## Important note about reaction time

The reaction time is stored in the `rt` column for rows where `trial_name` is `truth_judgment`.

That means:

- `trial_name = truth_judgment` is the row you will usually analyze
- `rt` is the reaction time in milliseconds
- `participant_judgment` is the participant's true/false response
- `truth_value` is the correct answer
- `accent_group` tells you whether the speaker was `native` or `non_native`
- `speaker_id` tells you which speaker was used
- `clip_code` tells you exactly which audio clip was played
- `truth_code` tells you whether the played version was the `T` or `F` recording
- `stimulus_set` tells you whether the trial was a `main` item or a `filler`
- `is_filler` tells you whether the trial came from the filler talker

## Counterbalancing

Each participant is randomly assigned to 1 of 4 speaker lists.

This means:

- each main stimulus is presented only once to a participant
- a participant never hears both the `T` and `F` versions of the same item
- across participants, different speakers are used for the same main stimuli
- main items are balanced to half true and half false per participant
- filler stimuli stay with the dedicated filler talker, are mixed into the same randomized trial order, and are split as evenly as possible between true and false because the current filler count is odd

## If you want to add more items

Change `MAIN_ITEM_COUNT` or `FILLER_ITEM_COUNT` in `stimuli.js`, then make sure the matching audio files exist.

## If something does not work

The most common cause is a filename mismatch.

Check that:

- the filename prefix in `stimuli.js` matches the audio file
- the audio file exists in the expected folder
- each main clip exists for all four main speakers
- each filler clip exists in `audio/filler_talker/`
- you opened `index.html` with Live Server rather than double-clicking it
