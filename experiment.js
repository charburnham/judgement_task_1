const DATAPIPE_EXPERIMENT_ID = "kjTo6QTrIzDH";

function getExportDataCsv() {
  return jsPsych.data
    .get()
    .filterCustom(function (trial) {
      return trial.exclude_from_export !== true;
    })
    .csv();
}

function getDataFilename() {
  return `accent_credibility_${participantId}.csv`;
}

const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: "Study progress",
});

const participantId = jsPsych.randomization.randomID(8);
const counterbalanceList = jsPsych.randomization.sampleWithoutReplacement(
  [1, 2, 3, 4],
  1
)[0];

if (
  !DATAPIPE_EXPERIMENT_ID ||
  DATAPIPE_EXPERIMENT_ID === "PASTE_YOUR_DATAPIPE_EXPERIMENT_ID_HERE"
) {
  console.warn("DataPipe is not configured yet. Add your DataPipe experiment ID in experiment.js.");
}

const save_data_trial = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: DATAPIPE_EXPERIMENT_ID,
  filename: getDataFilename(),
  data_string: function () {
    return getExportDataCsv();
  },
  on_finish: function (data) {
    data.trial_name = "save_data";
    data.exclude_from_export = true;
    data.saved_filename = getDataFilename();
  },
};

const save_data = {
  timeline: [save_data_trial],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};
const PRACTICE_FILLER_ITEM_NUMBER = 19;
const TRUTH_SCALE_MAX_CM = 14;
const SAMPLE_RECORDINGS = [
  {
    id: "sample_1",
    sentence_text: "Ants don't sleep",
    truth_value: "false",
    truth_label: "False",
  },
  {
    id: "sample_2",
    sentence_text: "A giraffe can go without water longer than a camel can.",
    truth_value: "true",
    truth_label: "True",
  },
];

jsPsych.data.addProperties({
  participant_id: participantId,
  counterbalance_list: counterbalanceList,
  study_name: "accent_credibility_four_speakers",
});

function buildAudioPath(speaker, clipCode) {
  return `audio/${speaker.folder}/${speaker.filename_prefix}_${clipCode}_audio.${AUDIO_FILE_EXTENSION}`;
}

function buildBalancedStimuli(items) {
  const shuffledItems = jsPsych.randomization.shuffle(items.slice());
  const extraTrueItemCount =
    items.length % 2 === 1
      ? jsPsych.randomization.sampleWithoutReplacement([0, 1], 1)[0]
      : 0;
  const trueItemCount = Math.floor(items.length / 2) + extraTrueItemCount;
  const trueItemIds = new Set(
    shuffledItems.slice(0, trueItemCount).map(function (item) {
      return item.item_id;
    })
  );

  return items.map(function (item) {
    const truthCode = trueItemIds.has(item.item_id) ? "T" : "F";

    return {
      item_id: item.item_id,
      clip_code: `${item.code_prefix}${item.item_number}${truthCode}`,
      item_number: item.item_number,
      statement_text: item.statement_text,
      truth_code: truthCode,
      truth_value: truthCode === "T" ? "true" : "false",
      stimulus_set: item.stimulus_set,
      is_filler: item.is_filler,
    };
  });
}

function buildTrialRecord(stimulus, speaker) {
  return {
    fact_id: stimulus.item_id,
    clip_code: stimulus.clip_code,
    item_number: stimulus.item_number,
    statement_text: stimulus.statement_text,
    truth_code: stimulus.truth_code,
    truth_value: stimulus.truth_value,
    stimulus_set: stimulus.stimulus_set,
    is_filler: stimulus.is_filler,
    speaker_id: speaker.id,
    speaker_label: speaker.display_name,
    accent_group: speaker.accent_group,
    audio_path: buildAudioPath(speaker, stimulus.clip_code),
  };
}

function buildPracticeTrial() {
  const nativeSpeakers = SPEAKERS.filter(function (speaker) {
    return speaker.accent_group === "native";
  });

  if (nativeSpeakers.length === 0) {
    return null;
  }

  const practiceItem = FILLER_ITEMS.find(function (item) {
    return item.item_number === PRACTICE_FILLER_ITEM_NUMBER;
  });

  if (!practiceItem) {
    return null;
  }

  const truthCode = jsPsych.randomization.sampleWithoutReplacement(["T", "F"], 1)[0];
  const practiceSpeaker = jsPsych.randomization.sampleWithoutReplacement(nativeSpeakers, 1)[0];

  return buildTrialRecord(
    {
      item_id: practiceItem.item_id,
      clip_code: `${practiceItem.code_prefix}${practiceItem.item_number}${truthCode}`,
      item_number: practiceItem.item_number,
      statement_text: practiceItem.statement_text,
      truth_code: truthCode,
      truth_value: truthCode === "T" ? "true" : "false",
      stimulus_set: "practice",
      is_filler: true,
    },
    practiceSpeaker
  );
}

function buildTrials() {
  const balancedMainStimuli = buildBalancedStimuli(MAIN_ITEMS);
  const balancedFillerStimuli = INCLUDE_FILLERS
    ? buildBalancedStimuli(
        FILLER_ITEMS.filter(function (item) {
          return item.item_number !== PRACTICE_FILLER_ITEM_NUMBER;
        })
      )
    : [];

  const mainTrials = balancedMainStimuli.map(function (stimulus, index) {
    const speaker = SPEAKERS[(index + (counterbalanceList - 1)) % SPEAKERS.length];
    return buildTrialRecord(stimulus, speaker);
  });

  const fillerTrials = balancedFillerStimuli.map(function (stimulus) {
    return buildTrialRecord(stimulus, FILLER_SPEAKER);
  });

  return jsPsych.randomization.shuffle(mainTrials.concat(fillerTrials));
}

function stopMediaStream(stream) {
  if (!stream) {
    return;
  }

  stream.getTracks().forEach(function (track) {
    track.stop();
  });
}

function buildSampleRecordingTrial(sample) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="study-box sample-recording-box">
        <h2>Sample Recording</h2>
        <p>Read the sentence below aloud. This sample is for future experiments and will not be saved.</p>
        <div class="sample-sentence">"${sample.sentence_text}"</div>
        <div class="sample-controls">
          <button type="button" class="jspsych-btn sample-recording-start">Start recording</button>
          <button type="button" class="jspsych-btn sample-recording-stop" disabled>End recording</button>
        </div>
        <p class="sample-status" aria-live="polite">Click Start recording when you are ready.</p>
        <div class="sample-done-row">
          <button type="button" class="jspsych-btn sample-recording-done" disabled>Done</button>
        </div>
      </div>
    `,
    choices: [],
    data: {
      trial_name: "sample_recording_trial",
      sample_id: sample.id,
      sentence_text: sample.sentence_text,
      truth_value: sample.truth_value,
      exclude_from_export: true,
    },
    on_load: function () {
      const startButton = document.querySelector(".sample-recording-start");
      const stopButton = document.querySelector(".sample-recording-stop");
      const doneButton = document.querySelector(".sample-recording-done");
      const statusText = document.querySelector(".sample-status");

      let mediaRecorder = null;
      let recordingStream = null;
      let recordingStartedAt = null;
      let recordingStoppedAt = null;
      let trialFinished = false;

      function setStatus(message, isError) {
        statusText.textContent = message;
        statusText.classList.toggle("sample-status-error", isError === true);
      }

      function finishTrial() {
        if (trialFinished) {
          return;
        }

        trialFinished = true;
        stopMediaStream(recordingStream);
        recordingStream = null;

        jsPsych.finishTrial({
          trial_name: "sample_recording_trial",
          sample_id: sample.id,
          sentence_text: sample.sentence_text,
          truth_value: sample.truth_value,
          recording_completed: true,
          recording_duration_ms:
            recordingStartedAt !== null && recordingStoppedAt !== null
              ? Math.round(recordingStoppedAt - recordingStartedAt)
              : null,
          exclude_from_export: true,
        });
      }

      startButton.addEventListener("click", async function () {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setStatus("This browser cannot access the microphone for the sample recording.", true);
          return;
        }

        if (typeof MediaRecorder === "undefined") {
          setStatus("This browser does not support in-page audio recording for the sample.", true);
          return;
        }

        startButton.disabled = true;
        setStatus("Requesting microphone access...", false);

        try {
          recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(recordingStream);

          mediaRecorder.ondataavailable = function () {
            // The sample recording is intentionally discarded and never saved.
          };

          mediaRecorder.onerror = function () {
            stopMediaStream(recordingStream);
            recordingStream = null;
            startButton.disabled = false;
            stopButton.disabled = true;
            doneButton.disabled = true;
            setStatus("The sample recording could not be completed. Please try again.", true);
          };

          mediaRecorder.onstop = function () {
            recordingStoppedAt = performance.now();
            stopMediaStream(recordingStream);
            recordingStream = null;
            stopButton.disabled = true;
            doneButton.disabled = false;
            setStatus(
              "Recording complete. Click Done to see whether the statement was true or false.",
              false
            );
          };

          recordingStartedAt = performance.now();
          mediaRecorder.start();
          stopButton.disabled = false;
          setStatus("Recording... click End recording when you finish reading the sentence.", false);
        } catch (error) {
          stopMediaStream(recordingStream);
          recordingStream = null;
          startButton.disabled = false;
          stopButton.disabled = true;
          doneButton.disabled = true;
          setStatus("Microphone access was blocked. Please allow it and try again.", true);
        }
      });

      stopButton.addEventListener("click", function () {
        if (!mediaRecorder || mediaRecorder.state !== "recording") {
          return;
        }

        stopButton.disabled = true;
        setStatus("Finishing recording...", false);
        mediaRecorder.stop();
      });

      doneButton.addEventListener("click", function () {
        finishTrial();
      });
    },
  };
}

function buildSampleFeedbackTrial(sample, isLastSample) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="study-box center-text">
        <h2>Answer</h2>
        <p class="sample-feedback-sentence">"${sample.sentence_text}"</p>
        <p class="sample-feedback-result">This statement is <strong>${sample.truth_label}</strong>.</p>
      </div>
    `,
    choices: [isLastSample ? "Continue" : "Next sentence"],
    data: {
      trial_name: "sample_recording_feedback",
      sample_id: sample.id,
      sentence_text: sample.sentence_text,
      truth_value: sample.truth_value,
      exclude_from_export: true,
    },
  };
}

const practiceTrialStimulus = buildPracticeTrial();
const trialStimuli = buildTrials();
const allAudioFiles = []
  .concat(practiceTrialStimulus ? [practiceTrialStimulus.audio_path] : [])
  .concat(
    trialStimuli.map(function (trial) {
      return trial.audio_path;
    })
  );

const preload = {
  type: jsPsychPreload,
  audio: allAudioFiles,
  show_detailed_errors: true,
  message: `
    <div class="study-box center-text">
      <h2>Loading</h2>
      <p>Please wait while the audio files load.</p>
    </div>
  `,
};

const consentTrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="study-box">
      <h1>Consent Form</h1>
      <p>You are invited to take part in a study about how people evaluate spoken information.</p>
      <p>In this study, you will listen to short audio recordings and rate how true you think each statement is on a continuous scale from <strong>definitely false</strong> to <strong>definitely true</strong>.</p>
      <p>Your responses and reaction times will be recorded. You may stop at any time by closing the browser window.</p>
      <p>By clicking <strong>I consent</strong>, you confirm that you are at least 18 years old, that you understand what participation involves, and that you agree to take part.</p>
    </div>
  `,
  choices: ["I consent", "I do not consent"],
  data: {
    trial_name: "consent",
  },
  on_finish: function (data) {
    data.consented = data.response === 0;
  },
};

const noConsentScreen = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>Study Ended</h2>
          <p>You chose not to participate.</p>
          <p>No further study trials will be shown.</p>
        </div>
      `,
      choices: ["Close"],
      data: {
        trial_name: "no_consent_end",
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === false;
  },
};

const instructionPages = {
  timeline: [
    preload,
    {
      type: jsPsychInstructions,
      pages: [
        `
          <div class="study-box">
            <h2>Instructions</h2>
            <p>In this experiment, you will hear a series of short recorded statements.</p>
            <p>After each recording, you will rate how true you think the statement is on a continuous line.</p>
            <p>Please work as accurately and as quickly as you can.</p>
          </div>
        `,
        `
          <div class="study-box">
            <h2>Important Information</h2>
            <p>The speakers did <strong>not</strong> make up the statements themselves.</p>
            <p>They were only reading statements provided to them for the study.</p>
            <p>The speakers also did <strong>not</strong> know whether each statement was true or false when they recorded it.</p>
          </div>
        `,
        `
          <div class="study-box">
            <h2>How To Respond</h2>
            <p>First, listen carefully to the audio recording.</p>
            <p>Then answer the question on the next screen by moving the marker along the line:</p>
            <ul>
              <li>The left end means <strong>definitely false</strong>.</li>
              <li>The right end means <strong>definitely true</strong>.</li>
              <li>Any point in between lets you show how strongly you judge the statement to be false or true.</li>
            </ul>
            <p>Please respond as quickly as possible.</p>
          </div>
        `,
        `
          <div class="study-box">
            <h2>Before The Task</h2>
            <p>First, you will record <strong>two sample sentences</strong> for future experiments.</p>
            <p>Each sentence will appear on the screen. Click <strong>Start recording</strong>, read the sentence aloud, and then click <strong>End recording</strong>.</p>
            <p>After you click <strong>Done</strong>, you will be told whether the sentence was actually true or false.</p>
            <p>These sample recordings will <strong>not</strong> be saved.</p>
          </div>
        `,
        `
          <div class="study-box">
            <h2>Practice Trial</h2>
            <p>Use headphones or earbuds if possible.</p>
            <p>Complete the study in a quiet place.</p>
            <p>After the two sample recordings, you will complete <strong>one listening practice trial</strong> so you can practice the task.</p>
            <p>This practice sentence will not appear in the actual experiment.</p>
            <p>Click <strong>Next</strong> when you are ready to begin.</p>
          </div>
        `,
      ],
      show_clickable_nav: true,
      allow_backward: true,
      button_label_previous: "Back",
      button_label_next: "Next",
      data: {
        trial_name: "instructions",
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const sampleRecordingIntro = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>Sample Recordings</h2>
          <p>First, you are going to record two sample sentences for future experiments.</p>
          <p>These recordings will not be saved.</p>
        </div>
      `,
      choices: ["Begin sample recordings"],
      data: {
        trial_name: "sample_recording_intro",
        exclude_from_export: true,
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const sampleRecordingTimeline = SAMPLE_RECORDINGS.reduce(function (timeline, sample, index) {
  timeline.push(buildSampleRecordingTrial(sample));
  timeline.push(buildSampleFeedbackTrial(sample, index === SAMPLE_RECORDINGS.length - 1));
  return timeline;
}, []);

const sampleRecordingTrials = {
  timeline: sampleRecordingTimeline,
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const audioTrial = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable("audio_path"),
  choices: "NO_KEYS",
  response_allowed_while_playing: false,
  trial_ends_after_audio: true,
  prompt: `
    <div class="study-box center-text">
      <h2>Listen Carefully</h2>
      <p>The recording will play automatically.</p>
    </div>
  `,
  data: {
    trial_name: "audio_presentation",
    fact_id: jsPsych.timelineVariable("fact_id"),
    clip_code: jsPsych.timelineVariable("clip_code"),
    item_number: jsPsych.timelineVariable("item_number"),
    statement_text: jsPsych.timelineVariable("statement_text"),
    truth_code: jsPsych.timelineVariable("truth_code"),
    truth_value: jsPsych.timelineVariable("truth_value"),
    stimulus_set: jsPsych.timelineVariable("stimulus_set"),
    is_filler: jsPsych.timelineVariable("is_filler"),
    speaker_id: jsPsych.timelineVariable("speaker_id"),
    speaker_label: jsPsych.timelineVariable("speaker_label"),
    accent_group: jsPsych.timelineVariable("accent_group"),
    audio_path: jsPsych.timelineVariable("audio_path"),
  },
};

const judgmentTrial = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `
    <div class="study-box center-text truth-scale-trial">
      <div class="big-question">How true do you think the statement you just heard is?</div>
      <p>Move the marker to the point on the line that best matches your judgment.</p>
      <p class="truth-scale-instruction">Left end: definitely false. Right end: definitely true.</p>
      <p class="small-note">Reaction time for this judgment is recorded automatically.</p>
    </div>
  `,
  labels: ["definitely false", "definitely true"],
  min: 0,
  max: TRUTH_SCALE_MAX_CM,
  slider_start: TRUTH_SCALE_MAX_CM / 2,
  step: 0.01,
  require_movement: true,
  button_label: "Continue",
  data: {
    trial_name: "truth_judgment",
    fact_id: jsPsych.timelineVariable("fact_id"),
    clip_code: jsPsych.timelineVariable("clip_code"),
    item_number: jsPsych.timelineVariable("item_number"),
    statement_text: jsPsych.timelineVariable("statement_text"),
    truth_code: jsPsych.timelineVariable("truth_code"),
    truth_value: jsPsych.timelineVariable("truth_value"),
    stimulus_set: jsPsych.timelineVariable("stimulus_set"),
    is_filler: jsPsych.timelineVariable("is_filler"),
    speaker_id: jsPsych.timelineVariable("speaker_id"),
    speaker_label: jsPsych.timelineVariable("speaker_label"),
    accent_group: jsPsych.timelineVariable("accent_group"),
    audio_path: jsPsych.timelineVariable("audio_path"),
  },
  on_finish: function (data) {
    const truthRatingCm = Number(data.response);

    data.participant_truth_rating_cm = Number.isFinite(truthRatingCm)
      ? Math.round(truthRatingCm * 100) / 100
      : null;
    data.participant_judgment = data.participant_truth_rating_cm;
    data.truth_scale_min_cm = 0;
    data.truth_scale_max_cm = TRUTH_SCALE_MAX_CM;
    data.truth_scale_left_label = "definitely false";
    data.truth_scale_right_label = "definitely true";
  },
};

const mainTrials = {
  timeline: [audioTrial, judgmentTrial],
  timeline_variables: trialStimuli,
  randomize_order: false,
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const practiceIntro = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>Listening Practice Trial</h2>
          <p>You are about to complete one listening practice trial.</p>
          <p>Listen to the recording and rate how true the statement seems on the continuous scale, just like you will in the experiment.</p>
          <p>This trial is only for practice.</p>
        </div>
      `,
      choices: ["Start practice"],
      data: {
        trial_name: "practice_intro",
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true && practiceTrialStimulus !== null;
  },
};

const practiceTrials = {
  timeline: [audioTrial, judgmentTrial],
  timeline_variables: practiceTrialStimulus ? [practiceTrialStimulus] : [],
  randomize_order: false,
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true && practiceTrialStimulus !== null;
  },
};

const practiceComplete = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>Practice Complete</h2>
          <p>You have finished the practice trial.</p>
          <p>The actual experiment will begin next.</p>
        </div>
      `,
      choices: ["Begin experiment"],
      data: {
        trial_name: "practice_complete",
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true && practiceTrialStimulus !== null;
  },
};

const finalScreen = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>End of Study</h2>
          <p>Thank you for participating.</p>
          <p>Click the button below to finish and send your responses securely to the study server.</p>
        </div>
      `,
      choices: ["Finish study"],
      data: {
        trial_name: "final_screen",
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const completionScreen = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <div class="study-box center-text">
          <h2>Finished</h2>
          <p>Your responses have been sent to the OSF through DataPipe.</p>
          <p><strong>Filename:</strong> ${getDataFilename()}</p>
          <p>You can now close this browser tab.</p>
        </div>
      `,
      choices: ["Close"],
      data: {
        trial_name: "completion_screen",
        exclude_from_export: true,
      },
    },
  ],
  conditional_function: function () {
    const consentData = jsPsych.data.get().filter({ trial_name: "consent" }).last(1).values()[0];
    return consentData.consented === true;
  },
};

const timeline = [
  consentTrial,
  noConsentScreen,
  instructionPages,
  sampleRecordingIntro,
  sampleRecordingTrials,
  practiceIntro,
  practiceTrials,
  practiceComplete,
  mainTrials,
  finalScreen,
];

timeline.push(save_data);
timeline.push(completionScreen);

jsPsych.run(timeline);
